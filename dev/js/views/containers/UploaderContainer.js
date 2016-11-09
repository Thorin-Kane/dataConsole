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
        $('.progress-bar').text('0%');
        $('.progess-bar').width('0%');
    }

    _handleUpload(e) {
        const files = Array.prototype.slice.call(e.target.files);
        let mongoFileObjects = [];

        if(files.length > 0) {
            const formData = new FormData();

            for(var i of files) {
                const file = files[i];
                imageFile = new Image(file.name);
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

                // update the Bootstrap progress bar with the new percentage
                $('.progress-bar').text(percentComplete + '%');
                $('.progress-bar').width(percentComplete + '%');

                // once the upload reaches 100%, set the progress bar text to done
                if (percentComplete === 100) {
                  $('.progress-bar').html('Done');
                }

              }

            }, false);

            return xhr;
            }
        });
    }

    _handleCancelUpload() {
        $('#upload-container').hide();
    }

    render() {
        return(
            <div id='upload-container' className="upload-background">
                <div className="upload-container">
                    <div className="upload-content">
                        <a href="/" className="upload-cloud-img"/>
                        <h2>File Uploader</h2>
                        <section className='upload-actions'>
                            <div className="progress">
                            <div className="progress-bar" role="progressbar"></div>
                            </div>
                            <button className="upload-btn" type="button" onClick={this.handleClick}>Upload File</button>
                            <input id="upload-input" type="file" name="uploads[]" multiple="multiple" onChange={this.handleUpload}></input>
                            <button className='link-button cancel' onClick={this._handleCancelUpload}>cancel</button>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
