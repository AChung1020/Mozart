const express = require ('express');
const app = express ();
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const ejs = require('ejs');
const {Schema} = mongoose;
var url = "mongodb://localhost:27017/Mozart";
mongoose.connect(url, {useNewUrlParser:true});
const path = require('path');
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

var PostSchema = new mongoose.Schema ({
    user: String,
    description: String,
    location: String,
    requirements: String,
    compensation: String,
    date: {type:Date}
});

var Events = mongoose.model('Events', PostSchema)

app.get('/', (req, res)=> {
  res.render('index');
});


app.post("/", (req, res) => {
    var info = {
        user: req.body.user,
        description: req.body.description,
        location: req.body.location,
        requirements: req.body.requirements,
        compensation:req.body.compensation,
        date: req.body.date,
    };
    var me = new Events (info);
    me.save(function(err) {
      if (err) {
        console.log('error occurred');
      }  else {
        console.log('Done!');
      }
    });
    res.send ('Done!')
});

app.listen(3000, ()=>console.log('listening 3000'));
// export default mongoose.models.Event ?? mongoose.model("Event", PostSchema)