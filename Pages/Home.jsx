import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
     <section  className="hero-section  bg-light">
        <div className="hero-overlay transparent">
          <h1 className="mb-3 text-2xl font-bold">Event Schedule App</h1>
          <Link to={"/login"}><button className='bg-blue-600 px-5 py-3 rounded font-bold text-xl'>Login</button></Link>

        </div>
      </section>
    
    </>
  )
}

export default Home