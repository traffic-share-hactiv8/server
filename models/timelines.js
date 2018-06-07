const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timelineSchema = Schema({
    imageUrl : {type: String, required: true},
    location : {type: String, required: true},
    description : {type: String, required: true},
    userId : {type: Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps : true
})

module.exports = mongoose.model('Timeline', timelineSchema);