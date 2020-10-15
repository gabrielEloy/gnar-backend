const express = require('express');
const cors = require('cors')
const { connect } = require('./database')
const fileUpload = require('express-fileupload')
const routes = require('./routes');

class App {
    constructor() {
        this.express = express();
    }

    async init() {
        this.middlewares();
        this.routes();
        await this.databaseSetup();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(fileUpload());
    }

    async databaseSetup() {
        await connect();
    }

    routes() {
        this.express.use('/', routes);
    }
}

module.exports = App;