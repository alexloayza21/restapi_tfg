const { Router } = require('express');
const router = Router();

const Escuela = require('../models/Escuela');

//* post escuela
router.post('/newEscuela', async (req, res) => {
    const { idEscuela, nombreEscuela, direccion, ciudad, codigo_postal, provincia } = req.body;
    const nuevaEscuela = new Escuela({ idEscuela, nombreEscuela, direccion, ciudad, codigo_postal, provincia });
    
    if (!idEscuela) { return res.status(500).json({ ok: false, errorMessage: 'El idEscuela es Requerido' }) };
    if (!nombreEscuela) { return res.status(500).json({ ok: false, errorMessage: 'El nombreEscuela es Requerido' }) };
    if (!direccion) { return res.status(500).json({ ok: false, errorMessage: 'La direccion es Requerido' }) };
    if (!ciudad) { return res.status(500).json({ ok: false, errorMessage: 'La ciudad es Requerido' }) };
    if (!codigo_postal) { return res.status(500).json({ ok: false, errorMessage: 'El codigo_postal es Requerido' }) };
    if (!provincia) { return res.status(500).json({ ok: false, errorMessage: 'El provincia es Requerido' }) };
    
    const escuelas = await Escuela.find();
    for (let i = 0; i < escuelas.length; i++) {
        if (nuevaEscuela.idEscuela === escuelas[i].idEscuela) {
            return res.status(500).json({ ok: false, errorMessage: 'ESTA ID ESCUELA YA EXISTE' });
        } else if (nuevaEscuela.nombreEscuela === escuelas[i].nombreEscuela) {
            return res.status(500).json({ ok: false, errorMessage: 'NO PUEDE HABER DOS ESCUELAS CON EL MISMO NOMBRE' });
        }
    }

    nuevaEscuela.save().then(escuela => {
        res.status(200).json({ ok: true, escuela });
    }).catch( err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR CREANDO ESCUELA' });
    });
});


module.exports = router;