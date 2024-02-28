import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import alertContext from '../context/Alert/alertContext';
const Signup = () => {
    const {showAlert} = useContext(alertContext);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // redirect
            localStorage.setItem('token', json.authToken)
            navigate('/');
            showAlert("Created Account Successfully!", "success");
        }
        else{
            showAlert("InValid Credentials", "danger")
        }
    };

    const handleChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter Your email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Enter Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={handleChange} minLength={5} required/>
                </div>
                <button disabled = {credentials.password.length === 0 || credentials.password !== credentials.cpassword} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}

export default Signup

