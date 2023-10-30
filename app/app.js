const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/asientos', require('../routes/Asiento'));
app.use('/aulas', require('../routes/Aula'));
app.use('/escuelas', require('../routes/Escuela'));
app.use('/reservas', require('../routes/Reserva'));
app.use('/users', require('../routes/User'));

module.exports = app;