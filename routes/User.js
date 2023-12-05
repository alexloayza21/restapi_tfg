const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../helpers/config');
const verifyToken = require('../helpers/verifyToken');

const User = require('../models/User');

//* registrar
router.post('/signup', async (req, res) => {
    const { username, email, password, admin } = req.body;
    const mail = await User.findOne({ email });
    if (mail) {
        return res.status(404).json({ ok: false, errorMessage: 'Este Email Ya Existe' });
    }
    const name = await User.findOne({ username });
    if (name) {
        return res.status(404).json({ ok: false, errorMessage: 'Este Nombre de Usuario Ya Existe' });
    }
    const user = new User({ username, email, password, admin });
    user.password = await user.encryptPassword(user.password);

    await user.save();
    const token = jwt.sign({ id: user._id }, config.secret, {});

    User.findByIdAndUpdate(user._id, {
        $set: {
            token: token
        }
    }, {new: true}).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(400).json({ ok: false, errorMessage: err });
    });
    
});

//* login
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ ok: false, errorMessage: 'Email incorrecto' });
    }

    const validPassword = await user.validarPassword(password);
    if (!validPassword) {
        return res.status(401).json({ auth: false, token: null , errorMessage: 'Contraseña Incorrecta'});
    }
    const token = jwt.sign({ id: user._id }, config.secret, {});

    User.findByIdAndUpdate(user._id, {
        $set: {
            token: token
        }
    }, {new: true}).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(400).json({ ok: false, errorMessage: err });
    });

});

//* perfil
router.get('/auth', verifyToken, async (req, res, next) => {
    await User.findById(req.userId, {password: 0}).then(usuario => {
        if (usuario) {
            return res.status(200).json(usuario);
        } else {
            return res.status(404).json({ok: false, errorMessage: 'User not found'})
        }
    });
});

//* perfil reservas del usuario
router.get('/getReservasUsuarios', verifyToken, async (req, res, next) => {
    await User.findById(req.userId, {password: 0}).then(usuario => {
        if (usuario) {
            return res.status(200).send(usuario.reservas);
        } else {
            return res.status(404).json({ok: false, errorMessage: 'User not found'})
        }
    });
});


module.exports = router;