const { pool } = require("../config")
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
require('dotenv').config()
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = (req, res) => {
    const {username, password} = req.body;
    pool.query('SELECT * FROM users WHERE username=$1', [username], (error, results) => {
        if (error) {
          return res.send(`DB ${error}`)
        }
        if (results.rows[0] != undefined) {
          bcrypt.compare(password, results.rows[0].password, function(err, authcheck) {
            if (authcheck == true) 
            {
              console.log(results.rows[0]);
              res.status(200).json(generateToken(results.rows[0].username, results.rows[0].role))
            }
            else {
              return res.status(200).json("Bad username or password change code")
            }
          })
        } else {
          res.status(404).json("Error")
        }
      })
}

const register = (req, res) => {
  const {username, password} = req.body;
  bcrypt.hash(password, saltRounds, (err, hashedpass) => {
    if (err) {
      console.log(error)
    }
    pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username,hashedpass,'user'], (error, results) => {
      if(error){
        if (error.code == 23505) {
          return res.status(200).json("Already exists change code")
        } 
        return res.send(`DB ${error}`)
      }
      else {
        res.status(200).json("Inserted")
      }
    })
  })   
}

const authenticate = (req, res, next) => {
    if(req.url === '/' || req.url === '/login' || req.url ==='/register') return next();
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
      //console.log(err)
      if (err) return res.sendStatus(403)
      req.auth = result;
      console.log(result)
      next() // pass the execution off to whatever request the client intended
    }) 
}

const generateToken = (username, role) => {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign({user:username, role:role}, process.env.TOKEN_SECRET, { expiresIn: "1h"});
}

const add = (req, res) => {
    const {name, featured_post_id, theme_id} = req.body
    pool.query( 'INSERT INTO pools (name, featured_post_id, theme_id) VALUES ($1, $2, $3)', [name, featured_post_id, theme_id], (error) => {
        if (error) throw error
        res.status(201).json({status: '201', message: 'Created'})
      },
    )
}

module.exports.add = add
module.exports.authenticate = authenticate
module.exports.generateToken = generateToken
module.exports.login = login
module.exports.register = register