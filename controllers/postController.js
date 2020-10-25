const { pool } = require("../config")
const bodyParser = require('body-parser')


const getAll = (req, res) => {
    pool.query('SELECT * FROM posts', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
}

const get = (req, res) => {
    pool.query('SELECT * FROM posts WHERE id=$1', [req.params.id], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
}

const add = (req, res) => {
    const {name, picture, pool_id} = req.body
    pool.query( 'INSERT INTO posts (name, picture, pool_id) VALUES ($1, $2, $3)', [name, picture, pool_id], (error) => {
        if (error) throw error
        res.status(201).json({status: '201', message: 'Post Created'})
      },
    )
}

const update = (req, res) => {
    const {name, picture, pool_id} = req.body
    pool.query( 'UPDATE posts SET name=$1, picture=$2, pool_id=$3 WHERE id=$4', [name, picture, pool_id, req.params.id], (error) => {
        if (error) throw error
        res.status(200).json({status: '200', message: 'Post Updated'})
      },
    )
}

const remove = (req, res) => {
    pool.query('DELETE FROM posts WHERE id=$1', [req.params.id], (error) => {
        if (error) throw error
        res.status(200).json({status: '200', message: 'Post Deleted'})
    })
}

module.exports.get = get
module.exports.getAll = getAll
module.exports.add = add
module.exports.update = update
module.exports.remove = remove