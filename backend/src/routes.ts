import express from 'express';

import classesController from './controllers/classesController';
import connectionsController from './controllers/connectionsController';

const router = express.Router();

router.get('/classes', classesController.list);
router.post('/classes', classesController.store);

router.get('/connections', connectionsController.list);
router.post('/connections', connectionsController.store);

export default router;
