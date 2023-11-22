const { Router } = require('express');
const multer = require('multer')
const router = Router();
const path = require('path');

const verifyToken = require('../helpers/verifyToken');
const Escuela = require('../models/Escuela');
const User = require('../models/User');
const Aula = require('../models/Aula');

//* post escuela
router.post('/newEscuela', verifyToken, async (req, res) => {

    try {
    
        const { nombreEscuela, direccion, ciudad, codigo_postal, provincia, imagen } = req.body;
        const userId = req.userId;
    
        if (!nombreEscuela || !direccion || !ciudad || !codigo_postal || !provincia) {
            return res.status(500).json({ ok: false, errorMessage: 'Todos los campos son requeridos' });
        }
    
        const escuelaExistente = await Escuela.findOne({ nombreEscuela });
        if (escuelaExistente) {
            return res.status(500).json({ ok: false, errorMessage: 'Esta escuela ya existe' });
        }
    
        const nuevaEscuela = Escuela({ nombreEscuela, direccion, ciudad, codigo_postal, provincia, imagen, userId});

        await User.findByIdAndUpdate(userId, {
            $set: {
                idEscuela: nuevaEscuela._id
            }
        });

        nuevaEscuela.save().then(escuela => {
            res.status(200).json({ok: true, escuela})
        }).catch(err => {
            res.status(500).json({ok: false, errorMessage: 'ERROR CREANDO AULA'});
        });
        
    } catch (error) {
        res.status(500).json({ ok: false, errorMessage: err });
    }
});


//* get escuelas
router.get('/allEscuelas', async (req, res) => {
    await Escuela.find().then(escuelas => {
        res.status(200).send(escuelas);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO LAS ESCUELAS' });
    });
});

//* get escuelaById
router.get('/getEscuelaById/:id', async (req, res) => {
    await Escuela.findById(req.params.id).then(escuela => {
        res.status(200).send(escuela);
    }).catch(err => {
        res.status(500).json({ ok: false, errorMessage: 'ERROR BUSCANDO ESCUELA' });
    });
});

//* update escuela
router.patch('/updateEscuelas/:id', async (req, res) => {
    try {
        const escuelaId = req.params.id;
        const updatedData = req.body;
    
        const escuela = await Escuela.findById(escuelaId);
        if (!escuela) {
            return res.status(404).json({ ok:false, errorMessage: 'Escuela no encontrada' });
        }
    
        Object.assign(escuela, updatedData);
        await escuela.save();
        return res.json({ ok: true, escuela });
        
    } catch (error) {
        res.json({ ok: false, errorMessage: error });
    }
});

//* delete escuela
router.delete('/deleteEscuela/:id', async (req, res) => {

    try {

        await Escuela.findByIdAndDelete(req.params.id).then(escuela => {
            res.status(200).send(escuela);
        });
    
        Aula.deleteMany({ idEscuela: req.params.id });
        
    } catch (error) {
        res.status(404).json({ ok: false, error });
    }
});


//*-------------------- imagen --------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
router.post('/uploadImage', upload.single('file'), async (req, res) => {
    try {
        const fileName = req.file.filename;
        const filePath = path.join(__dirname, 'uploads', fileName);
        res.json({ ok: true, message: 'Archivo subido correctamente', fileName, filePath });
    } catch (error) {
        res.status(500).json({ ok: false, messageError: 'ERROR'})
    }
});

const uploadsDir = path.join(__dirname, '..', 'uploads');
router.get('/downloadImage/:filename', (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join(uploadsDir, filename);
      
      res.sendFile(filePath);
    } catch (error) {
      res.status(500).json({ ok: false, messageError: 'ERROR' });
    }
  });


module.exports = router;