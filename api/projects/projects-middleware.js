const Projects = require('./projects-model');

async function validateProjectId(req, res, next){
    try{
        const {id} = req.params
        const project = await Projects.get(id)
        if(project){
            req.params = project
            next()
        } else{
            next({status: 404, message: 'Error, requested project is not found'})
        }
    }catch(err){
        next(err)
    }
}
async function validateProject(req, res,next){
    const {name, description, completed} = req.body
    if(!name || !name.trim()){
        res.status(400).json({message: 'Error, missing field is required'})
    } else if(!description || !description.trim()){
        res.status(400).json({message: 'Error, required description field is missing'})
    } 
    else{
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}



module.exports = {validateProjectId, validateProject} 
