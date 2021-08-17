import { Router } from 'express';
import UserController from '@controllers/UserController';

const router: Router = Router();

router
  .route('/users')
  // .post(UserController.addUser)
  .get(UserController.getUsers);

// router
//   .route('/users/:userId')
//   .get(UserController.getUser)
//   .put(UserController.updateUser)
//   .delete(UserController.deleteUser);

export const UserRoutes: Router = router;