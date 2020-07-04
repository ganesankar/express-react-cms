const router = require("express").Router();
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const _ = require("lodash");
const express = require("express");
const jwt = require("express-jwt")({
  secret: process.env.JWT_SERVER_SECRET,
  algorithms: ["RS256"],
});

const collection = "users";

router.get("/", function (req, res) {
  var data = { installation: true, setup: false };
  return client
    .query(q.Paginate(q.Documents(q.Collection("settings"))))
    .then((response) => {
      data.installation = true;
      console.log("resp", response);
      res.render(__dirname + "/template/index.html", data);
    })
    .catch((error) => {
      console.log("err", error);
      data.installation = false;
      res.render(__dirname + "/template/index.html", data);
    });
});

router.post("/", function (req, res) {
  var data = {
    installation: false,
    setup: false,
    user: false,
    incomplete: false,
  };
  var collection = [
    "settings",
    "blog",
    "category",
    "portfolio",
    "users",
    "messages",
    "events",
    "comments",
  ];
  var output = [];
  for (var j = 0; j < collection.length; j++) {
    tVal = collection[j]; //some manipulation of someArr[j]
    (function (val) {
      client
        .query(q.CreateCollection({ name: tVal }))
        .then((response) => {
          console.log(response);
          output.push(tVal);
        })
        .catch((error) => {
          console.log(error);
        });
    })(tVal);
    console.log("j", j);
  }
  setTimeout(function () {
    console.log("output", output);
    res.render(__dirname + "/template/index.html", data);
  }, 6000);
});

module.exports = router;
