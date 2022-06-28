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

router.put('/:id', validateAction,validateActionId,  (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(updatedAction => {
        res.status(200).json(updatedAction)
    })

})

router.delete("/:id", validateActionId, (req, res, next) => {

    Actions.remove(req.params.id)
    .then(action => {
       res.json(action)
    })

   } 
)


module.exports = router
