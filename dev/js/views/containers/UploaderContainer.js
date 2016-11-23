import React from 'react';
import State from '../../helpers/state';

Image = function(name) {
    this.name = name;
    this.url = '/images/' + name;
    this.inUse = false;
    this.dateAdded = Date.now();
};

export default class UploaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.store = State.getInstance();
        this.state={};

        this._handleClick = this._handleClick.bind(this);
        this._handleUpload = this._handleUpload.bind(this);
        this._isModified = this._isModified.bind(this);
    }

    _handleClick(e) {
        $('#upload-input').click();
    }

    _handleUpload(e) {
        $('.progress-bar').css("-webkit-animation-play-state", "running");
        const files = Array.prototype.slice.call(e.target.files),
            formData = new FormData();
        let mongoFileObjects = [];

        if(files.length > 0) {

            for(let file of files) {
                let imageFile = new Image(file.name);
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
            success: function() {
                // this._isModified(mongoFileObjects);
               $.ajax({
                    url: 'http://localhost:8080/api/v1/images',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(mongoFileObjects),
                    success: function(data) {
                        this._isModified(mongoFileObjects);
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.err('An error occured posting image data to mongo ', err.toString());
                    }
                });
            }.bind(this),
            xhr: function() {
            // create an XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // listen to the 'progress' event
            xhr.upload.addEventListener('progress', function(evt) {

              if (evt.lengthComputable) {
                // calculate the percentage of upload completed
                var percentComplete = evt.loaded / evt.total;
                percentComplete = parseInt(percentComplete * 100);

                if(percentComplete >= 100) {
                    $('.progress-bar').css('border-color', '#64B5F6');
                    //pause the spinner
                    $('.progress-bar').css("-webkit-animation-play-state", "paused");
                }
              }

            }, false);

            return xhr;
            }
        });
    }

    _isModified(items) {
        // console.log(items);
        let data = this.store.get('images');
        console.log(data);
        if(items.length > 0) {
            for(let item of items) {
                data.push(item);
            }
        }

        this.store.set('images', data);
    }

    _handleCancelUpload() {
        $('#upload-container').hide();
    }

    render() {
        return(
            <div id='upload-container' className="upload-background">
                <div className="upload-container">
                    <div className="upload-content">
                        <section className='upload-img-section'>
                            <div className="upload-cloud-img" onClick={this._handleClick}></div>
                        </section>
                        <section className='upload-actions'>
                            <input id="upload-input" type="file" name="uploads[]" multiple="multiple" onChange={this._handleUpload}></input>
                        </section>
                    </div>
                    <div className='upload-progress'>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"></div>
                        </div>
                    </div>
                </div>
                <span className='cancel' onClick={this._handleCancelUpload}></span>
            </div>
        )
    }
}
