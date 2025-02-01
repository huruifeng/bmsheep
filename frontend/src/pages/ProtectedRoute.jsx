import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ProtectedRoute = ({ children }) => {
    const token = useAuthStore((state) => state.token);

    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
