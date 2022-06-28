const Projects = require('./projects-model'); 
const express = require('express'); 
const router = express.Router()

const e = require('express');
const {validateProjectId, validateProject} = require('./projects-middleware'); 

router.get("/", (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: 'Error, requested information cannot be found'})
        })
})

router.get("/:id", validateProjectId, (req,res, next) => {
    try{
        res.status(200).json(req.params)
    } catch(err){
        next(err)
    }
}); 
    router.post("/", (req, res) => {
        const newProject = req.body; 
        Projects.insert(newProject)
        .then(project => {
            res.status(201).json(newProject)
        })
        .catch(err => {
            res.status(400).json({message: "Error adding your project"})
        })
    });
    
    router.put("/:id",validateProjectId ,validateProject,(req, res, next) =>{
    
        const { completed, name, description} = req.body; 
        if(completed === undefined || !name || !description){
            res.status(400).json({message: 'Project ID does not exist'})
        } else {
            Projects.update(req.params.id ,req.body)
            .then(() => {
              return Projects.get(req.params.id)
            })
            .then(project => {
                res.json(project)
            })
            .catch(next)
    
        }
    
    })
    
    router.delete("/:id", validateProjectId, async (req, res, next) => {
        try{
            await Projects.remove(req.params.id)
            res.json(res.Projects)
        } catch(err){
            next(err)
        }
    })

    router.get("/:id/actions", validateProjectId, async (req, res, next) => {
        Projects.getProjectActions(req.params.id)
            .then(actions => {
                if(actions.length > 0){
                    res.status(200).json(actions)
                } else {
                    res.status(404).json((actions))
                }
            })
            .catch(next)
    })
    
    
    module.exports = router 
    
