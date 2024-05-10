'use strict'

const pool = require("../config/connection")

async function setup() {
    try {
        const createGenres = `
        CREATE TABLE IF NOT EXISTS "Genres" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR NOT NULL
        );`

        const createSongs = `
        CREATE TABLE IF NOT EXISTS "Songs" (
            "id" SERIAL PRIMARY KEY,
            "title" VARCHAR NOT NULL,
            "artist" VARCHAR NOT NULL,
            "duration" INTEGER NOT NULL,
            "GenreId" INTEGER NOT NULL,
                FOREIGN KEY ("GenreId")
                REFERENCES "Genres" ("id")
        );`

        await pool.query(`DROP TABLE IF EXISTS "Songs"`)
        console.log("dropped Songs");
        await pool.query(`DROP TABLE IF EXISTS "Genres"`)
        console.log(`dropped Genres`);

        await pool.query(createGenres)
        console.log("created Genres");
        await pool.query(createSongs)
        console.log("created Songs");

    } catch (error) {
        console.log(error);
    }
}

setup()