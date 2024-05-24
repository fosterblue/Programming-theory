const express = require('express');
const bodyParser = require('body-parser');
const notificationController = require('./controllers/notificationController');

const app = express();
app.use(bodyParser.json());

app.post('/notify', notificationController.sendNotification);

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Notification Service running on port ${port}`);
});
