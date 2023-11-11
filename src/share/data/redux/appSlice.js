
import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: null,
    message: null,
    loading: false,
    loadingMod: false,
    data: null,
    sales: null,
    salesPerCategory: null,
    dataToEdit: null,
    total: 0,
  },

  reducers: {
    loadingModal: (state) => {
      state.loadingMod = true
    },
    flushEdit: (state) => {
      state.dataToEdit = null
    },
    loading: (state) => {
      state.loading = true
      state.status = null
      state.message = null
      state.data = null   
      state.dataToEdit = null
      state.total = 0
   
    },

    error: (state, { payload }) => {
        state.loading = false
        state.message = payload?.message || 'Ocurrio un error'
        state.status = "error"
        state.data = payload?.data || null
        state.sales = payload?.sales || null
        state.salesPerCategory = payload?.salesPerCategory || null
        state.dataToEdit = null
        state.total = 0
    },

    success: (state, { payload }) => {
        state.loading = false
        state.message = payload.message || null
        state.status = "success"
        state.data = payload.data || null
        state.dataToEdit = payload.dataToEdit || null
        state.loadingMod = false
        state.total = payload.total || 0
    },

    successSales: (state, { payload }) => {
        state.sales = payload.sales || null
    },
    successSalesPerCategory: (state, { payload }) => {
      state.salesPerCategory = payload.salesPerCategory || null
  },

  },
})

export const {
  loadingModal,
  loading,
  error,
  success,
  successSales,
  successSalesPerCategory,
  flushEdit,
  
} = appSlice.actions
