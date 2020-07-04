/* Import faunaDB sdk */
const faunadb = require("faunadb");
const moment = require('moment'); 
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const _ = require("lodash");
const express = require("express");
var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
var Q = require("q");
const router = express.Router();

const collection = "users";
// routes
router.post("/authenticate", authenticateUser);
router.get("/user/:slug", getBySlug);
router.get("/username/:username", checkByUserName);
router.get("/:_id", getById);
router.post("/", create);
router.put("/:_id",  update);
router.delete("/:_id",  _delete);

module.exports = router;

function authenticateUser(req, res) {
  return client
    .query(q.Paginate(q.Documents(q.Collection(collection))))
    .then((response) => {
      const content = response.data;
      console.log("content",content);
      const contentQuery = content.map((ref) => {
        return q.Get(ref);
      });
      console.log("contentQuery",contentQuery);
      return client.query(contentQuery).then((data) => {
        console.log("data",data);
        const item =
          _.find(data, function (o) {
            return o.data.username === req.body.username;
          });
          console.log("item",item);
          console.log("req.body",req.body.password);
        if (item && bcrypt.compareSync(req.body.password, item.data.hash)) {
          // authentication successful
          console.log("authentication successful",item);
          const retdata = item.data;
          delete retdata.hash;
          console.log("authentication tok",retdata);
          console.log("asec",process.env.JWT_SERVER_SECRET);
          const accessToken = jwt.sign(retdata, process.env.JWT_SERVER_SECRET);
          //const accessToken = jwt.sign({ foo: 'bar' }, process.env.JWT_SERVER_SECRET, { algorithm: 'RS256' });
          console.log(" accessToken",accessToken);
          return res.status(200).json(accessToken);
        } else {
          // authentication failed
          console.log("authentication failed",item);
          return res.status(400).json({});
        }
        
      });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}

function getBySlug(req, res) {
  return client
    .query(q.Paginate(q.Documents(q.Collection(collection))))
    .then((response) => {
      const content = response.data;
      const contentQuery = content.map((ref) => {
        return q.Get(ref);
      });
      return client.query(contentQuery).then((data) => {
        const item =
          _.find(data, function (o) {
            return o.data.slug === req.params.slug;
          }) || {};
        if (Object.keys(item).length > 0) {
          return res.status(200).json(item);
        }
        return res.status(400).json({});
      });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}
function checkByUserName(req, res) {
  return client
    .query(q.Paginate(q.Documents(q.Collection(collection))))
    .then((response) => {
      const content = response.data;
      const contentQuery = content.map((ref) => {
        return q.Get(ref);
      });
      return client.query(contentQuery).then((data) => {
        const item =
          _.find(data, function (o) {
            return o.data.username === req.params.username;
          }) ;
        const available = item ? true :false;
        return res.status(200).json({ username: req.params.username, available });
      });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}
function getById(req, res) {
  return client
    .query(q.Get(q.Ref(`classes/${collection}/${req.params._id}`)))
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}

function create(req, res) {
    console.log("eq.body",req.body)
    var user = req.body;
    user.hash = bcrypt.hashSync(req.body.password, 10);
    delete user.password;
    user.created =moment().format();
    const item = {
        data: user,
      };
    
    return client
      .query(q.Create(q.Ref(`classes/${collection}`), item))
      .then((response) => {
        console.log("success", response);
        return res.status(200).json(response);
      })
      .catch((error) => {
        console.log("error", error);
        return res.status(400).json(error);
      });
  }

function update(req, res) {
  const data = JSON.parse(req.body);
  return client
    .query(q.Update(q.Ref(`classes/${collection}/${req.params._id}`), { data }))
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
}

function _delete(req, res) {
  return client
    .query(q.Delete(q.Ref(`classes/${collection}/${req.params._id}`)))
    .then((response) => {
      console.log("success", response);
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.log("error", error);
      return res.status(400).json(error);
    });
}
