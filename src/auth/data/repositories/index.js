import axios from "axios";

const URL = import.meta.env.VITE_REACT_APP_API_RESTAURANTE;


export const loginRepo = async (form) => {
    try {
        const {data} = await axios.post(`${URL}/auth/login` , form, {
            headers: {
                "Content-Type": "application/json",
            },
            
        });
        if(data?.roles?.includes('admin')){
            return data
        } else {
            throw {
                response: {
                  data: {
                    message: "No tienes permisos para acceder a este sitio"
                  }
                }
              };
        }

    } catch (error) {
        throw error
    }
}