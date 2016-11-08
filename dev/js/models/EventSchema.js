var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var events = new Schema({
    title: String,
    presenter: String,
    dateStart: String,
    dateEnd: String,
    startTime: String,
    endTime: String,
    building: String,
    room: String,
    description: String,
    backgroundImage: {
        type: Schema.Types.ObjectId,
        ref: 'ImageModel'
    }
});
var eventSchema = new Schema({
    name: String,
    backgroundColor: String,
    events: [events]
});

eventSchema.static('findAll', function (cb) {
    return this.find(cb).populate('backgroundImage');
});
eventSchema.static('create', function (data, cb) {
    var group = new EventGroup(data);
    return group.save(cb);
});
eventSchema.static('findOne', function (id, cb) {
    return this.find({_id: id}, cb);
});
eventSchema.static('createEvent', function (id, data, cb) {
    if(id !== null) {
        return this.findByIdAndUpdate({_id: id},
            {$push: {"events": data}},
            {safe: true, upsert: true, new: true}, 
            cb)
    } else {
        console.log("Please provide a group id");
    }
});
var EventGroup = mongoose.model('EventGroup', eventSchema);

module.exports = EventGroup;
