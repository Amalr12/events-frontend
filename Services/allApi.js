import { commonAPI } from "./CommonApi"
import { serverURL } from "./ServerURL"


// regsiter api
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/register`, reqBody)
}

// loginAPI
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/login`, reqBody)
}

export const addEventAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/add-event`, reqBody)
}

export const getEventAPI = async () => {
    return await commonAPI("GET", `${serverURL}/get-event`)
}
export const deleteEventAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/delete-event/${id}`)
}

export const updateEventAPI = async (id,reqBody) => {
    return await commonAPI("PUT", `${serverURL}/update-event/${id}`,reqBody)
}


