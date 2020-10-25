const { pool } = require("../config")
const bodyParser = require('body-parser')


const getAll = (req, res) => {
    pool.query('SELECT * FROM pools', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
}

const get = (req, res) => {
    pool.query('SELECT * FROM pools WHERE id=$1', [req.params.id], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
}

const add = (req, res) => {
    const {name, featured_post_id, theme_id} = req.body
    pool.query( 'INSERT INTO pools (name, featured_post_id, theme_id) VALUES ($1, $2, $3)', [name, featured_post_id, theme_id], (error) => {
        if (error) throw error
        res.status(201).json({status: '201', message: 'Created'})
      },
    )
}

const update = (req, res) => {
    const {name, featured_post_id, theme_id} = req.body
    pool.query( 'UPDATE pools SET name=$1, featured_post_id=$2, theme_id=$3 WHERE id=$4', [name, featured_post_id, theme_id, req.params.id], (error) => {
        if (error) throw error
        res.status(200).json({status: '200', message: 'Updated'})
      },
    )
}

const remove = (req, res) => {
    pool.query('DELETE FROM pools WHERE id=$1', [req.params.id], (error) => {
        if (error) throw error
        res.status(200).json({status: '200', message: 'Deleted'})
    })
}

module.exports.get = get
module.exports.getAll = getAll
module.exports.add = add
module.exports.update = update
module.exports.remove = remove