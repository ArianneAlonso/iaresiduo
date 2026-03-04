const { Router } = require('express');
const { getEvents, createEvent } = require('../controllers/eventcontroller');

const router = Router();

router.get('/events', getEvents);
router.post('/events', createEvent);

module.exports = router;