/* Import faunaDB sdk */
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
const router = express.Router();

const collection = "portfolio";
// routes
router.get("/", getAll);
router.get("/slug/:slug", getBySlug);
router.get("/ifSlugExists/:slug", checkBySlug);
router.get("/:_id", getById);
router.post("/", jwt, create);
router.put("/:_id", jwt,update);
router.delete("/:_id", jwt, _delete);

module.exports = router;

function getAll(req, res) {
  return client
    .query(q.Paginate(q.Documents(q.Collection(collection))))
    .then((response) => {
      const content = response.data;
      const contentQuery = content.map((ref) => {
        return q.Get(ref);
      });
      return client.query(contentQuery).then((data) => {
        return res.status(200).json(data);
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
function checkBySlug(req, res) {
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
          return res
            .status(200)
            .json({ slug: req.params.slug, available: false });
        }
        return res.status(200).json({ slug: req.params.slug, available: true });
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
  const item = {
    data: req.body,
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
