import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { userLogin } from "../../store/Auth/auth-actions";
import Auth from "../HOC/Auth";

const LoginComponent = () => {
    const { loginSuccessNavigation, isAuth } = Auth()
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const submitLogin = async (e) => {
        e.preventDefault()
        await dispatch(userLogin({
            email,
            password
        })).then(response => {
            if (response.type === "auth/token/rejected") {
                alert("Authenitcation Failed")
            }
        })
    }

    useEffect(() => {
        loginSuccessNavigation()
    }, [isAuth])

    return (
        <div className="container">

            <div className="row justify-content-center">

                <div className="col-xl-6 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user" onChange={(e) => setEmail(e.target.value)}
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" onChange={(e) => setPassword(e.target.value)}
                                                    id="exampleInputPassword" placeholder="Password" />
                                            </div>
                                            <button onClick={submitLogin} className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default LoginComponent