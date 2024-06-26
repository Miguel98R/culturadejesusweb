require('dotenv').config()
const express = require ('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db')
//const db = require('./db')
const app = express()

//configuraciones
app.set('port',process.env.PORT || 3005 )
app.set('appName',process.env.APP_NAME)

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'pug')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get(/robots\.txt$/, function (req, res) {
    const urlHost = req.protocol + '://' + req.get('host');
    res.type('text/plain');
    res.send(`
        User-agent: *
        Disallow: /cpanel/
        Disallow: /login_catas/
        Sitemap: ${urlHost}/sitemap.xml
    `);
});

//rutas
app.use(require('./viewEngine/routes'))
app.use('/api', require('./routes/_api'))

//Inicializando el servidor
app.listen(app.get('port'), () => {
    console.log(app.get('appName'))
    console.log("Server corriendo en el puerto:", app.get('port'))

})

