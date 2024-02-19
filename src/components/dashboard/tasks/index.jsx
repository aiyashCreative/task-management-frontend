import React, { useEffect, useState } from "react";
import LayoutComponent from "../layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { API_WITH_TOKEN } from "../../../api/config";
import Auth from "../../HOC/Auth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingOverlay from 'react-loading-overlay';

const TasksComponent = () => {
    const { getUserRole, token } = Auth()
    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("")
    const [taskID, setTaskID] = useState("")
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [showEditModal, setEditModal] = useState(false)
    const [showAddModal, setAddModal] = useState(false)
    const handleCloseEditModal = () => setEditModal(false);
    const handleCloseAddModal = () => setAddModal(false);

    const handleOpenAddModal = () => {
        setAddModal(true);
        setTitle("")
        setStatus("")
    }

    const handleOpenEditModal = (_id) => {
        const task = tasks.find(task => task._id === _id)
        setTitle(task.title)
        setStatus(task.status)
        setTaskID(_id)
        setEditModal(true)
    }

    const getAllTasks = () => {
        setLoading(true)
        API_WITH_TOKEN(token).get('/tasks/get-all').then(response => {
            setTasks(response.data.data)
            setCount(response.data.count)
            setLoading(false)
        }).catch(error => {
            console.log("Error:", error)
            setLoading(false)
        })

    }

    const deleteTask = (_id) => {
        setLoading(true)
        API_WITH_TOKEN(token).delete(`/tasks/delete/${_id}`).then(response => {
            if (response.status == 200) {
                const tasksCopy = [...tasks]
                const index = tasksCopy.findIndex(task => task._id === _id)
                if (index >= 0) {
                    tasksCopy.splice(index, 1)
                    setTasks(tasksCopy)
                    setCount(tasksCopy.length)
                }
            }
            setLoading(false)
        }).catch(error => {
            console.log("Error:", error)
            setLoading(false)
        })

    }

    const addTask = () => {
        if (title && status) {
            setLoading(true)
            API_WITH_TOKEN(token).post(`/tasks/create`, {
                title,
                status
            }).then(response => {
                if (response.data.data) {
                    const addedData = {
                        _id: response.data.data._id,
                        title: response.data.data.title,
                        status: response.data.data.status
                    }

                    const tasksCopy = [...tasks]
                    tasksCopy.push(addedData)
                    setTasks(tasksCopy)
                    setCount(tasksCopy.length)
                }
                setLoading(false)
            }).catch(error => {
                console.log("Error:", error)
                setLoading(false)
            })

        }
    }

    const editTask = () => {
        if (title && status) {
            const _id = taskID
            setLoading(true)
            API_WITH_TOKEN(token).put(`/tasks/update/${_id}`, {
                title,
                status
            }).then(response => {
                if (response.status == 200) {
                    const tasksCopy = [...tasks]
                    const index = tasksCopy.findIndex(task => task._id === _id)
                    if (index >= 0) {
                        tasksCopy[index].title = title
                        tasksCopy[index].status = status
                        setTasks(tasksCopy)
                    }
                }
                setLoading(false)
            }).catch(error => {
                console.log("Error:", error)
                setLoading(false)
            })

        }
    }

    useEffect(() => {
        getAllTasks()
    }, [""])

    useEffect(() => {
        if (title && status) setSubmitButtonDisabled(false)
        else setSubmitButtonDisabled(true)
    }, [title, status])

    const actionButton = (task) => {
        return (
            <div>
                <button className="btn btn-outline-success btn-sm mr-1" onClick={() => handleOpenEditModal(task._id)}><i className="fa fa-pen"></i></button>
                {getUserRole() === "admin" && <button className="btn btn-outline-danger btn-sm" onClick={() => deleteTask(task._id)}><i className="fa fa-trash"></i></button>}
            </div>
        )
    }

    return (
        <LoadingOverlay
            active={loading}
            spinner
        >
            <LayoutComponent>
                {/* content */}
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="m-0 font-weight-bold text-dark">Tasks {count}</h6>
                                        </div>
                                        {
                                            getUserRole() === "admin" && <div className="col-6 text-right">
                                                <button className="btn btn-outline-danger btn-sm" onClick={handleOpenAddModal}><i className="fa fa-plus"></i></button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <DataTable
                                    paginator
                                    rows={10}
                                    rowsPerPageOptions={[10, 20, 50]}
                                    selectionMode="checkbox"
                                    selection={selectedProducts}
                                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                                    dataKey="_id"
                                    value={tasks}
                                    stripedRows
                                    tableStyle={{ minWidth: '50rem' }}
                                >
                                    <Column field="title" header="Title"></Column>
                                    <Column field="status" header="Status"></Column>
                                    {
                                        getUserRole() !== "user" && <Column header="Actions" body={actionButton}></Column>
                                    }
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
                {/* add task modal */}
                <Modal show={showAddModal} onHide={handleCloseAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-user" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <select className="form-control form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                                    <option key="1" selected value="">Select Status</option>
                                    <option key="2" value="pending">Pending</option>
                                    <option key="3" value="on progress">On Porgress</option>
                                    <option key="4" value="completed">Completed</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddModal}>
                            Close
                        </Button>
                        <Button disabled={submitButtonDisabled} variant="primary" onClick={addTask}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* update task modal */}
                <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-user" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <select className="form-control form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                                    <option key="2" value="pending" selected={status === "pending"}>Pending</option>
                                    <option key="3" value="on progress" selected={status === "on progress"}>On Porgress</option>
                                    <option key="4" value="completed" selected={status === "completed"}>Completed</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Close
                        </Button>
                        <Button disabled={submitButtonDisabled} variant="primary" onClick={editTask}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </LayoutComponent>
        </LoadingOverlay >
    )
}

export default TasksComponent