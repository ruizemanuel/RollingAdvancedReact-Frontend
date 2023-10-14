import axios from "axios";

const URL = import.meta.env.VITE_API_BAKER_AUTH;


export const loginRepo = async (form) => {
    try {
        const {data} = await axios.post(`${URL}/login` , form, {
            headers: {
                "Content-Type": "application/json",
                // "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                //   .token,
            },
            
        });
        return data
    } catch (error) {
        throw error
    }
}