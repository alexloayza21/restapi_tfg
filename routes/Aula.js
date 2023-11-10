const { Router } = require('express');
const router = Router();

const Escuela = require('../models/Escuela');
const Aula = require('../models/Aula');

//* post aula
router.post('/newAula/:idEscuela', async (req, res) => {
    const { idEscuela } = req.params;
    const { nombreAula } = req.body;
    const newAula = new Aula({ nombreAula, idEscuela });

    if (!idEscuela) { return res.status(500).json({ ok: false, errorMessage: 'El idEscuela es Requerido' }) };

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
router.get('/getAllAulas/:idEscuela', (req, res) => {
    Aula.find({ idEscuela: req.params.idEscuela }).then(aulas => {
        res.status(200).send(aulas);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO AULAS' });
    });
});

//* get aula by id
router.get('/getAulaById/:idAula', (req, res) => {
    Aula.findById(req.params.idAula).then(aulaa => {
        res.status(200).send(aulaa);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO AULAS' });
    });
});


module.exports = router;