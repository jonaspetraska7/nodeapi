const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
const postController = require('./controllers/postController')
const poolController = require('./controllers/poolController')
const themeController = require('./controllers/themeController')
const authController = require('./controllers/authController')
const userController = require('./controllers/userController')

app.get('/', (req, res) => { res.send(
`Jonas Petraska IFF 7/2 API <br><br>
-- API for a Pinterest type of application: Themes have Pools, Pools have posts <br>
-- Node.js, Express framework, hosted on Heroku + Heroku Postgres DB <br><br>

/post (GET, POST) <br> 
/post/:id (GET, PUT, DELETE) <br>
/pool (GET, POST) <br> 
/pool/:id (GET, PUT, DELETE) <br>
/theme (GET, POST) <br> 
/theme/:id (GET, PUT, DELETE) <br>
`
)})



// Auth

app.use(authController.authenticate)

app.route('/login')
    .post(authController.login)

app.route('/register')
    .post(authController.register)

// Users

app.route('/user')
    .get(userController.getAll)
    .post(userController.add)

app.route('/user/:id')
    .get(userController.get)
    .put(userController.update)
    .delete(userController.remove)

// Posts

app.route('/post')
    .get(postController.getAll)
    .post(postController.add)

app.route('/post/:id')
    .get(postController.get)
    .put(postController.update)
    .delete(postController.remove)

// Pools

app.route('/pool')
    .get(poolController.getAll)
    .post(poolController.add)

app.route('/pool/:id')
    .get(poolController.get)
    .put(poolController.update)
    .delete(poolController.remove)

// Themes 

app.route('/theme')
    .get(themeController.getAll)
    .post(themeController.add)

app.route('/theme/:id')
    .get(themeController.get)
    .put(themeController.update)
    .delete(themeController.remove)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening on 3002`)
})