import { error, loading, success } from "../../../share/data/redux/appSlice";
import { login, logout } from "../../data/redux/authSlice";
import { loginRepo } from "../../data/repositories";

export const startLogin = (form) => async (dispatch) => {  
    dispatch(loading())
    try {
      const data = await loginRepo(form);
      dispatch(login(data))
      dispatch(success({message: "Bienvenido!"}))

    } catch (e) {
      const { message } = e.response.data
      dispatch(error({ message: message }))
  }
}

export const startLogout = () => async (dispatch) => {
  await dispatch(loading());
  try {
    await dispatch(logout());
    dispatch(success({ message: 'Adios!' }));
  } catch ({ response }) {
    dispatch(error(response.data));
  }
};