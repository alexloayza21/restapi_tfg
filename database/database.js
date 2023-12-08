const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(db => console.log('Database connected')).catch((error) => console.error(error));

//*'mongodb://127.0.0.1:27017/reservas'