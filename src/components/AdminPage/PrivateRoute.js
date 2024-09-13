import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ component: Component }) {
  const isAuthenticated = !!localStorage.getItem('adminToken');

  return isAuthenticated ? <Component /> : <Navigate to="/admin/login" />;
};