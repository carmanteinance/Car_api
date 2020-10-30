const mongoose = require('mongoose');

const DB_NAME = 'Car-Maintenance'
const MONGODB_URI = `mongodb://localhost:27017/${DB_NAME}`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.info(`Connected to the database: ${MONGODB_URI}`)
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });

mongoose.set('useCreateIndex', true);