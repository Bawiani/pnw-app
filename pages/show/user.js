import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function User() {
  const [data, setdata] = useState("");
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
        const userData = JSON.parse(sessionStorage.getItem("user"))
        setdata(userData)
        const userRole = userData.role.toLowerCase().trim()  
    }
},[])
if(data){
  return (
    <div className='userHome'>
        <div className="userCard">
          <p>
            <img src="/" alt="" />
          </p>
            <div style={{fontSize:"30px"}}>{data.fname} {data.lname}</div>
            <div  style={{fontSize:"20px"}}>{data.role}</div>
            <p>
             <Link href="/dashboard">
             <button className="button">
                Back to Dashboard
              </button>
             </Link>
            </p>
        </div>
    </div>
  )
}else{
  return ""
}
}
