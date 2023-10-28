import axios from "../../../config/axiosInit";
import config from "../../../config/configApi";

//const email = JSON.parse(window.localStorage.getItem('persist:auth'))?.email?.replace(/"/g, '');


export const getDataRepo = async (path) => {
    try {
        const { data } = await axios.get(`${path}`);
        return data
    } catch (error) {
        throw error
    }
}


export const getDataByIdRepo = async (path, id) => {
    try {
        const { data } = await axios.get(`${path}/${id}`)
        return data
    } catch (error) {
        throw error
    }
}

export const getSalesPerMonthRepo = async () => {
    try {
        const { data } = await axios.get('/pedidos/ventas')
        return data
    } catch (error) {
        throw error
    }
}

export const getSalesPerCategoryRepo = async () => {
    try {
        const { data } = await axios.get('/pedidos/ventasPorCategoria')
        return data
    } catch (error) {
        throw error
    }
}

export const createNewDataRepo = async (path, formValues) => {
    try {
        const { data } = await axios.post(`${path}`, formValues, config());
        return data
    } catch (error) {
        throw error
    }
}

export const updateDataRepo = async (path, formValues, id) => {
    try {
        const { data } = await axios.put(`${path}/${id}`, formValues, config());
        return data
    } catch (error) {
        throw error
    }
}

export const deleteItemRepo = async (path, id) => {
    try {
        const { data } = await axios.delete(`${path}/${id}`, config());
        return data
    } catch (error) {
        throw error
    }
}

export const getTotalByDateRepo = async (dates) => {
    try {
        const { data } = await axios.post(`${URL}/total`, dates, {
            headers: {
                "Content-Type": "application/json",
                // "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                //   .token,
            },
        });
        console.log('data total', data)
        return data
    } catch (error) {
        throw error
    }
}

