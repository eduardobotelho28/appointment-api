import { Router }                from 'express';
import { appointmentController } from '../controllers/appointmentController';
import { authenticateToken }     from '../middlewares/auth';

const router = Router();

router.use(authenticateToken);

router.post('/', appointmentController.create as any)     ;
router.get('/', appointmentController.getAll as any)      ;
router.get('/:id', appointmentController.getById as any)  ;
router.put('/:id', appointmentController.update as any)   ;
router.delete('/:id', appointmentController.delete as any);

export default router;
