const { pool } = require("../config")
const bodyParser = require('body-parser')


const getAll = (req, res) => {
    pool.query('SELECT * FROM themes', (error, results) => {
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
    pool.query('SELECT * FROM themes WHERE id=$1', [req.params.id], (error, results) => {
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
    const {name, featured_pool_id} = req.body
    pool.query( 'INSERT INTO themes (name, featured_pool_id) VALUES ($1, $2) RETURNING *', [name, featured_pool_id], (error, results) => {
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
    const {name, featured_pool_id} = req.body
    pool.query( 'UPDATE themes SET name=$1, featured_pool_id=$2 WHERE id=$3 RETURNING *', [name, featured_pool_id, req.params.id], (error, results) => {
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
    pool.query('DELETE FROM themes WHERE id=$1 RETURNING *', [req.params.id], (error, results) => {
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