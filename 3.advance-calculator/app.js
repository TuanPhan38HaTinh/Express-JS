const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+ "/index.html" )
});

app.post("/", (req, res) => {
    let num1 = +req.body.num1;
    let num2 = +req.body.num2;
    let result;
    if(Object.keys(req.body)[2] == "add") {
        result = num1 + num2;
    } else if(Object.keys(req.body)[2] == "sub") {
        result = num1 - num2;
    } else if(Object.keys(req.body)[2] == "mul") {
        result = num1 * num2;
    } else if(Object.keys(req.body)[2] == "div") {
        result = num1 / num2;
    } 
    res.send(`${result}`);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})