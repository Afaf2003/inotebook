const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//ROUTER 1: Fetching All Notes of user GET request method '/api/notes/fetchallnotes'/. loging is Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id }); // When we want mutilple records then we use the .find method
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
});

//ROUTER 2: Add Notes of user POST request method '/api/notes/addnote'.. loging is Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('description', 'Enter a Valid Description').isLength({ min: 5 })
], async (req, res) => {
    // if there are error then return baad request
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            // return res.send({ result: result.array()});
            return res.status(400).json({ result: result.array() });
        }
        const { title, description, tag } = req.body;

        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save()
        res.send(savedNote);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
});

//ROUTER 3: Updating Notes of user using put request method '/api/notes/updatenote'.. loging is Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    let { title, description, tag } = req.body;
    // Creating a newNote Object which will gonna use for the purpose of updating a node
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) { return res.status(404).send("Not Allowed"); }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
});


//ROUTER 4: Deleting Notes of user using put request method '/api/notes/deletenote'.. loging is Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) { return res.status(404).send("Not Allowed"); }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": `The note with id ${note.user.toString()} deleted`, note: note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;