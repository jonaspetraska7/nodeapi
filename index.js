const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const getPosts = (request, response) => {
  pool.query('SELECT * FROM posts', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addPost= (request, response) => {
  const {name, picture, pool_id} = request.body

  pool.query(
    'INSERT INTO posts (name, picture, pool_id) VALUES ($1, $2, $3)',
    [name, picture, pool_id],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Post added.'})
    },
  )
}

app
  .route('/posts')
  // GET endpoint
  .get(getPosts)
  // POST endpoint
  .post(addPost)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})