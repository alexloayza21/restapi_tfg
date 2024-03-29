const { Router } = require('express');
const router = Router();

const Aula = require('../models/Aula');
const Asiento = require('../models/Asiento');
const Escuela = require('../models/Escuela');
//* TODO ESTO SOBRA
//*post asiento
router.post('/newAsiento/:idAula', async (req, res) => {
    const { idAula } = req.params;
    const { numeroAsiento } = req.body;
    const newAsiento = Asiento({ numeroAsiento, idAula });

    if (!idAula) { return res.status(500).json({ ok: false, errorMessage: 'El idAula es Requerido' }) };
    // if (numeroAsiento>20) { return res.status(500).json({ ok: false, errorMessage: 'Solo puede haber 20 asientos máximo' }) };

    const asientos = await Asiento.find({idAula});
    for (let i = 0; i < asientos.length; i++) {
        if (newAsiento.numeroAsiento === asientos[i].numeroAsiento) {
            return res.status(500).json({ok: false, errorMessage: 'ESTE ASIENTO YA EXISTE'})
        }
    }

    await Aula.findById(idAula).then(aula => {
        aula.asientos.push(newAsiento);
        aula.save();

        Escuela.findById(aula.idEscuela).then(escuela => {
            escuela.aulas.forEach(aula => {
                if (aula.idAula === idAula) {                  
                    aula.asientos.push(newAsiento);
                    aula.save();
                    escuela.save();
                }
            });

        }).catch(err => {
            res.status(500).json({ok: false, errorMessage: 'ERRO AÑADIENDO ASIENTO A AULA'})
        });

    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'NO SE ENCONTRÓ AULA' });
    });

    newAsiento.save().then(asiento => {
        res.status(200).json({ ok: true, asiento });
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR CREANDO ASIENTO' });
    });
}); 

router.get('/asientosByIdEscuela/:idEscuela', async (req, res) => {
    const idEscuela = req.params.idEscuela;
    Aula.findOne({ idEscuela: idEscuela }).then(aula => {
        res.status(200).send(aula.asientos);
    });
});

module.exports = router;