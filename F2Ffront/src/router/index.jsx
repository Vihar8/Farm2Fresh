import { createBrowserRouter } from 'react-router-dom';

// project import
import ClientRoutes from './ClientRoutes.jsx';
import AdminRoutes from './AdminRoutes.jsx';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([
    ClientRoutes,
    AdminRoutes
]);

export default router;