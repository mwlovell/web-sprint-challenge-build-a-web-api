const Actions = require('./actions-model'); 


async function validateActionId(req, res, next){
    try{
        const action = await Actions.get(req.params.id)
        if(!action){
            res.status(404).json({message: 'Error, unable to find actions were found with ID'})
        } else{
            req.action = action
            next()
        }
    }catch(err){
        res.status(500).json({message: 'Error, cannot find action'})
    }
}

async function validateAction (req, res, next){
    const {project_id, description, notes, completed} = req.body
    if(!project_id){
        res.status(400).json({message: 'Error, project id is missing'})
    }
        else if(!notes || !notes.trim){
            res.status(400).json({message: 'Error, missing required project notes'})
        } else{
            req.project_id = project_id
            req.description = description.trim()
            req.notes = notes.trim()
            req.completed = completed
            next()
        }
    }

module.exports = {validateActionId, validateAction }
