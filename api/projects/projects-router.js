const Projects = require('./projects-model'); 
const express = require('express'); 
const router = express.Router()

const {validateProjectId} = require('./projects-middleware'); 

router.get("/", (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: 'Error, information cannot be found'})
        })
})

router.get("/:id", validateProjectId, (req,res, next) => {
    try{
        res.status(200).json(req.params)
    } catch(err){
        next(err)
    }
})

module.exports = router
