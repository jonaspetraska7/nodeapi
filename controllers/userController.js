const { pool } = require("../config")
const bodyParser = require('body-parser')


const getAll = (req, res) => {
    if(req.auth.role != 'admin') return res.sendStatus(401)
    pool.query('SELECT * FROM users', (error, results) => {
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
    if(req.auth.role != 'admin') return res.sendStatus(401)
    pool.query('SELECT * FROM users WHERE id=$1', [req.params.id], (error, results) => {
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
    if(req.auth.role != 'admin') return res.sendStatus(401)
    const {username,password,role} = req.body

    pool.query( 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *', [username, password, role], (error,results) => {
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
    if(req.auth.role != 'admin') return res.sendStatus(401)
    const {username, password, role} = req.body
    pool.query( 'UPDATE themes SET name=$1, featured_pool_id=$2 WHERE id=$3 RETURNING *', [username, password, role], (error, results) => {
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
    if(req.auth.role != 'admin') return res.sendStatus(401)
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