const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => { res.send('Jonas Petraska IFF 7/2 API <br><br> /posts (GET, POST, PUT, DELETE)')})

app.get('/posts', (req, res) => {
    pool.query('SELECT * FROM posts', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
 })

 app.post('/posts', (req, res) => {
    const {name, picture, pool_id} = req.body
    pool.query( 'INSERT INTO posts (name, picture, pool_id) VALUES ($1, $2, $3)', [name, picture, pool_id], (error) => {
        if (error) throw error
        res.status(201).json({status: '201', message: 'Post Created'})
      },
    )
 })

 app.put('/posts/:id', (req, res) => {
    const {name, picture, pool_id} = req.body
    pool.query( 'UPDATE posts SET name=$1, picture=$2, pool_id=$3 WHERE id=$4', [name, picture, pool_id, req.params.id], (error) => {
        if (error) throw error
        res.status(200).json({status: '200', message: 'Post Updated'})
      },
    )
 })

 app.delete('/posts/:id', (req, res) => {
     pool.query('DELETE FROM posts WHERE id=$1', [req.params.id], (error) => {
         if (error) throw error
         res.status(200).json({status: '200', message: 'Post Deleted'})
     })
 })

 




// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})