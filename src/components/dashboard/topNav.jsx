import React from "react";
import { useDispatch } from 'react-redux';
import { logout } from "../../store/Auth/auth-slice";

const TopNavBar = () => {
    const dispatch = useDispatch()

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <a
                        className="nav-link dropdown-toggle"
                        onClick={() => dispatch(logout())}
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className="mr-2 d-none d-lg-inline text-gray-700 font-weight-bold small">
                            Logout
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default TopNavBar