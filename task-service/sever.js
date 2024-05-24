const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

mongoose.connect('mongodb://task-db:27017/taskdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Task Service running on port ${port}`);
});
