
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});


const express = require("express");
const router = require("express").Router();
var jwt = require("jsonwebtoken");


const collection = "users";

router.get("/", function (req, res) {
  if (req && req.session) {
    delete req.session.token;
    var viewData = { success: req.session.success };
    delete req.session.success;
  }
  res.render(__dirname + "/template/index.html", viewData);
});

router.post("/", function (req, res) {
  var viewData = { success: true };
  console.log("body",req.body)
  console.log("d",__dirname);
  if (req.body && req.body.username && req.body.password) {
    return client
      .query(q.Paginate(q.Documents(q.Collection(collection))))
      .then((response) => {
        const content = response.data;
        const contentQuery = content.map((ref) => {
          return q.Get(ref);
        });
        return client.query(contentQuery).then((data) => {
          const item = _.find(data, function (o) {
            return o.data.username === req.body.username;
          });
          if (item && bcrypt.compareSync(req.body.password, item.data.hash)) {
            const retdata = item.data;
            delete retdata.hash;
            req.session.token = jwt.sign(
              retdata,
              process.env.JWT_SERVER_SECRET
            );
            var returnUrl =
              (req.query.returnUrl &&
                decodeURIComponent(req.query.returnUrl)) ||
              "/admin";
            return res.redirect(returnUrl);
          } else {
            res.render(__dirname + "/template/index.html", {
              error: "Invalid Username or Password!",
              username: req.body.username,
            });
          }
        });
      })
      .catch((error) => {
        res.render(__dirname + "/template/index.html", {
          error: "Unable to Login",
          username: req.body.username,
        });
      });
  } else {
    res.render(__dirname + "/template/index.html", {
      error: "Invalid Username or Password!"
    });
  }
});

module.exports = router;

