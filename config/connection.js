'use strict'

const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    database: 'MusicDB',
    host: 'localhost',
    port: 5432,
    idleTimeoutMillis: 500
})

module.exports = pool