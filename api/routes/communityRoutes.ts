import express from 'express';
import { communityController } from '../controllers/communityController';

const router = express.Router();

router.get('/', communityController.getAll);
router.post('/', communityController.create);
router.put('/:id', communityController.update);
router.delete('/:id', communityController.delete);

export default router;
