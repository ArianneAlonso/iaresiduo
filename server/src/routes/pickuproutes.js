const { Router } = require('express');
const { createPickup, getPickups } = require('../controllers/pickupcontroller');

const router = Router();

router.post('/', createPickup);
router.get('/', getPickups);

module.exports = router;