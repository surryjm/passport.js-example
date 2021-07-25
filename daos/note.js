const mongoose = require('mongoose');
const Note = require('../models/note');
module.exports = {};

// createNote(userId, noteObj) - should create a note for the given user
module.exports.createNote = async (userId, noteObj) => {
  if (userId) {
    try {
      const note = await Note.create(noteObj);
      return note;
    } catch (e) {
      return null;
    }
  }
}

// getNote(userId, noteId) - should get note for userId and noteId (_id)
module.exports.getNote = async (userId, noteId) => {
  if (noteId) {
    try {
      return await Note.findOne({ _id: noteId, userId }).lean();
    } catch (e) {
      return null;
    }
  }
}

// getUserNotes(userId) - should get all notes for userId
module.exports.getUserNotes = (userId) => {

}




