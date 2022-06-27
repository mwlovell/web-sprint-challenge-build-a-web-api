const Actions = require('./actions-model'); 
const express = require('express'); 
const router = express.Router(); 

const {validateAction, validateActionId} = require('./actions-middlware')

router.get("/", (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateAction, validateActionId, (req, res) => {
    const newAction = req.body; 
    Actions.insert(newAction)
    .then(project => {
        res.status(201).json(newAction)
    })
})










module.exports = router
