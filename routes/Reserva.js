const { Router } = require('express');
const router = Router();

const verifyToken = require('../helpers/verifyToken');
const Reserva = require('../models/Reserva');
const User = require('../models/User');

//*post reserva
router.post('/newReserva', verifyToken, async (req, res, next) => {
    const { fecha, hora_entrada, hora_salida, nombreAula, idEscuela, asientos, userName } = req.body;
    const userId = req.userId
    
    const newReserva = new Reserva({ fecha, hora_entrada, hora_salida, nombreAula, idEscuela, asientos, userName, userId });
    newReserva.save().then(reserva => {
        res.status(200).json({ ok: true, reserva });
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'Error creando reserva' });
    });

});

//* get todas las reservas
router.get('/allReservas', (req, res) => {
    Reserva.find().then(reservas => {
        res.status(200).send(reservas);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'NO HAY RESERVAS' });
    });
});

//* get reservas por fecha
router.get('/reservasPorFecha/:date', (req, res) => {

    const fecha = req.params.date;

    Reserva.find({ fecha },{ __v: 0}).then(reservas => {
        res.status(200).send(reservas);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO RESERVAS' });
    });
});

module.exports = router;