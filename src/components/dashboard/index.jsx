import React, { useEffect, useState } from "react";
import LayoutComponent from "./layout";
import { API_WITH_TOKEN } from "../../api/config";
import Auth from "../HOC/Auth";
import LoadingOverlay from 'react-loading-overlay';

const DashboardComponent = () => {
    const { dashboardAccess, token } = Auth()
    const [loading, setLoading] = useState(false)
    const [pendingTasksCount, setPendingTasksCount] = useState(0)
    const [onProgressTasksCount, setOnProgressTasksCount] = useState(0)
    const [completedTasksCount, setCompletedTasksCount] = useState(0)
    const [usersCount, setUsersCount] = useState(0)

    const getAllUsers = () => {
        setLoading(true)
        API_WITH_TOKEN(token).get('/users/get-all').then(response => {
            const users = response.data.data
            setUsersCount(users.length)
            setLoading(false)
        }).catch(error => {
            console.log("Error:", error)
            setLoading(false)
        })

    }

    const getAllTasks = () => {
        setLoading(true)
        API_WITH_TOKEN(token).get('/tasks/get-all').then(response => {
            const tasks = response.data.data
            const pendingTasks = tasks.filter(task => task.status === "pending")
            const onProgressTasks = tasks.filter(task => task.status === "on progress")
            const completedTasks = tasks.filter(task => task.status === "completed")
            setPendingTasksCount(pendingTasks.length)
            setOnProgressTasksCount(onProgressTasks.length)
            setCompletedTasksCount(completedTasks.length)
            setLoading(false)
        }).catch(error => {
            console.log("Error:", error)
            setLoading(false)
        })

    }

    useEffect(() => {
        dashboardAccess()
        getAllTasks()
        getAllUsers()
    }, [""])

    return (
        <LoadingOverlay
            active={loading}
            spinner
        >
            <LayoutComponent>
                <div className="row">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Users</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{usersCount}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-danger shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                            Pending Tasks</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{pendingTasksCount}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            On Progress Tasks</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{onProgressTasksCount}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Completed Tasks</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{completedTasksCount}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </LoadingOverlay>
    )
}

export default DashboardComponent