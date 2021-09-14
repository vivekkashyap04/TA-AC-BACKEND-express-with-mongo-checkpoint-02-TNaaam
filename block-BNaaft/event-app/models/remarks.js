const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remarksSchema = new Schema(
  {
    title: String,
    author: String,
    likes: { type: Number, default: 0 },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Remarks', remarksSchema);
