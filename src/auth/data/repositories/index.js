import axios from "axios";

const URL = import.meta.env.VITE_REACT_APP_API_RESTAURANTE;


export const loginRepo = async (form) => {
    try {
        const {data} = await axios.post(`${URL}/auth/login` , form, {
            headers: {
                "Content-Type": "application/json",
            },
            
        });
        return data
    } catch (error) {
        throw error
    }
}