import { UserRoutes } from '@routes/UserRoute';

const API = '/api';

export default (app) => {
  app.use(API, UserRoutes);
};