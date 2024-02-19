import React, { useEffect, useState } from "react";
import LayoutComponent from "../layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { API_WITH_TOKEN } from "../../../api/config";
import Auth from "../../HOC/Auth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingOverlay from 'react-loading-overlay';

const UsersComponent = () => {
    const { userAccess, getUserRole, token } = Auth()
    const [users, setUsers] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [userRole, setUserRole] = useState("")
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [showAddModal, setAddModal] = useState(false)
    const handleCloseAddModal = () => setAddModal(false);

    const handleOpenAddModal = () => {
        setAddModal(true);
        setEmail("")
        setName("")
        setUserRole("")
    }

    const getAllUsers = () => {
        setLoading(true)
        API_WITH_TOKEN(token).get('/users/get-all').then(response => {
            setUsers(response.data.data)
            setCount(response.data.count)
            setLoading(false)
        }).catch(error => {
            console.log("Error:", error)
            setLoading(false)
        })

    }

    const deleteUser = (_id) => {
        setLoading(true)
        API_WITH_TOKEN(token).delete(`/users/delete/${_id}`).then(response => {
            if (response.status == 200) {
                const usersCopy = [...users]
                const index = usersCopy.findIndex(user => user._id === _id)
                if (index >= 0) {
                    usersCopy.splice(index, 1)
                    setUsers(usersCopy)
                    setCount(usersCopy.length)
                }
            }
            setLoading(false)
        }).catch(error => {
            console.log("Error:", error)
            setLoading(false)
        })

    }

    const addUser = () => {
        if (email && name && userRole && password) {
            setLoading(true)
            API_WITH_TOKEN(token).post(`/users/create`, {
                email, name, password, user_role: userRole
            }).then(response => {
                const addedData = {
                    _id: response.data.data._id,
                    email: response.data.data.email,
                    name: response.data.data.name,
                    user_role: response.data.data.user_role
                }

                const usersCopy = [...users]
                usersCopy.push(addedData)
                setUsers(usersCopy)
                setCount(usersCopy.length)
                setLoading(false)
            }).catch(err => {
                alert(err.response.data.message)
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        userAccess()
        getAllUsers()
    }, [""])

    useEffect(() => {
        if (email && name && password && userRole) setSubmitButtonDisabled(false)
        else setSubmitButtonDisabled(true)
    }, [email, name, password, userRole])

    const actionButton = (user) => {
        return (
            <div>
                {getUserRole() === "admin" && <button className="btn btn-outline-danger btn-sm" onClick={() => deleteUser(user._id)}><i className="fa fa-trash"></i></button>}
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
                                            <h6 className="m-0 font-weight-bold text-dark">Users {count}</h6>
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
                                    value={users}
                                    stripedRows
                                    tableStyle={{ minWidth: '50rem' }}
                                >
                                    <Column field="name" header="Name"></Column>
                                    <Column field="email" header="Email"></Column>
                                    <Column field="user_role" header="User Role"></Column>
                                    <Column header="Actions" body={actionButton}></Column>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
                {/* add task modal */}
                <Modal show={showAddModal} onHide={handleCloseAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-user" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control form-control-user" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-user" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <select className="form-control form-select" aria-label="Default select example" onChange={(e) => setUserRole(e.target.value)}>
                                    <option key="1" selected value="">Select Role</option>
                                    <option key="2" value="admin">Admin</option>
                                    <option key="3" value="staff">Staff</option>
                                    <option key="4" value="user">User</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddModal}>
                            Close
                        </Button>
                        <Button disabled={submitButtonDisabled} variant="primary" onClick={addUser}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </LayoutComponent>
        </LoadingOverlay >
    )
}

export default UsersComponent