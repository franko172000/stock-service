import { Router } from 'express';
const router = Router();
import AuthController from "../app/controllers/AuthController";

/* GET home page. */
router.post('/', AuthController.register.bind(AuthController));
// router.get('api/login', AuthController.login);
export default router;
