import React, { useEffect } from "react";
import { useAppSelector } from "../../store";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const token = useAppSelector(state => state.authPersistedReducer.token)
    const isAuth = useAppSelector(state => state.authPersistedReducer.isAuth)


    const getUserRole = () => {
        if (!token) return
        const decodedToken = jwtDecode(token)
        return decodedToken.role
    }

    const getUserID = () => {
        if (!token) return
        const decodedToken = jwtDecode(token)
        return decodedToken._id
    }

    const dashboardAccess = () => {
        if (getUserRole() !== "admin") navigate("/tasks")
    }

    const userAccess = () => {
        if (getUserRole() !== "admin") navigate("/tasks")
    }

    const loginSuccessNavigation = () => {
        if (isAuth) {
            if (getUserRole() !== "admin") navigate("/tasks")
            else navigate("/dashboard")
        }
    }

    useEffect(() => {
        if (!isAuth) navigate("/")
    }, [isAuth])

    return {
        getUserRole,
        getUserID,
        dashboardAccess,
        loginSuccessNavigation,
        userAccess,
        isAuth,
        token,
    }
}

export default Auth