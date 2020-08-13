import express from 'express';

import classesController from './controllers/classesController';
import connectionsController from './controllers/connectionsController';

import classesControllerValidators from './middlewares/validators/classesControllerValidators';
import connectionsControllerValidators from './middlewares/validators/connectionsControllerValidators';

const router = express.Router();

router.get('/classes', classesControllerValidators.list, classesController.list);
router.post('/classes', classesControllerValidators.store,classesController.store);

router.get('/connections', connectionsController.list);
router.post('/connections', connectionsControllerValidators.store, connectionsController.store);

export default router;
