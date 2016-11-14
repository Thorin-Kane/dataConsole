import React from 'react';

Image = function(name) {
    this.name = name;
    this.url = '/images/' + name;
    this.inUse = false;
    this.dateAdded = Date.now();
};

export default class UploaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={};

        this._handleClick = this._handleClick.bind(this);
        this._handleUpload = this._handleUpload.bind(this);
    }

    _handleClick(e) {
        $('#upload-input').click();
        $('.progress').attr('data-progress', 0);
    }

    _handleUpload(e) {
        const files = Array.prototype.slice.call(e.target.files);
        const formData = new FormData();
        let mongoFileObjects = [];

        if(files.length > 0) {
            // const formData = new FormData();
            // console.log(formData);

            for(let file of files) {
                console.log(file);
                const imageFile = new Image(file.name);
                mongoFileObjects.push(imageFile);
                formData.append('uploads[]', file, file.name);
            }
        }

        $.ajax({
            url: 'http://localhost:8080/api/v1/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(){
              //send another ajax
              console.log(mongoFileObjects);
              $.ajax({
                url: 'http://localhost:8080/api/v1/images',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(mongoFileObjects),
                error: function(xhr, status, err) {
                    console.err('An error occured posting image data to mongo ', err.toString());
                }
              })
            },
            xhr: function() {
            // create an XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // listen to the 'progress' event
            xhr.upload.addEventListener('progress', function(evt) {

              if (evt.lengthComputable) {
                // calculate the percentage of upload completed
                var percentComplete = evt.loaded / evt.total;
                percentComplete = parseInt(percentComplete * 100);

                $('.progress').attr('data-progress', percentComplete);

              }

            }, false);

            return xhr;
            }
        });
    }

    _testHandleUpload() {
        for(var i = 0; i <= 100; i++)  {
            $('.progress').attr('data-progress', i);
        }
    }
    _handleCancelUpload() {
        $('#upload-container').hide();
    }

    render() {
        return(
            <div id='upload-container' className="upload-background">
                <div className="upload-container">
                    <div className="upload-content">
                        <div className="upload-cloud-img" onClick={this._handleClick}></div>
                        <section className='upload-actions'>
                            <input id="upload-input" type="file" name="uploads[]" multiple="multiple" onChange={this._testHandleUpload}></input>
                            <button className='link-button cancel' onClick={this._handleCancelUpload}>cancel</button>
                        </section>
                    </div>
                    <div className="progress" data-progress="0">
                        <div className="progress-bar" >
                            <div className='mask full'>
                                <div className='fill'></div>
                            </div>
                             <div className='mask half'>
                                <div className='fill'></div>
                            </div>
                        </div>
                        <div className='inset'></div>
                    </div>
                </div>
            </div>
        )
    }
}
