import express from 'express';
import { ritualController } from '../controllers/ritualController';

const router = express.Router();

router.get('/', ritualController.getAll);
router.post('/', ritualController.create);
router.put('/:id', ritualController.update);
router.delete('/:id', ritualController.delete);

export default router;
