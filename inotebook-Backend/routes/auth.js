const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');


router.post('/', [
    body('name', 'Invalid name').isLength({min : 3}),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Insufficient length!').isLength({min: 8})
    ], (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        Users.create(req.body)
        .then(() => {
            res.status(200).json(req.body)
        })
        .catch((err) => {
            // preventing from inserting duplicate key value (email)
            res.status(400).json({error: err.message})
        })
    }
)

module.exports = router
