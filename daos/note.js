const mongoose = require('mongoose');
const Note = require('../models/note');
module.exports = {};

// createNote(userId, noteObj) - should create a note for the given user
module.exports.createNote = async (userId, noteObj) => {
  try {
    noteObj.userId = userId;
    const note = await Note.create(noteObj);
    return note;
  } catch (e) {
    return null;
  }
}

// getNote(userId, noteId) - should get note for userId and noteId (_id)
module.exports.getNote = async (userId, noteId) => {
  try {
    const note = await Note.findOne({ _id: noteId, userId: userId }).lean();
    return note;
  } catch (e) {
    return null;
  }
}

// getUserNotes(userId) - should get all notes for userId
module.exports.getUserNotes = async (userId) => {
  try {
    return await Note.find({ userId: userId }).lean();
  } catch (e) {
    return null;
  }
}




