const { Router } = require('express');
const multer = require('multer')
const router = Router();

const verifyToken = require('../helpers/verifyToken');
const Escuela = require('../models/Escuela');
const User = require('../models/User');

//* post escuela
router.post('/newEscuela', verifyToken, async (req, res) => {
    
    const { nombreEscuela, direccion, ciudad, codigo_postal, provincia, imagen, aulas } = req.body;

    if (!nombreEscuela || !direccion || !ciudad || !codigo_postal || !provincia) {
        return res.status(500).json({ ok: false, errorMessage: 'Todos los campos son requeridos' });
    }

    const escuelaExistente = await Escuela.findOne({ nombreEscuela });
    if (escuelaExistente) {
        return res.status(500).json({ ok: false, errorMessage: 'Esta escuela ya existe' });
    }

    const nuevaEscuela = Escuela({ nombreEscuela, direccion, ciudad, codigo_postal, provincia, imagen, aulas});
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

//* get escuelaById
router.get('/getEscuelaById/:id', (req, res) => {
    Escuela.findById(req.params.id).then(escuela => {
        res.status(200).send(escuela);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO ESCUELA' });
    });
});

router.patch('/updateEscuelas/:id', async (req, res) => {
    const escuelaId = req.params.id;
    const updatedData = req.body;

    const escuela = await Escuela.findById(escuelaId);
    if (!escuela) {
        return res.status(404).json({ ok:false, errorMessage: 'Escuela no encontrada' });
    }

    Object.assign(escuela, updatedData);
    await escuela.save();
    return res.json({ ok: true, escuela });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/uploadImage/:idEscuela', upload.single('file', async (req, res) => {
    try {
        const escuelaId = req.params.idEscuela;
        const imagenPath = req.file.path;

        const escuela = await Escuela.findById(escuelaId);
        escuela.imagen = imagenPath;
        await escuela.save();

        res.status(200).json({ ok: true, escuela });

    } catch (error) {
        res.status(500).json({ ok: false, messageError: 'ERROR'})
    }
}));



module.exports = router;