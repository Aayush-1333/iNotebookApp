const Notes = require('../models/Notes')
const mongoose = require('mongoose')

// get all notes
const getAllNotes = async (req, res) => {
    const notes = await Notes.find({}).sort({date: -1})

    res.status(200).json(notes)
}

// get a single note
const getNote = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( { error: "Invalid id!" } )
    }
    
    const note = await Notes.findById(id)
    if(!note) {
        return res.status(404).json( { error: 'No notes found!' } )
    }

    res.status(200).json(note)
}

// create a new note
const createNote = async (req, res) => {
    const { title, description, tag, date } = req.body

    // add a new document to the test DB in MongoDB
    try {
        const note = await Notes.create( { title, description, tag, date } )
        res.status(200).json(note)
    } catch(error) {
        res.status(400).json( { error: error.message } )
    }
}

// delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( { error: 'Invalid id!' } )
    }

    const note = await Notes.findOneAndDelete( { _id: id } )
    if(!note) {
        return res.status(400).json({error: 'No notes with given id found!'})
    }

    res.status(200).json(note)
}

// update a note
const updateNote = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( { error: 'Invalid id!' } )
    }

    const note = await Notes.findOneAndUpdate( { _id: id }, {...req.body} )

    if(!note) {
        return res.status(404).json( { error: 'No such note found!' } )
    }

    res.status(200).json(note)
}


module.exports = {
    createNote,
    getAllNotes,
    getNote,
    deleteNote,
    updateNote
} 
