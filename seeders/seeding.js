'use strict'

const pool = require("../config/connection")

async function seeding() {
    try {
        const insertGenres = `
        INSERT INTO "Genres" ("name")
        VALUES
        ('Pop'),
        ('Indie'),
        ('EDM'),
        ('Reggae'),
        ('Rock')`

        const insertSongs = `
        INSERT INTO "Songs" ("title", "artist", "duration", "GenreId")
        VALUES
        ('Quite Like You', 'The Script', '180', '1'),
        ('Nobody', 'One Republic', '150', '1')`

        await pool.query(insertGenres)
        console.log(`Inserted Genres`);

        await pool.query(insertSongs)
        console.log(`Inserted Songs`);

    } catch (error) {
        console.log(error);
    }
}

seeding()