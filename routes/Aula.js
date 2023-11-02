const { Router } = require('express');
const router = Router();

const Escuela = require('../models/Escuela');
const Aula = require('../models/Aula');

//* post aula
router.post('/newAula/:idEscuela', async (req, res) => {
    const { idEscuela } = req.params;
    const { idAula, nombreAula } = req.body;
    const newAula = new Aula({ idAula, nombreAula, idEscuela });

    if (!idAula) { return res.status(500).json({ ok: false, errorMessage: 'El idAula es Requerido' }) };
    if (!idEscuela) { return res.status(500).json({ ok: false, errorMessage: 'El idEscuela es Requerido' }) };

    const aulas = await Aula.find();
    for (let i = 0; i < aulas.length; i++) {
        if (newAula.idAula === aulas[i].idAula) {
            return res.status(500).json({ ok: false, errorMessage: 'ESTA ID AULA YA EXISTE' });
        } else if (newAula.nombreAula === aulas[i].nombreAula) {
            return res.status(500).json({ ok: false, errorMessage: 'NO PUEDE HABER DOS AULAS CON EL MISMO NOMBRE' });
        }
    }

    await Escuela.findOne({ idEscuela }).then(escuela => {
        escuela.aulas.push(newAula);
        escuela.save();
    }).catch(err => {
        res.status(500).json({ok: false, errorMessage: 'NO SE ECONTRÓ ESCUELA'})
    });

    newAula.save().then(aula => {
        res.status(200).json({ok: true, aula})
    }).catch(err => {
        res.status(500).json({ok: false, errorMessage: 'ERROR CREANDO AULA'});
    });
});

//* get aulas by idEscuela
router.get('/getAula/:idEscuela', (req, res) => {
    Aula.findOne({ idEscuela: req.params.idEscuela }).then(aulas => {
        res.status(200).send(aulas);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO AULAS' });
    });
});


module.exports = router;