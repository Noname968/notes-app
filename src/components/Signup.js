import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
  const [details, setdetails] = useState({ name: "", email: "", password: "", cpassword: "" });
  let history = useHistory();
  const onchange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value })
  }
    const handlesubmit = (async (e) => {
      e.preventDefault();
      const { name, email, password } = details;
      const response = await fetch(`http://localhost:5000/api/auth/cruser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });
      const json = await response.json();
      console.log(json)
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showalert("Signed Up Successfully", "success")
    })
  return (
    <div className='container'>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onchange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onchange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={7} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' minLength={7} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
