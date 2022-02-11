const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validateInputs } = require('../middlewares/validate-inputs');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateInputs
], login);

router.post('/google', [
    check('id_token', 'Token is required').not().isEmpty(),
    validateInputs
], googleSignIn);


module.exports = router;