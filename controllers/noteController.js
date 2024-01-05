const Note = require("../models/noteModel");
const User = require("../models/userModel");
module.exports = {
  getAllNotes: async (req, res) => {
    try {
      const notes = await Note.find({ userId: req.user.userId });   
      if(notes.length<1) {
        return res.status(404).json({ message: "Notes not found" });
      }
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getNoteById: async (req, res) => {
    try {
      const note = await Note.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      });
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }

      res.json(note);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createNote: async (req, res) => {
    const { title, content } = req.body;

    try {
      const newNote = new Note({ userId: req.user.userId, title, content });
      await newNote.save();

      res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateNoteById: async (req, res) => {
    const { title, content } = req.body;

    try {
      const updatedNote = await Note.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        { $set: { title, content } },
        { new: true }
      );

      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
      }

      res.json(updatedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteNoteById: async (req, res) => {
    try {
      const deletedNote = await Note.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.userId,
      });

      if (!deletedNote) {
        return res.status(404).json({ message: "Note not found" });
      }

      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  shareNote: async (req, res) => {
    try {
        const { userId, noteId } = req.body;
        const loggedInUserId = req.user.id;

        // Check if the user is attempting to share their own note
        if (userId == loggedInUserId) {
            return res.status(403).json({ message: "Unauthorized: You can only share your own notes" });
        }
        const note = await Note.findOne({
          _id: noteId,
          userId: req.user.userId,
        });
      
        const user = await User.findOne({
          _id: userId,
        });
       

        if (!note || !user) {
            return res.status(404).json({ message: "User or Note not found" });
        }
        // Add the user to the sharedWith array in the note
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { $addToSet: { sharedWith: userId } },
            { new: true }
        );
        res.json({ message: "Note shared successfully", note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
},
  // Implementation for searching notes based on keywords
  searchNotes: async (req, res) => {
    try {
      const searchResults = await Note.aggregate([
        {
          $search: {
            index: "autoComplete",
            autocomplete: { query: req.query.search, path: "title" },
          },
        },
      ]);

      res.json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
