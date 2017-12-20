//importing modules
var express     = require('express'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    cors        = require('cors');

var morgan = require('morgan');  
var jswt = require('jsonwebtoken');
    
var app         = express();
var config = require('./config');

//path module provides utilities for working with firle and directory  paths. 
var path        = require('path')

const route = require("./routes/routes");



//connect to mongoose
mongoose.connect('mongodb://localhost:27017/authenticate');
// mongoose.connect('mongodb://gabangel:Melancholy1@ds159676.mlab.com:59676/vueshoppinglist');

//verify on connection
mongoose.connection.on( 'connected', ()=>{
    console.log("Mongoose connected to port 27017");
})

//on connection error
mongoose.connection.on("err",function(){
    console.log(err);
})


// adding middleware
//cors (cross origin resource sharing)
app.use(cors());
//body-parser
app.use(bodyParser.json());

//any route with /api coming into app.js will be routed to route
app.use("/api", route);
app.set('superSecret', config.secret);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


app.get("/", function(req, res, next){
    res.send("go hoome")
})




//specify port server is running
const PORT = process.env.PORT || 8080;
app.listen( PORT, (error, body)=>{
    console.log("server has been started at port: " + PORT);
})
