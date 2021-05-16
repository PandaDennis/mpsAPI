const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const M_Projects = require('../models/project_management_model');
require('dotenv/config')

// router.get('/', (req,res) =>{
//     res.send("Test Post")
// });

router.post('/postsTest', (req,res) =>{
    console.log(req.body);
    res.send(req.body);
});
router.get('/findAll', async (req,res) =>{
    const result = await M_Projects.find();
    if(result.length > 0 ){
        res.status(200).json({
            status:0,
            message:result
        });
    }
    if (result.length <= 0){
        res.status(200).json({
            status:1,
            message:"No Data was Returned !"
            });
    }
    else{
        res.status(200).json({
        status:1,
        message:"ERROR"
        });
    }
});
// Find by User and group
router.get('/findProjectList', async (req,res) =>{
    var result = "";
    // const db_result = await M_Projects.find();
    // if(db_result.length > 0 && req.params.userID != null&& req.params.projectGroup != null){
    //     //dbr_indx = DataBase index
    //     for(var dbr_indx = 0 ; dbr_indx<db_result.length;dbr_indx++){
    //         var projectUserList = db_result[dbr_indx].p_user.length;
    //         // UList =  DataBase user List 
    //         for(var dbr_UList = 0;dbr_UList<projectUserList;dbr_UList++){
    //             // if(db_result[dbr_indx].p_user[dbr_UList])
    //             console.log(db_result[dbr_indx].p_user[dbr_UList]);
    //         }
            
    //     }
    //     res.status(200).json({
    //         status:0,
    //         message:result
    //     });
    // }
    console.warn(req.body);
    //{ $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
    var query = { $or: [ { p_user: req.body.userID }, { p_ser_group: req.body.groupID } ] };
    // var query = { p_user: req.body.userID, p_ser_group:req.body.groupID};
    const db_result = await M_Projects.find(query);
    console.log(db_result);

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
    var req_JSON = req.body[0];
    M_Projects.find({project_id: req.body.projectid},(err,data) =>{
        if(!err && data.project_id == null){
            const project_path = os.homedir()+process.env.SYSTEM_DIRECTORY+"/"+req_JSON.projectid;
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
                    var projectpach = "/"+req_JSON.projectid;
                    const M_Project = new M_Projects({
                    project_id: req_JSON.projectid,
                    project_name: req_JSON.projectname,
                    project_master: req_JSON.master,
                    p_user: req_JSON.projectUser,
                    p_ser_group: req_JSON.projectGroup,
                    status:req_JSON.projectStatus,
                    project_file: projectpach,
            
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
                        
                        if(err.code == '11000'){
                            console.log("DataBase Error:"+err)
                            console.log(M_Project)
                            res.status(200).json({
                                status:2,
                                message:"The Project id have already exists",
                                error: err
                            });
                        }
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