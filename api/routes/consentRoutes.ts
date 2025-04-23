import express from 'express';
import { consentController } from '../controllers/consentController';

const router = express.Router();

router.get('/', consentController.getAll);
router.post('/', consentController.create);
router.put('/:id', consentController.update);
router.delete('/:id', consentController.delete);

export default router;
