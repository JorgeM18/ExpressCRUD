const express = require('express')
const cors = require('cors')
const app = express()
const { connect } = require('./db')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('./controllers/users')

class App {
    constructor() {
        this.initApp()
        this.routes()
        this.initDatabase()
    }

    initApp() {
        app.use(cors())
        app.use(express.json());
    }

    routes() {
        // Routes
        app.get('/', getUsers);
        app.get('/:userId', getUserById);
        app.post('/', createUser);
        app.put('/:userId', updateUser);
        app.delete('/:userId', deleteUser);
    }

    initDatabase() {
        connect('mongodb+srv://AdminEndava:Endava2021@endava.yyroa.mongodb.net/Endava?retryWrites=true&w=majority')
    }

    initServer(port) {
        app.listen(port, () => {
            console.log(`Server Listening on http://localhost:${port}`);
        });
    }
}

module.exports = App
