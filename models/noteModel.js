const mongoose = require('mongoose');
const User = require('./userModel');

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: User },
  title: String,
  content: String,
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;