const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    project_id: {
        type:  String,
        require: true,
        unique:true
    },
    project_name:{
        type:  String,
        require: true,
        maxLength: 20
    },
    project_master:{
        type:  String,
        require: true
    },
    p_user:{
        type: Array,
        require:true
    },
    p_ser_group:{
        type: Array,
        require:true
    },
    p_description:{
        type: String,
        require:false
    },
    status:{
        type:Boolean,
        require:true
    },
    project_file:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('M_Project',projectSchema);