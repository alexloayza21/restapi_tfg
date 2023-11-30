const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/reservas').then(db => console.log('Database connected')).catch((error) => console.error(error));