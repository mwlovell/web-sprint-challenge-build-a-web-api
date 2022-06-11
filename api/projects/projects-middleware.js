const Projects = require('./projects-model')

async function validateProjectId(req, res, next){
    try{
        const {id} = req.params
        const project = await Projects.get(id)
        if(project){
            req.params = project
            next()
        } else{
            next({status: 404, message: 'Error,this project does not exist'})
        }
    }catch(err){
        next(err)
    }
}

module.exports = {validateProjectId}
