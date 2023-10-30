const { Router } = require('express');
const router = Router();

const Escuela = require('../models/Escuela');
const Aula = require('../models/Aula');
const Asiento = require('../models/Asiento');

//* post escuela
router.post('/newEscuela', (req, res) => {
    const { idEscuela, nombreEscuela, direccion, ciudad, codigo_postal, provincia } = req.body;
    const nuevaEscuela = new Escuela({ idEscuela, nombreEscuela, direccion, ciudad, codigo_postal, provincia });
    
    nuevaEscuela.save().then(escuela => {
        res.status(200).json({ ok: true, escuela });
    }).catch( err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR CREANDO ESCUELA' });
    });
});


module.exports = router;