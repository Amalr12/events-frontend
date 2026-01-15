
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../Services/allApi';


function Auth({register}) {
     const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  const navigate = useNavigate()

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      alert("Fill the form completely")
    } else {
      const result = await registerAPI(userDetails)
      console.log(result);

      if (result.status == 200) {
       alert("Registered successfully")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate("/login")
      } else if (result.status == 406) {
        alert(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        alert("Something Went Wrong")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  const handleLogin = async () => {
    const { email, password } = userDetails

    if (!email || !password) {
      alert("Fill the form completely")
    } else {
      const result = await loginAPI({ email, password })
      console.log(result);


      if (result.status == 200) {
       alert("Login Successfull")
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
       
        if (result.data.existingUser.email == "admin@gmail.com") {
         
            navigate("/admin-page")
         
        } else {
          
            navigate("/user-page")
        
        }
      }
      else if (result.status == 403 || result.status == 406) {
       alert(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        alert("something Went Wrong!!!")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }
    return (
        <>
            <div className=''>
                <div id='auth' className='justify-content-center align-items-center' style={{ backgroundImage: "https://png.pngtree.com/thumb_back/fh260/background/20230617/pngtree-monthly-calendar-alert-for-business-planning-a-3d-rendered-illustration-of-image_3611061.jpg", backgroundPosition: "fixed", backgroundRepeat: "no-repeat" }}>

                    <div className='md:grid grid-cols-3 w-full mt-9'>
                        <div></div>
                        <div className='p-5'>
                            <form action="" className='bg-gray-900  rounded flex justify-center items-center flex-col w-full p-10'>
                                <div style={{ width: "70px", height: "70px", borderRadius: "50%", border: "1px solid white" }} className='flex justify-center items-center text-white'>
                                    <FaRegUserCircle className='text-7xl' />
                                </div>


                                {register ? <h1 className='text-white text-2xl my-5'>Register</h1> :
                                    <h1 className='text-white text-2xl my-5'>Login</h1>}

                                {register && <div className='my-3 w-full'>
                                    <label htmlFor="" className='text-white'>Username</label>
                                    <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Enter your Username' className='w-full bg-white rounded p-2' />
                                </div>}
                                <div className='my-3 w-full'>
                                    <label htmlFor="" className='text-white my-3'>Email</label>
                                    <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="email" placeholder='Enter your Email' className='w-full bg-white rounded p-2' />
                                </div>
                                <div className='my-3 w-full'>
                                    <label htmlFor="" className='text-white my-3'>Password</label>
                                    <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='Enter your Password' className='w-full bg-white rounded p-2' />
                                </div>
                                <div className='my-3 w-full'>
                                    {register ? <button type='button' onClick={handleRegister} className='w-full bg-green-700 p-2 rounded text-white hover:bg-green-800 mb-2'>Register</button> :
                                        <button type='button' onClick={handleLogin} className='w-full bg-green-700 p-2 rounded text-white hover:bg-green-800'>Login</button>}
                                </div>

                               

                                <div className='text-white'>
                                    {register ? <p>Are you a Already User? <Link to={"/login"} className='text-blue-400 underline'>Login</Link></p> :
                                        <p>Are you a New User? <Link to={"/register"} className='text-blue-400 underline'>Register</Link></p>}
                                </div>
                            </form>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth