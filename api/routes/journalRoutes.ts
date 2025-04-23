import express from 'express';
import { journalController } from '../controllers/journalController';

const router = express.Router();

router.get('/', journalController.getAll);
router.post('/', journalController.create);
router.put('/:id', journalController.update);
router.delete('/:id', journalController.delete);

export default router;
