const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


app.set('view engine', 'hbs')

//change default views folder to another name
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//serve static files
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rajah'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rajah'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a helpful text',
        title: 'Help',
        name: 'Rajah'
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Rajah',
        errorText: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please input address' })
    }
    res.send({
        forecast: 'It is snowing',
        location: req.query.address
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Rajah',
        errorText: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Listening on port 3000...')
})