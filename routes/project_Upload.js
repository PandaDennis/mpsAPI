const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const M_Projects = require('../models/project_management_model');
const fs = require("fs");
const os = require('os');

//Set Storage engine
const storage = multer.diskStorage({
  //destination:'./public/uploads/',
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
  },

  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + file.originalname + "-" + Date.now());
  }
});

//init upload
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array('projectPhoto');

// Check a File type
function checkFileType(file, cb) {
  // allowed ext
  const filetype = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetype.test(path.extname(file.originalname).toLowerCase());

  //check mime
  const mimetype = filetype.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // cb('Error: This is not support formate')
    cb(JSON.parse('{ "stateCode":"1", "Message":"This is not support formate"}'))
  }

}
//upload meidia file
router.post('/uploadsprojectmedia/org/:projectID', (req, res) => {
  //res.send('Test Uploads');
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(200).send(err);
    } else {
      // Find and Upload to project dir
      M_Projects.findOne({ project_id: req.params.projectID }, (err, data) => {
        if(err){
            res.status(200)
            .json({ 
              stateCode: 1 ,
              Message: err
            });
        }
        if (data) {
         //console.log(typeof data.project_id);
          var project_file_path = data.project_id;
          var file_upload_count = Object.keys(req.files).length;
          for (var i = 0; i < file_upload_count; i++) {
            var file_pah = req.files[i].destination;
            var old_P_photo_pah = '.' + file_pah + req.files[i].filename;
            //implement to project dir
            var new_path = os.homedir() + "/testFile" + "/" + project_file_path+"/org";
            //console.log(new_path);
            const currentPath = path.join(__dirname, old_P_photo_pah);
            const newPath = path.join(new_path, req.params.projectID + "_" + req.files[i].originalname)
            fs.rename(currentPath, newPath, function (err) {
              if (err) {
                throw err
              } else {
                //console.log(os.homedir()); 
                //console.log("Successfully moved the file!")
              }
            })
            //console.log("File Path "+old_pah)
          }
          res.status(200).json({
              stateCode: 0,
              Message: "Success to Upload file to " + req.params.projectID
          });
        }else{
          res.status(200)
          .json({ 
            stateCode: 1 ,
            Message: err
          });
        }
      });
      
    }
  });

});

// router.post('/uploadsprojectmedia/org/:projectID', (req, res) => {
//   M_Projects.findOne({ project_id: req.params.projectID }, (err, data) => {
//     if (err) {
//       console.log(err)
      
//     }
//     if (data) {
//       console.log(data)
//     } else {
//       console.log('no data')
//     }
      
//   });
// });

module.exports = router;