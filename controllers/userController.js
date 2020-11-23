const { pool } = require("../config")
const bodyParser = require('body-parser')


const getAll = (req, res) => {
    if(req.auth.role != 'admin') return res.status(200).json("Unauthorized")
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
}

const get = (req, res) => {
    if(req.auth.role != 'admin') return res.status(200).json("Unauthorized")
    pool.query('SELECT * FROM users WHERE id=$1', [req.params.id], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
}

const add = (req, res) => {
    if(req.auth.role != 'admin') return res.status(200).json("Unauthorized")
    const {username,password,role} = req.body

    pool.query( 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, password, role], (error) => {
        if (error) throw error
        res.status(201).json({status: '201', message: 'Created'})
      },
    )
}

const update = (req, res) => {
    if(req.auth.role != 'admin') return res.status(200).json("Unauthorized")
    const {username, password, role} = req.body
    pool.query( 'UPDATE themes SET name=$1, featured_pool_id=$2 WHERE id=$3', [username, password, role], (error) => {
        if (error) throw error
        res.status(200).json({status: '200', message: 'Updated'})
      },
    )
}

const remove = (req, res) => {
    if(req.auth.role != 'admin') return res.status(200).json("Unauthorized")
    pool.query('DELETE FROM themes WHERE id=$1', [req.params.id], (error) => {
        if (error) throw error
        res.status(200).json({status: '200', message: 'Deleted'})
    })
}

module.exports.get = get
module.exports.getAll = getAll
module.exports.add = add
module.exports.update = update
module.exports.remove = remove