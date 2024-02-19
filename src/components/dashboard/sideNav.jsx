import React from "react";
import { Link } from "react-router-dom";
import Auth from "../HOC/Auth";

const SideNav = () => {
    const { getUserRole } = Auth()
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">TMS-Informatics</div>
            </a>


            <hr className="sidebar-divider my-0" />


            <li className="nav-item">
                <Link className={`nav-link ${getUserRole() !== "admin" && 'disabled'}`} to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>


            <hr className="sidebar-divider" />


            <div className="sidebar-heading">
                Interface
            </div>

            <li className="nav-item">
                <Link to="/tasks" className="nav-link">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tasks</span></Link>
            </li>

            <li className="nav-item">
                <Link to="/users" className={`nav-link ${getUserRole() !== "admin" && 'disabled'}`}>
                    <i className="fas fa-fw fa-table"></i>
                    <span>Users</span></Link>
            </li>


            <hr className="sidebar-divider d-none d-md-block" />


            {/* <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div> */}

        </ul>
    )
}

export default SideNav