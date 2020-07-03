

/* Import faunaDB sdk */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

var _ = require('lodash');
var express = require('express');
var jwt = require('express-jwt')({ secret: process.env.JWT_SERVER_SECRET , algorithms: ['RS256'] });
var router = express.Router();


// routes
router.get('/', getAll);


module.exports = router;

function getAll(req, res) {

    console.log('Function `todo-read-all` invoked')
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_todos'))))
    .then((response) => {
      const todoRefs = response.data
      console.log('Todo refs', todoRefs)
      console.log(`${todoRefs.length} todos found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = todoRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllTodoDataQuery).then((ret) => {
        return  res.status(200).send(JSON.stringify(ret));
        
      })
    }).catch((error) => {
      console.log('error', error)
      return res.status(400).send(JSON.stringify(error)); 
    })
    
}
