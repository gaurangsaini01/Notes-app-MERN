const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const signup = require("../controllers/signup");
const login = require("../controllers/login");
const { updateNote } = require("../controllers/NoteController");
const { createNote } = require("../controllers/NoteController");
const { deleteNote } = require("../controllers/NoteController");
const { getAllNotes } = require("../controllers/NoteController");

router.post("/signup", signup);
router.post("/login", login);

//note routes
router.post("/createnote", auth, createNote);
router.post("/updatenote/:id", auth, updateNote);
router.get("/getallnotes", auth, getAllNotes);
router.delete("/deletenote/:id", auth, deleteNote);
module.exports = router;
