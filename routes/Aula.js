const { Router } = require('express');
const router = Router();

const Aula = require('../models/Aula');
const Escuela = require('../models/Escuela');

router.post('/newAula', async (req, res) => {
    const { idAula, nombreAula, idEscuela } = req.body;
    const newAula = new Aula({ idAula, nombreAula, idEscuela });

    if (!idEscuela) { return res.status(500).json({ ok: false, errorMessage: 'El idEscuela es Requerido' }) };

    await Escuela.findOne({ idEscuela }).then(escuela => {
        escuela.aulas.push(newAula);
        escuela.save();
    }).catch(err => {
        res.status(500).json({ok: false, errorMessage: 'NO SE ECONTRÓ ESCUELA'})
    });

    const aulas = await Aula.find();
    for (let i = 0; i < aulas.length; i++) {
        if (newAula.idAula === aulas[i].idAula) {
            return res.status(500).json({ ok: false, errorMessage: 'ESTA ID AULA YA EXISTE' });
        } else if (newAula.nombreAula === aulas[i].nombreAula) {
            return res.status(500).json({ ok: false, errorMessage: 'NO PUEDE HABER DOS AULAS CON EL MISMO NOMBRE' });
        }
    }

    newAula.save().then(aula => {
        res.status(200).json({ok: true, aula})
    }).catch(err => {
        res.status(500).json({ok: false, errorMessage: 'ERROR CREANDO AULA'});
    });
});


module.exports = router;