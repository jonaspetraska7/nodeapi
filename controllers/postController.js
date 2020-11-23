const { pool } = require("../config")
const bodyParser = require('body-parser')


const getAll = (req, res) => {
    pool.query('SELECT * FROM posts', (error, results) => {
        if (error){
            console.log(error)
            return res.sendStatus(400);
        }
        if(results.rows.length != 0){
            return res.status(200).json(results.rows)
        }
        res.sendStatus(404)
      })
}

const get = (req, res) => {
    pool.query('SELECT * FROM posts WHERE id=$1', [req.params.id], (error, results) => {
        if (error){
            console.log(error)
            return res.sendStatus(400);
        }
        if(results.rows.length != 0){
            return res.status(200).json(results.rows[0])
        }
        res.sendStatus(404)
      })
}

const add = (req, res) => {
    const {name, picture, pool_id} = req.body
    pool.query( 'INSERT INTO posts (name, picture, pool_id) VALUES ($1, $2, $3) RETURNING *', [name, picture, pool_id], (error,results) => {
        if (error){
            console.log(error)
            return res.sendStatus(400);
        }
        if(results.rows.length != 0){
            return res.sendStatus(201)
        }
        res.sendStatus(400)
      },
    )
}

const update = (req, res) => {
    const {name, picture, pool_id} = req.body
    pool.query( 'UPDATE posts SET name=$1, picture=$2, pool_id=$3 WHERE id=$4 RETURNING *', [name, picture, pool_id, req.params.id], (error,results) => {
        if (error){
            console.log(error)
            return res.sendStatus(400);
        }
        if(results.rows.length != 0){
            return res.status(200).json({status: '200', message: 'Updated'})
        }
        res.sendStatus(404)
      },
    )
}

const remove = (req, res) => {
    pool.query('DELETE FROM posts WHERE id=$1 RETURNING *', [req.params.id], (error, results) => {
        if (error){
            console.log(error)
            return res.sendStatus(400);
        }
        if(results.rows.length != 0){
            return res.status(200).json({status: '200', message: 'Deleted'})
        }
        res.sendStatus(404)
    })
}

module.exports.get = get
module.exports.getAll = getAll
module.exports.add = add
module.exports.update = update
module.exports.remove = remove