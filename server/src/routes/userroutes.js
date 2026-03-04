const { Router } = require('express');
const { getUserById, loginUser } = require('../controllers/usercontroller');

const router = Router();

router.get('/:id', getUserById);
router.post('/login', loginUser);

module.exports = router;