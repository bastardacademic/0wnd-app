import express from 'express';
import { promptController } from '../controllers/promptController';

const router = express.Router();

router.get('/', promptController.getAll);
router.post('/', promptController.create);
router.put('/:id', promptController.update);
router.delete('/:id', promptController.delete);

export default router;
