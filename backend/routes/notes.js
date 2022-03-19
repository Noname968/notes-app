const express = require('express');
const router = express.Router();
var Fetchuser = require('../middleware/Fetchuser');
const Notes = require('../models/notes');
const { body, validationResult } = require('express-validator');

// get notes
router.get('/notesdata', Fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");

    }
})

// add a note
router.post('/addnote', Fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a description').isLength({ min: 3 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save();
        res.json(savenote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");
    }
})

// updatenotes
router.put('/updatenote/:id', Fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found2") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });

})

//delete note
router.delete('/deletenote/:id', Fetchuser, async (req, res) => {
    try {

        // Find the note to be updated and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        // allow deletion if user is right
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "deleted note", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");
    }

})

module.exports = router;