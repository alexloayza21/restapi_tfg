const { Router } = require('express');
const router = Router();

const Escuela = require('../models/Escuela');
const Aula = require('../models/Aula');

//* post aula
router.post('/newAula', async (req, res) => {
    try {
        const { nombreAula, hora_entrada, hora_salida, mediaHora, idEscuela, asientos } = req.body;
        const newAula = new Aula({ nombreAula, hora_entrada, hora_salida, mediaHora, idEscuela, asientos });
    
        await newAula.save();

        const idAula = newAula._id;
        await Aula.findByIdAndUpdate(idAula, {
            $set: {
                'asientos.$[].idAula': idAula
            }
        });

        res.status(200).send(newAula);
        
    } catch (error) {
        res.status(400).json({ok: false, errorMessage: error});
    }
});

//* get aulas by idEscuela
router.get('/getAllAulas/:idEscuela', async (req, res) => {
    await Aula.find({ idEscuela: req.params.idEscuela }).then(aulas => {
        res.status(200).send(aulas);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO AULAS' });
    });
});

//* get aula by id
router.get('/getAulaById/:idAula', async (req, res) => {
    await Aula.findById(req.params.idAula).then(aulaa => {
        res.status(200).send(aulaa);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO AULA' });
    });
});

//* update aula
router.patch('/updateAula/:id', async (req, res) => {
    try {
        const { nombreAula, hora_entrada, hora_salida, mediaHora, idEscuela, asientos } = req.body;
        const idAula = req.params.id;

        await Aula.findByIdAndUpdate(idAula, {
            $set: {
                nombreAula,
                hora_entrada,
                hora_salida,
                mediaHora,
                idEscuela,
                asientos
            }
        });

        await Aula.updateOne({ _id: idAula, 'asientos.idAula': { $ne: idAula } }, {
            $set: {
                'asientos.$[].idAula': idAula
            }
        });

        res.status(200).json({ ok: true, message: 'Aula actualizada exitosamente' });

    } catch (error) {
        res.status(400).json({ ok: false, errorMessage: error.message });
    }

});

//*delete aula
router.delete('/deleteAula/:id', async (req, res) => {
    try {
        await Aula.findByIdAndDelete(req.params.id).then(aula => {
            res.status(200).send(aula);
        });
    } catch (error) {
        res.status(400).json({ ok: false, error });
    }
});


module.exports = router;