const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('../routes/taskRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api', taskRoutes);

// Добавляем маршрут для корневого URL
app.get('/', (req, res) => {
    res.send('Welcome to the Project Management App');
});

mongoose.connect('mongodb://localhost:27017/taskdb')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
