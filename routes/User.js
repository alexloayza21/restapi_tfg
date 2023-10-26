const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../helpers/config');
const verifyToken = require('../helpers/verifyToken');

const User = require('../models/User');

//* registrar
router.post('/signup', async (req, res, next) => {
    const { username, email, password, admin } = req.body;
    
    if (password.length < 6) {
        return res.status(500).json({ ok: false, errorMessage: 'La contaseña debe tener minimo 6 carácteres' });
    }

    const user = User({ username, email, password, admin });
    user.password = await user.encryptPassword(user.password);

    await user.save().then(result => {
        const token = jwt.sign({ id: user._id }, config.secret, {});
        res.status(200).json({auth: true, token})
    }).catch(error => {
        if (!user.admin) {
            return res.status(500).json({ ok: false, errorMessage: 'Admin es obligatorio' });
        }
    });
});

//* login
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send('Este email no existe');
    }

    const validPassword = await user.validarPassword(password);
    if (!validPassword) {
        return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {});

    res.json({ auth: true, token });

});

//* perfil
router.get('/usuario', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, {password: 0}).then(usuario => {
        if (usuario) {
            return res.status(200).json(usuario);
        } else {
            return res.status(404).json({ok: false, errorMessage: 'User not found'})
        }
    });
});


module.exports = router;