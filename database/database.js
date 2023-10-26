const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/reservas').then(db => console.log('Database connected'));