const { Router } = require('express');
const router = Router();

const verifyToken = require('../helpers/verifyToken');
const Reserva = require('../models/Reserva');
const Asiento = require('../models/Asiento');
const User = require('../models/User');

//*post reserva
router.post('/newReserva', verifyToken, async (req, res, next) => {
    const { fecha, hora_entrada, hora_salida, asientos} = req.body;
    
    const newReserva = new Reserva({ fecha, hora_entrada, hora_salida, asientos });
    newReserva.save();

    await User.findById(req.userId).then(usuario => {
        usuario.reservas.push(newReserva);
        usuario.save();

        Reserva.findByIdAndUpdate(newReserva._id,{
            $set: {
                user: usuario
            }
        }).then(reserva => {
            res.status(200).json({ ok: true, reserva });
        });
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR AGREGANDO RESERVAS A USUARIO' });
    });

});

module.exports = router;