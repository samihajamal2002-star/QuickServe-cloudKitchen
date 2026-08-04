import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {

        return <Navigate to="/login" replace />;

    }

    if (role && user.role.toLowerCase() !== role.toLowerCase()) {

        return <Navigate to="/" replace />;

    }

    return children;

};

export default PrivateRoute;