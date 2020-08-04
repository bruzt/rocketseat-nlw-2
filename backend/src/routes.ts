import express, { Request, Response } from 'express';

import classesController from './controllers/classesController';
import connectionsController from './controllers/connectionsController';

const router = express.Router();

router.get('/classes', classesController.index);
router.post('/classes', classesController.store);

router.get('/connections', connectionsController.index);
router.post('/connections', connectionsController.store);

export default router;