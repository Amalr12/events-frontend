
import React, { useEffect, useState } from 'react'
import { getEventAPI } from '../Services/allApi';
import { FaPowerOff } from 'react-icons/fa';

function User() {
    const [allEvents, setAllEvents] = useState([])


    const getEvent = async () => {
        try {
            const result = await getEventAPI()
            // console.log(result);
            setAllEvents(result.data)

        } catch (error) {
            console.log("Something went wrong");
        }
    }

    const handleLogOut = () => {
        navigate("/")
    }

    useEffect(() => {
        getEvent()
    }, [])
    return (
        <>
            <div className='home '>

                <h1 className='text-4xl text-red-500 font-bold justify-center flex pt-10'>Event Scheduler</h1>
                <div className='flex justify-between'><h1 className='text-xl font-bold text-white p-5'>Welcome User</h1>
                    <button onClick={handleLogOut} type='button' className='bg-blue-800 rounded px-5 py-3 text-white font-bold mt-10 m-5'>Logout <FaPowerOff /></button>
                </div>

                <div className=''>
                    {
                        allEvents?.length > 0 ?
                            allEvents?.map((item) => (
                                <div className="grid md:grid-cols-[3fr_8fr] m-10 bg-gray-400 p-10">
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
                            )) :

                            <h1 className='text-red-500 font-bold text-2xl'>No Events Added</h1>

                    }
                </div>

            </div>
        </>
    )
}

export default User