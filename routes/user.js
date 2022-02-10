const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs, validateJWT, isAdminRole, hasRole } = require('../middlewares')

const { isValidRole, emailExist, userExist } = require('../helpers/db-validators');

const { usersGet, userPut, userPost, userDelete } = require('../controllers/user');

const router = Router();

router.get('/', usersGet);


router.put('/:id', [
    check('id', "Not a valid ID").isMongoId(),
    check('id').custom(userExist),
    validateInputs
], userPut);


router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(isValidRole),
    validateInputs
], userPost);


router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'),
    check('id', "Not a valid ID").isMongoId(),
    check('id').custom(userExist),
    validateInputs
], userDelete);



module.exports = router;