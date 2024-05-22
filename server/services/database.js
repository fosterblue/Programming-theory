const mongoose = require('mongoose');

class Database {
    constructor() {
        if (!Database.instance) {
            mongoose.connect('mongodb://localhost:27017/taskdb', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            this.connection = mongoose.connection;
            Database.instance = this;
        }
        return Database.instance;
    }

    getConnection() {
        return this.connection;
    }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance;
