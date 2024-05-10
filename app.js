'use strict'

const express = require('express')
const pool = require('./config/connection') //TEMP EXPERIMENT
const app = express()
const PORT = 3000

// SETUP VIEW ENGINE BEFORE ENDPOINT. enable RES.RENDER
app.set('view engine', 'ejs')

//SETUP MIDDLEWARE TO PARSE REQ.BODY
app.use(express.urlencoded({ extended: true })) //get object data from HTML FORM to pass as REQUEST

/**
npm i -D nodemon  -->  install dependency nodemon on devDependency
npx nodemon app.js  -->  running nodemon from local
 */

/**
    ENDPOINT / ROUTING
    => Route Method (GET POST PATCH PUT DELETE)
    => Route Path
    => Route Handler (cek method and path if true --> execute)

    ENDPOINT:
    app.METHOD('PATH', 'HANDLER')

    HANDLER:
    () => {} callback

    response.send() --> sending raw data
    response.render() --> untuk rendering html menggunakan view engine
    response.redirect() --> untuk mengarahkan ke endpoint lain

    request.body  --> data dari body html (form input, dll)
    request.params  --> data dari dynamic URL /:propertyName
    request.query -->  
 */

app.get('/', (request, response) => {
    response.send(`Hello world heheh`)
})

app.get('/about', (request, response) => {
    response.send(`
    =========================== <br>
    -----------ABOUT----------- <br>
    =========================== <br>

    Name : Alexander William <br>
    Batch : FSJS-BSD-015 <br>
    Current Phase : 1 <br>
    `)
})

app.get('/songs/add', async (req, res) => {
    try {
        let query = `SELECT * FROM "Genres"`
        const genres = (await pool.query(query)).rows
        res.render('add', { genres })

    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.post('/songs/add', async (req, res) => {
    try {
        const { title, artist, duration, GenreId } = req.body
        const query = `
        INSERT INTO "Songs" (title, artist, duration, "GenreId")
        VALUES ($1, $2, $3, $4);`

        let values = [title, artist, duration, GenreId]

        await pool.query(query, values)
        res.redirect('/songs')

    } catch (error) {
        console.log(error);
    }
})

app.get('/genres', async (req, res) => {
    try {
        let query = `SELECT * FROM "Genres"`
        const genres = (await pool.query(query)).rows

        res.render('genre', { genres })

    } catch (error) {
        console.log(error);
    }
})

app.get('/songs', async (req, res) => {
    try {
        let query = `
        SELECT
            "Songs".id,
            "Songs".title,
            "Songs".artist,
            "Songs".duration,
            "Genres".name
        FROM "Songs"
        JOIN "Genres" ON
        "Songs"."GenreId" = "Genres"."id"`
        const songs = (await pool.query(query)).rows
        res.render('song', { songs })

    } catch (error) {
        console.log(error);
    }
})

app.get('/songs/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const query = `
        DELETE FROM "Songs" WHERE id = ${id}`

        await pool.query(query)
        res.redirect('/songs')

    } catch (error) {
        console.log(error);
    }
})

app.get('/genres/:id', async (req, res) => {
    try {
        const { id } = req.params
        const query = `SELECT * FROM "Genres" WHERE id = ${id}`

        const genre = (await pool.query(query)).rows[0]

        if (!genre) res.send(`ERROR: 404 NOT FOUND`)

        res.send(genre)

    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server Listening on PORT: ${PORT}`);
})