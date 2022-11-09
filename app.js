const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

// const app = express();
// const cool = require('cool-ascii-faces');
// const express = require('express');
// const path = require('path');
// const PORT = process.env.PORT || 5000;

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .get('/cool', (req, res) => res.send(cool()))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})


app.post("/", function(req,res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
const data = {
    members: [{ email_address: email,
    status: "subscribed",
    merge_fields: {
        FNAME: firstName,
        LNAME: lastName
    }
}]};
const jsonData = JSON.stringify(data);

const url = 'https://us17.api.mailchimp.com/3.0/lists/7a89b11209';

const options = {
    method: "POST",
    // auth: "richard1:19fba236b7f2143827e3311eb5a244d6-us17"
    auth: "richard119fba236b7f2143827e3311eb5a244d6"
}

const request = https.request(url,options,function(response){
response.on("data", function(data){
console.log(JSON.parse(data));
if (response.statusCode === 200){
res.sendFile(__dirname + "/success.html");
}else{
res.sendFile(__dirname + "/failure.html");
}
})
})

request.write(jsonData);
request.end();


});

app.post("/failure",function(req,res){
    res.redirect("/")
})
// const mailchimp = require('@mailchimp/mailchimp_marketing');

// mailchimp.setConfig({
//   apiKey: "19fba236b7f2143827e3311eb5a244d6-us17",
//   server: 'us17',
// });

// async function callPing() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }

// callPing();

// const client = require("@mailchimp/mailchimp_marketing");

// client.setConfig({
//   apiKey: "19fba236b7f2143827e3311eb5a244d6-us17",
//   server: "us17",
// });

// const run = async () => {
//   const response = await client.lists.batchListMembers("7a89b11209", {
//     members: [{ email_address: subscribingUser.email,
//         status: "subscribed",
//         merge_fields: {
//             FNAME: subscribingUser.firstName,
//             LNAME: subscribingUser.lastName}],
//   });
//   console.log(response);
// };

// run();


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})

//7a89b11209 audience id