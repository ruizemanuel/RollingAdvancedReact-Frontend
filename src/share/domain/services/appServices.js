import { loading, success, error, loadingModal, successSales, successSalesPerCategory } from "../../data/redux/appSlice"
import { createNewDataRepo, deleteItemRepo, getDataByIdRepo, getDataRepo, getSalesPerCategoryRepo, getSalesPerMonthRepo, getTotalByDateRepo, updateDataRepo } from "../../data/repositories"


export const getData = (path) => async (dispatch) => {
    dispatch(loading())
    try {
        const data = await getDataRepo(path)
        console.log('en get data', data)
        dispatch(success({ data }))
    } catch (e) {
        const { message } = e.response.data
        dispatch(error({ message: message || 'Ocurrio un error' }))
    }
}

export const getDataToEdit = (path, id) => async (dispatch, getState) => {
    const { data } = getState().app
    dispatch(loading())
    try {
        const dataToEdit = await getDataByIdRepo(path, id)
        dispatch(success({ data, dataToEdit }))
    } catch (e) {
        dispatch(error())
    }
}

export const getSalesPerMonth = () => async (dispatch) => {
    try {
        const sales = await getSalesPerMonthRepo()
        dispatch(successSales({ sales }))
    } catch (e) {
        dispatch(error())
    }
}

export const getSalesPerCategory = () => async (dispatch) => {
    try {
        const salesPerCategory = await getSalesPerCategoryRepo()
        dispatch(successSalesPerCategory({ salesPerCategory }))
    } catch (e) {
        dispatch(error())
    }
}

export const createNewData = (path, formValues) => async (dispatch, getState) => {
    const { data } = getState().app;
    try {
        const { message } = await createNewDataRepo(path, formValues)
        dispatch(success({ dataToEdit: null, message: message, data }))
    } catch (e) {
        const { message } = e.response.data
        dispatch(error({ message: message }))
    }

}

export const updateData = (path, formValues, id) => async (dispatch) => {
    try {
        const { message } = await updateDataRepo(path, formValues, id)
        dispatch(success({ message: message }))
    } catch (e) {
        dispatch(error({ message: 'Ocurrio un error al intentar actualizar los datos' }))
    }
}

export const deleteItem = (path, id) => async (dispatch, getState) => {
    const { data } = getState().app;
    try {
        const { message } = await deleteItemRepo(path, id)
        dispatch(success({ message: message, data }))
    } catch (e) {
        console.log('error', e)
        const { message } = e.response.data
        dispatch(error({ message: message }))
    }
}

export const showTotalByDate = (dates) => async (dispatch) => {
    dispatch(loading())
    try {
        const { total } = await getTotalByDateRepo(dates)
        dispatch(success({ total }))
    } catch (e) {
        const { message } = e.response.data
        dispatch(error({ message: message }))
    }

}