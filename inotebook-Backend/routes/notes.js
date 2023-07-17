const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')


// ======= ROUTE 1: Fetch all notes using GET: /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchUser, async(req, res) => {

    try {
        const notes = await Notes.find({user: req.user.id})
        return res.json(notes)
    } catch(error) {
        return res.status(500).send("Internal Server Error!: Fetch all notes")
    }
}) 

// ======= ROUTE 2: Create a new note using POST: /api/notes/createnote
router.post('/createnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must not be empty').exists()
], async(req, res) => {

    // checking errors for request validation
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    // creating a note and saving it in collection notes
    try {
        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
    
        return res.status(200).json(note)

    } catch(error) {
        return res.status(500).send("Internal Server Error!: Create Note")
    }
})

// ======== ROUTE 3: Updates the existing notes using PUT: /api/notes/updatenote
router.put('/updatenote/:id', fetchUser, async (req, res) => { 
    // find the note by its id
    const note = await Notes.findById(req.params.id)

    // If note is not found!
    if(!note) {
        return res.status(404).json({error: "Not found!"})
    }

    // If user is not authorized!
    if(note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized!!")
    }
    
    // Update the note
    try {
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(200).json(updatedNote)
    } catch(error) {
        return res.status(400).send("Internal Server Error! Update Note")
    }
})

// ======== ROUTE 4: Delete the note using DELETE: /api/notes/deletenote
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    // find the note using its id
    const note = await Notes.findById(req.params.id)

    // If note is not found
    if(!note) {
        return res.status(404).json({error: "Not found!"})
    }
    
    // If the user is not authorized
    if(note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized!")
    }

    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id)
        res.status(200).json({success: "Note deleted!"})
    } catch(error) {
        return res.status(400).send("Internal Server Error!: Delete Note")
    }

})

module.exports = router
