import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import alertContext from '../context/Alert/alertContext';
const Login = () => {
    const {showAlert} = useContext(alertContext);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // redirect
            localStorage.setItem('token', json.authToken)
            navigate('/');
            showAlert("LogIn Account Successfully!", "success");
        }
        else{
            showAlert("InValid Credentials", "denger")
        }
    };

    const handleChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={handleChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
