const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello World. This is Tuan</h1>");
})

app.get("/contact", (req, res) => {
    res.send("Contact me at: 0812816888");
})

app.get("/about", (req, res) => {
    res.send("My name is Tuan and I love sport and code.")
})

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});
