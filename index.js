const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const projectFileRoute = require('./routes/project_Upload');
const projectManagement = require('./routes/project_management');
const mongoose = require('mongoose');
require('dotenv/config')

const app = express();

// connect to DB 
mongoose.set('useCreateIndex', true)
mongoose.connect(
  process.env.DB_CONNEVTION,
  {useNewUrlParser: true, useUnifiedTopology: true} ,
  () => console.log('connect to DB ')
);

//EJS
app.set('view engine', 'ejs');

//public file
app.use(express.static('./public'))
app.use(bodyParser.json());

app.get("/" ,(req,res,next) => { 
    //res.status(200).send("hello word");
    res.render('index')
});


app.use('/project',projectManagement);

app.use('/upfile',projectFileRoute);


//make uploads directory static
app.use(express.static('uploads'));

//start app 
const port = process.env.PORT || 4083;

app.listen(port,'0.0.0.0', () => 
  console.log(`App is listening on port ${port}.`)
);