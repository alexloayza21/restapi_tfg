const { Router } = require('express');
const router = Router();

const verifyToken = require('../helpers/verifyToken');
const Escuela = require('../models/Escuela');
const User = require('../models/User');

//* post escuela
router.post('/newEscuela', verifyToken, async (req, res) => {
    
    const { nombreEscuela, direccion, ciudad, codigo_postal, provincia, imagen } = req.body;

    if (!nombreEscuela || !direccion || !ciudad || !codigo_postal || !provincia) {
        return res.status(500).json({ ok: false, errorMessage: 'Todos los campos son requeridos' });
    }

    const escuelaExistente = await Escuela.findOne({ nombreEscuela });
    if (escuelaExistente) {
        return res.status(500).json({ ok: false, errorMessage: 'Esta escuela ya existe' });
    }

    const nuevaEscuela = Escuela({ nombreEscuela, direccion, ciudad, codigo_postal, provincia, imagen, });
    nuevaEscuela.save();

    const usuario = await User.findById(req.userId);
    if (!usuario) {
        return res.status(500).json({ ok: false, errorMessage: 'Usuario no encontrado' });
    }

    usuario.escuelas.push(nuevaEscuela);
    await usuario.save();
    Escuela.findByIdAndUpdate(nuevaEscuela._id, {
        $set: {
            user: usuario._id
        }
    }).then(escuela => {
        res.status(200).json({ ok: true, escuela });
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: err });
    })
});


//* get escuelas
router.get('/allEscuelas', (req, res) => {
    Escuela.find().then(escuelas => {
        res.status(200).send(escuelas);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO LAS ESCUELAS' });
    });
});



module.exports = router;