var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var imageSchema = new Schema({
    name: String,
    url: String,
    dateAdded: {
        type: Date,
        default: Date()
    },
    inUse: {
        type: Boolean,
        default: false
    }
});

imageSchema.static('findAll', function (cb) {
    return this.find(cb);
});
imageSchema.static('create', function (data, cb) {
    var group = new ImageModel(data);
    return group.save(cb);
});
imageSchema.static('findOne', function (id, cb) {
    return this.find({_id: id}, cb);
});

var ImageModel = mongoose.model('ImageModel', imageSchema);

module.exports = ImageModel;
