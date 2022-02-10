const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // DB connection
        this.dbConnect();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // body parse
        this.app.use(express.json());

        // public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('running on port', this.port);
        });
    }

}

module.exports = Server;