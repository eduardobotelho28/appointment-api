import { Router }                            from 'express';
import { userController }                    from '../controllers/userController';
import { authenticateToken, authorizeAdmin } from '../middlewares/auth';

const router = Router();

router.post('/register', userController.register); 
router.post('/login', userController.login);

router.use(authenticateToken); 
router.use(authorizeAdmin); 

router.get('/', userController.getAllUsers)          ;
router.get('/:id', userController.getUserById as any);
router.put('/:id', userController.updateUser)        ;
router.delete('/:id', userController.deleteUser)     ;

export default router;
