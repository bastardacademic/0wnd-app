import express from 'express';
import { devotionController } from '../controllers/devotionController';

const router = express.Router();

router.get('/', devotionController.getAll);
router.post('/', devotionController.create);
router.put('/:id', devotionController.update);
router.delete('/:id', devotionController.delete);

export default router;
