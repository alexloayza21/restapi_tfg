const { Router } = require('express');
const router = Router();

const verifyToken = require('../helpers/verifyToken');
const Reserva = require('../models/Reserva');
const User = require('../models/User');
const Aula = require('../models/Aula');

//*post reserva
router.post('/newReserva', verifyToken, async (req, res, next) => {
    const { fecha, hora_entrada, hora_salida, nombreAula, idEscuela, asientos, nombreEscuela } = req.body;
    const userId = req.userId

    const user = await User.findById(userId);
    
    const newReserva = new Reserva({
        fecha,
        hora_entrada,
        hora_salida,
        nombreAula,
        idEscuela,
        asientos,
        nombreEscuela,
        username : user.username,
        userId : user._id
    });

    const aula = await Aula.findOne({ nombreAula });

    newReserva.save().then(reserva => {
        res.status(200).json({ ok: true, reserva });
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'Error creando reserva' });
    });

});

//* get todas las reservas
router.get('/allReservas', async (req, res) => {
    await Reserva.find().then(reservas => {
        res.status(200).send(reservas);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'NO HAY RESERVAS' });
    });
});

//* get reservas por fecha
router.get('/reservasPorFecha/:date', async (req, res) => {

    try {
        const fecha = req.params.date;

        const reservas = await Reserva.find({ fecha },{ __v: 0})
        res.status(200).send(reservas);
    } catch (error) {
        res.status(500).json({ ok: false, error });
    }
});

//* get reservas por idUser
router.get('/reservasByUserId/:userId', async (req, res) => {

    const userId = req.params.userId;

    await Reserva.find({ userId },{ __v: 0}).then(reservas => {
        res.status(200).send(reservas);
    }).catch(err => {
        res.status(404).json({ ok: false, errorMessage: err });
    });
});

//* delete reserva by id
router.delete('/deleteReservaByid/:id', async (req, res) => {
    try {
        
        const idReserva = req.params.id;
        const deletedReserva = await Reserva.findByIdAndDelete(idReserva);
        if (!deletedReserva) {
            return res.status(404).json({ok:false, errorMessage: 'Reserva no encontrada'})
        }

        res.status(200).send(deletedReserva);
    } catch (error) {
        res.status(500).json({ ok: false, errorMessage: error });
    }
});

module.exports = router;