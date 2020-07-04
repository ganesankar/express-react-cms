
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});


const _ = require("lodash");
const express = require("express");
const router = require("express").Router();
var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

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
  if (req.body && req.body.username && req.body.password) {
    return client
      .query(q.Paginate(q.Documents(q.Collection(collection))))
      .then((response) => {
        const content = response.data;
        const contentQuery = content.map((ref) => {
          return q.Get(ref);
        });
        return client.query(contentQuery).then((data) => {
          if(data.length === 0){
            res.render(__dirname + "/template/index.html", {
              error: "Unable to Login!",
              username: req.body.username,
            });
          }
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
              console.log(req.session.token)
              if (req.get('host').indexOf("localhost") > -1) {
                returnUrl = "http://localhost:5000/"
              }

              returnUrl+= `?token=${req.session.token}`;
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

