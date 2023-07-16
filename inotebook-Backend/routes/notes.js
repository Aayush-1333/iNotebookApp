const express = require('express');
const router = express.Router();
const {
    createNote,
    getAllNotes,
    getNote,
    deleteNote,
    updateNote
} = require('../controllers/noteController')


// Get all notes
router.get('/', getAllNotes)

// get a single note
router.get('/:id', getNote)

// post a single note
router.post('/', createNote)

// DELETE a note
router.delete('/:id', deleteNote)

// Update a note
router.patch('/:id', updateNote)

module.exports = router
