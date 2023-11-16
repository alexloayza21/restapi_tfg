const { Router } = require('express');
const router = Router();

const Escuela = require('../models/Escuela');
const Aula = require('../models/Aula');

//* post aula
router.post('/newAula', async (req, res) => {
    try {
        const { nombreAula, hora_entrada, hora_salida, mediaHora, idEscuela, asientos } = req.body;
        const newAula = new Aula({ nombreAula, hora_entrada, hora_salida, mediaHora, idEscuela, asientos });
    
        newAula.save().then(aula => {
            res.status(200).json({ok: true, aula})
        }).catch(err => {
            res.status(500).json({ok: false, errorMessage: 'ERROR CREANDO AULA'});
        });
        
    } catch (error) {
        res.status(400).json({ok: false, errorMessage: error});
    }
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
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO AULA' });
    });
});

//* update aula
router.patch('/updateAula/:id', async (req, res) => {
    const aulaId = req.params.id;
    const updateData = req.body;

    const aula = await Aula.findById(aulaId);
    if (!aula) {
        return res.status(404).json({ ok: false, errorMessage: 'Aula no encontrada' });
    }

    Object.assign(aula, updateData);
    await aula.save();
    return res.json({ ok: true, aula });
});


module.exports = router;