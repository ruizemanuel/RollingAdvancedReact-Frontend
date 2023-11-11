
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'no-authenticated',
    uid: null,
    email: null,
    displayName: null,
    token: null,
    id_rol: null,
    roles: null,
    permissions: null,
    alert: null,
  },

  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.name
      state.message = null
      state.token = payload.token
      state.roles = payload.roles
      state.permissions = null
      state.commissions = null
      state.alert = "success"
    },

    logout: (state) => {
      localStorage.removeItem('pa-token')
      localStorage.removeItem('persist:auth')

      state.status = 'no-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.message = null
      state.token = null
      state.roles = null
      state.permissions = null
      state.id_rol = null
    },

    test: (state) => {
      state.status = 'authenticated'
      state.id_rol = 1
    },
    
    untest: (state) => {
      state.status = 'no-authenticated'
      state.id_rol = null
    },
  },
})

export const {
  login,
  logout,
  test,
  untest
} = authSlice.actions
