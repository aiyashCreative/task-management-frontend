import React from "react"
import { Routes, Route } from "react-router-dom";
import Login from "./views/Logn"
import Dashboard from "./views/Dashboard"
import Task from "./views/Task";
import User from "./views/User";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/tasks" element={<Task />} />
        <Route exact path="/users" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
