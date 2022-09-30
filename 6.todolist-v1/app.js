const bodyParser = require("body-parser");
const express = require("express");
const date = require(__dirname + '/date.js');

const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    
    let day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
})

app.post("/", (req, res) => {

    if(req.body.list == "Work") {
        let item = req.body.newItem;
        if(item) {
            workItems.push(item);
        }
        res.redirect("/work")
    } else {
        let item = req.body.newItem;
            if(item) {
            items.push(item); 
            }   
            res.redirect("/");
    }   
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.get("/about", (req,res) => {
    res.render("about");
})


app.listen(3000, () => console.log("Server is running on port 3000."));  