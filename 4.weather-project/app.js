const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express(); 

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");  
})

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "57ab3fba6de0cce0acf20813dda7a63f";
    const unit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            let imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write('<html>');
            res.write(`<h2>The weather currently is ${weatherDiscription}</h2>`);
            res.write(`<h1>The temparature in ${query} is ${temp} degrees Celcius.</h1>`);
            res.write(`<img src=${imageURL}>`);
            res.write(`</html>`);
            res.send();
        })
       
    })
})
app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})