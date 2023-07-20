const jwt = require('jsonwebtoken')

const fetchUser = async (req, res, next) => {
    // Get the user fron the jwt token and add id to the req object
    const token = req.header('auth-token')

    if(!token) {
        res.status(401).send("Access Denied!")
    }

    try {
        // decoding the jwt (json web token)
        const result = jwt.verify(token, 'Notebook90boy')
        req.user = result.user
        next()  // request is transferred to next middleware
    } catch(error) {
        res.status(500).send("Internal Server Error!: Fetching User")
    }
}


module.exports = fetchUser
