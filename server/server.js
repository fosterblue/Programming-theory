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


app.use(express.static(path.join(__dirname, '../client/project-management-client/build')));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/project-management-client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
