var React = require('react'),
    PropTypes = React.PropTypes;

Image = function(name) {
    this.name = name;
    this.url = '/images/' + name;
    this.inUse = false;
    this.dateAdded = Date.now();
};

var UploaderContainer = React.createClass({
    getInitialState: function() {
        return {
            isLoading: true
        }
    },
    handleClick: function(e) {
        $('#upload-input').click();
        $('.progress-bar').text('0%');
        $('.progess-bar').width('0%');
    },
    handleUpload: function(e) {
        var files = Array.prototype.slice.call(e.target.files);
        var mongoFileObjects = [];

        if(files.length > 0) {
            var formData = new FormData();

            for( var i = 0; i < files.length; i++) {
                var file = files[i];
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
    },
    render: function () {
        return(
            <div className="upload-background">
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
                            </section>
                    </div>
                </div>
            </div>
        )
    }

});

module.exports = UploaderContainer;
