const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const database = require('./services/database');
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');
const { mongoURI, port } = require('../config');

const app = express();

app.use(bodyParser.json());
app.use('/api', taskRoutes);

// Укажите Express обслуживать статические файлы из папки build
app.use(express.static(path.join(__dirname, '../client/project-management-client/build')));


// Любые другие запросы обрабатывайте, отправляя обратно index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/project-management-client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
