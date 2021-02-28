const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const M_Projects = require('../models/project_management_model');
require('dotenv/config')

// router.get('/', (req,res) =>{
//     res.send("Test Post")
// });

router.post('/posts', (req,res) =>{
    console.log(req.body);
    res.send(req.body);
});
router.get('/findByID/:projectID', (req,res) =>{
    const result = M_Projects.findOne({project_id:req.params.projectID},(err,data)=>{
        if(!err){
            res.send(data.project_id);
        }else{
            res.send("null")
        }
    });
    
});
 
router.post('/create',(req,res) =>{
    M_Projects.find({project_id: req.body.projectid},(err,data) =>{
        if(!err && data.project_id == null){
            const project_path = os.homedir()+process.env.SYSTEM_DIRECTORY+"/"+req.body.projectid;
            if (!fs.existsSync(project_path)){
                console.log('success create'+project_path);
                //console.log(project_path);
                fs.mkdirSync(project_path);
            } 
            if (!fs.existsSync(project_path+'/org')){
                console.log('success create'+project_path+'/org');
                fs.mkdirSync(project_path+'/org');
            }
            if (fs.existsSync(project_path+'/org')){
                
                    const M_Project = new M_Projects({
                    project_id: req.body.projectid,
                    project_name: req.body.projectname,
                    project_master: req.body.master,
                    p_user: req.body.projectUser,
                    p_ser_group: req.body.projectGroup,
                    status:req.body.projectStatus,
                    project_file:req.body.fileDir,
            
                    });
               M_Project.save()
                    .then((result) =>{
                        res.status(200).json({
                            status:0,
                            message:"Success To Create Project"
                        });
                        console.log('success create project');
                    })
                    .catch((err) => {
                        res.status(200).json({
                            status:2,
                            message:"The Project id have already exists",
                            error: err
                        });
                    })
                    
        
            }else{
                res.status(200).json({
                    status:1,
                    message:"Error"
                });
            }
        }else{
            res.status(200).json({
                status:2,
                message:"The Project id have already exists"
            });
        }
    });




    
});

module.exports = router;