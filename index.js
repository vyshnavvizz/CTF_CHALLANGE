// { autofold
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var db = new sqlite3.Database(':memory:');
db.serialize(function() {
    db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT)");
    db.run("INSERT INTO user VALUES ('admin', 'Hacker@25800', 'App Administrator')");
});
// }

app.get("/login", (req, res) => {


    res.send("<h1>Visiting Vulnerable Page..</h1>");
});

app.get("/flag", (req, res) => {


    res.send("<h1>Dig more !!, Flag is not here....</h1>");
});
app.post('/login', function(req, res) {
    var username = req.body.username; // a valid username is admin
    var password = req.body.password; // a valid password is Hacker@25800
    var query = "SELECT name FROM user where username = '" + username + "' and password = '" + password + "'";

    console.log("username: " + username);
    console.log("password: " + password);
    console.log('query: ' + query);

    db.get(query, function(err, row) {

        if (err) {
            console.log('ERROR', err);
            res.redirect("/index.html#error");
        } else if (!row) {
            res.redirect("/index.html#unauthorized");
        } else {
            res.send('<body bgcolor="#00cc66"><h1 align="center">Hello <b>' + row.name + ' Welcome Admin :</b><br /><a href="/index.html">Go back to login</a></h1>');
        }
    });


});
app.listen(3000); //bro Change the Port, according to your wish!!!
