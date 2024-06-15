import React from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard({loginStatus,setLoginStatus}) {
    const navigate = useNavigate()
    function handleLogout(){
        setLoginStatus(false);
        navigate("/login")
    }
  return (
    <div>
        <button onClick={handleLogout} className='px-6 py-2 border-2 '>
            Logout
        </button>
    </div>
  )
}

export default Dashboard