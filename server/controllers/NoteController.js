const User = require("../models/User");
const Note = require("../models/Note");

async function createNote(req, res) {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;
    const createdNote = await Note.create({
      createdby: userId,
      title,
      description,
    });
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { notes: createdNote._id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Note Created Successfully",
      createdNote,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Couldn't create Note , Try Again Later",
    });
  }
}
async function updateNote(req, res) {
  try {
    const noteId  = req.params.id;
    const { title, description } = req.body;
    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "No NoteID present",
      });
    }
    console.log(title,description,noteId)
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        title: title,
        description: description,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Note Updated Successfully",
      updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Note Updation failed",
    });
  }
}
async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res
        .status(400)
        .json({ success: false, message: "Note ID is required" });
    }
    const note = await Note.findById(noteId);

    const userId = req?.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    // .toString() is imp. to convert objectID to string
    // i.e from objectId('1234') to '1234'

    if (note && note.createdby.toString() === userId) {
      await User.findByIdAndUpdate(userId, {
        $pull: { notes: noteId },
      });
      await note.deleteOne();
      res.json({ success: true, message: "Note removed successfully" });
    } else {
      res.status(404).json({ success: false, message: "Note not found" });
    }
  } catch (err) {
    console.error("Error deleting note:", err);
    return res.status(500).json({
      success: false,
      message: "Couldn't delete note",
      data: err.message,
    });
  }
}

async function getAllNotes(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("notes");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Doesn't Exist",
        data: err.message,
      });
    }
    const notes = user.notes;
    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting all notes",
      data: error.message,
    });
  }
}
module.exports = { createNote, deleteNote, updateNote, getAllNotes };
