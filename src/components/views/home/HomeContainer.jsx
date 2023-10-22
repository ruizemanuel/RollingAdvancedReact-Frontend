import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../../share/domain/services/appServices';
import Loader from '../../layouts/Loader';
import Home from './Home';

export default function HomeContainer() {
    const { loading, data } = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData('/pedidos'))
    }, [])
    return (
        <>
            {
                loading || data === null ? <Loader /> : <Home />
            }
        </>
    )
}
