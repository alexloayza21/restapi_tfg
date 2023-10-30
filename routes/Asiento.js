const { Router } = require('express');
const router = Router();

const Aula = require('../models/Aula');
const Asiento = require('../models/Asiento');
const Escuela = require('../models/Escuela');

//*post asiento
router.post('/newAsiento', async (req, res) => {
    const { idAsiento, numeroAsiento, idAula } = req.body;
    const newAsiento = Asiento({ idAsiento, numeroAsiento, idAula });

    if (!idAula) { return res.status(500).json({ ok: false, errorMessage: 'El idAula es Requerido' }) };

    const asientos = await Asiento.find({idAula});
    for (let i = 0; i < asientos.length; i++) {
        if (newAsiento.numeroAsiento === asientos[i].numeroAsiento) {
            return res.status(500).json({ok: false, errorMessage: 'ESTE ASIENTO YA EXISTE'})
        }
    }

    await Aula.findOne({ idAula }).then(aula => {
        aula.asientos.push(newAsiento);
        aula.save();

        Escuela.findOneAndUpdate({ idEscuela: aula.idEscuela },
            {
                $set: {
                aulas: aula
            }
        }).then().catch(err => {
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

module.exports = router;