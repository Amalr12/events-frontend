
import React, { useEffect, useState } from 'react'
import { getEventAPI } from '../Services/allApi';

function User() {
       const[allEvents,setAllEvents]=useState([])
    
        
            const getEvent= async ()=>{
                try {
                    const result= await getEventAPI()
                    // console.log(result);
                    setAllEvents(result.data)
                    
                } catch (error) {
                    console.log("Something went wrong");
                }
            }
              useEffect(()=>{
                    getEvent()
                },[])
  return (
    <>
    <div className='home '>
                
                    <h1 className='text-4xl text-red-500 font-bold justify-center flex pt-10'>Event Scheduler</h1>
                    <h1 className='text-xl font-bold text-white p-5'>Welcome User</h1>
        
                    <div className=''>
                      { 
                      allEvents?.length>0 ?
                      allEvents?.map((item)=>(
                        <div className="grid grid-cols-[3fr_8fr] m-10 bg-gray-400 p-10">
                            <div className=' border-b-gray-700 border-4  p-5'>
                               
                                <h1 className='font-bold text-3xl justify-center items-center flex'>{item?.date}</h1>
                                 <h1 className='font-bold text-4xl justify-center items-center flex'>{item?.day}</h1>
                            </div>
                            <div className='p-5 items-justify text-center'>
                                <h1 className='text-xl'>Event : {item?.title}</h1>
                                <h1>Stating Time : {item?.startTime}</h1>
                                <h1>Ending Time : {item?.endTime}</h1>
                                
                                <h1>Description : {item?.description}</h1>
                                <h1>Created By : {item?.created}</h1>
        
                            </div>
                           
                        </div>
                      )):
                     
                        <h1 className='text-red-500 font-bold text-2xl'>No Events Added</h1>
                      
                       }
                    </div>
                   
            </div>
    </>
  )
}

export default User