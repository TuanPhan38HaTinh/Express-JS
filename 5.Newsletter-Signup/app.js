const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName
            }
          }]
    }
    let jasonData = JSON.stringify(data);

    let url = "https://us13.api.mailchimp.com/3.0/lists/a1e0064c14";

    let options = {
        method: "POST",
        auth: "tuan:04ab1329165943a6b06f43b1cfa25773-us13"
      };

    let request = https.request(url, options, (response) => { 

        if(response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname+ "/failure.html")
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        } )
    })

    request.write(jasonData);
    request.end();
    
})

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})


// api key: 04ab1329165943a6b06f43b1cfa25773-us13
// list id: a1e0064c14