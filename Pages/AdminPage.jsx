
import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { addEventAPI, deleteEventAPI, getEventAPI, updateEventAPI } from '../Services/allApi';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [modal, setModal] = useState(false)
    const [allEvents, setAllEvents] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const navigate=useNavigate()
    const [event, setEvent] = useState({
        title: "", date: "", startTime: "", endTime: "", description: "", created: ""
    })
    // console.log(event);

    const handleReset = () => {
        setEvent({ title: "", date: "", day: "", startTime: "", endTime: "", description: "", created: "" })
    }

    const handleAdd = async () => {
        const { title, date, startTime, endTime, description, created } = event
        if (!title || !date || !startTime || !endTime || !description || !created) {
            alert(`Fill the form completely`)
        } else {
            const result = await addEventAPI(event)
            console.log(result);
            if (result.status == 200) {
               
                alert(`Event Added Successfully`)
                 setModal(false)
                handleReset()

            } else if (result.status == 406) {
                alert(result.response.data)
            } else {
                setModal(false)
                handleReset()
                alert("Something went Wrong")
            }

        }
    }

    const getEvent = async () => {
        try {
            const result = await getEventAPI()
            // console.log(result);
            setAllEvents(result.data)

        } catch (error) {
            console.log("Something went wrong");
        }
    }

    const handleDelete = async (id) => {
        try {
            const result = await deleteEventAPI(id)
            console.log(result);
            getEvent()

        } catch (error) {
            console.log(error);

        }
    }

    const handleUpdate = async () => {
        try {
            const result = await updateEventAPI(editId, event)
            console.log(result);
            setModal(false)
            setIsEdit(false)
            setEditId(null)
            handleReset()
            getEvent()



        } catch (error) {
            console.log(error);

        }
    }
    const handleLogOut=()=>{
        navigate("/")
    }



    useEffect(() => {
        getEvent()
    }, [allEvents])



    return (
        <>
            <div className='home '>

                <h1 className='text-4xl text-red-500 font-bold justify-center flex pt-10 '>Event Scheduler</h1>
               <div className='justify-between flex'>
                    <button onClick={() =>
                        setModal(true)
    
                    } className='bg-blue-800 rounded px-3 py-4 text-white font-bold mt-10 m-5'>Add Event +</button>
                  <div>  <button onClick={handleLogOut} type='button' className='bg-blue-800 rounded px-5 py-3 text-white font-bold mt-10 m-5'>Logout <FaPowerOff /></button></div>
               </div>


                <div className='p-2'>
                    {
                        allEvents?.length > 0 ?
                            allEvents?.map((item) => (
                                <div className="grid md:grid-cols-[3fr_8fr_3fr] m-10 bg-gray-400 p-10">
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
                                    <div className='flex justify-center items-center gap-3'>
                                        <button onClick={() => {
                                            setModal(true)
                                            setIsEdit(true)
                                            setEditId(item._id)
                                            setEvent(item)
                                        }} type='button' className='bg-blue-500 rounded text-white text-xl px-4 py-3'>Edit</button>
                                        <button onClick={() => { handleDelete(item?._id) }} type='button' className='bg-red-500 rounded text-white text-xl px-4 py-3'>Delete</button>
                                    </div>
                                </div>
                            )) :

                            <h1 className='text-red-500 font-bold text-2xl'>No Events Added</h1>

                    }
                </div>
                {
                    modal &&

                    <div id="dialog" aria-labelledby="dialog-title" className=" fixed inset-0 max-h-none overflow-y-auto bg-transparent backdrop:bg-transparent ">
                        <div className="fixed inset-0 bg-gray-900/50 transition-opacity "></div>
                        <div className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all">
                                <div className="bg-gray-800 p-4 flex justify-between text-white">
                                    {isEdit ? <h1 className='text-2xl font-bold'>Edit Event</h1> :
                                        <h1 className='text-2xl font-bold'>Add Events</h1>}
                                    <ImCancelCircle className='text-2xl' onClick={() => {
                                        setModal(false)
                                    }} />
                                </div>

                                {/* Modal Body */}

                                <div className="p-15">
                                    <div className='px-2'>
                                        <div className='mb-3 mt-3'>
                                            <input value={event?.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} type="text" placeholder='Title' className='p-2 border border-gray-200 w-full rounded' />
                                        </div>
                                        <div className='mb-3'>
                                            <input value={event?.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} type="text" placeholder='Description' className='p-2 border border-gray-200 w-full rounded' />
                                        </div>
                                    </div>
                                    <div className='px-2'>
                                        <div className='mb-3'>
                                            <input type="date"
                                                name="date" value={event?.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} placeholder='Date' className='p-2 border border-gray-200 w-full rounded' />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="text"
                                                value={event?.day} onChange={(e) => setEvent({ ...event, day: e.target.value })} placeholder='Day' className='p-2 border border-gray-200 w-full rounded' />
                                        </div>
                                        <div className='mb-3'>
                                            <input value={event?.startTime} onChange={(e) => setEvent({ ...event, startTime: e.target.value })} type="time" name="time" placeholder='startTime' className='p-2 border border-gray-200 w-full rounded' />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="time" value={event?.endTime} onChange={(e) => setEvent({ ...event, endTime: e.target.value })} placeholder='endTime' className='p-2 border border-gray-200 w-full rounded' />
                                        </div>
                                        <div className='mb-3'>
                                            <input value={event?.created} onChange={(e) => setEvent({ ...event, created: e.target.value })} type="text" placeholder='Created By' className='p-2 border border-gray-200 w-full rounded' />
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gray-300 px-4 py-3 sm:flex justify-end'>

                                    <button onClick={handleReset} type='button' className='ms-4 inline-flex  justify-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white'>Reset</button>
                                    {isEdit ? <button onClick={handleUpdate} type='button' className='ms-4 inline-flex  justify-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white'>Update</button> :
                                        <button onClick={handleAdd} type='button' className='ms-4 inline-flex  justify-center rounded-md bg-blue-600 px-3 py-2 text-sm text-white'>Submit</button>}
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </div>
        </>
    )
}

export default AdminPage