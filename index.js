const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
const postController = require('./controllers/postController')
const poolController = require('./controllers/poolController')
const themeController = require('./controllers/themeController')


app.get('/', (req, res) => { res.send('Jonas Petraska IFF 7/2 API <br><br> /posts (GET, POST, PUT, DELETE)')})

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
    .get(poolController.getAll)
    .put(poolController.update)
    .delete(poolController.remove)

// Themes 

app.route('/theme')
    .get(themeController.getAll)
    .post(themeController.add)

app.route('/theme/:id')
    .get(themeController.getAll)
    .put(themeController.update)
    .delete(themeController.remove)


// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})