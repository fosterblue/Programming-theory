const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);

mongoose.connect('mongodb://user-db:27017/userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`User Service running on port ${port}`);
});
