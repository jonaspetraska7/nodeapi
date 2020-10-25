require('dotenv').config()

const {Pool} = require('pg')
const isProduction = true

const connectionString = `postgresql://${process.env.DB_USER}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
const connection = `postgres://xmyeapemjodjjj:116d7b804f711ccfd90b4a141c9269d51ef3737dbf4d043acf8975ec5e3da9e7@ec2-54-158-222-248.compute-1.amazonaws.com:5432/d5afuc7q88b9tb`

const pool = new Pool({
    connectionString: connection
})

module.exports = {pool}