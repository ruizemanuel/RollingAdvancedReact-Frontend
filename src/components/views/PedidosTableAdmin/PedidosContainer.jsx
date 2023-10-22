import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../share/domain/services/appServices';
import Loader from '../../layouts/Loader';
import PedidosTableAdmin from './PedidosTableAdmin';

export default function PedidosContainer() {
    const { loading, data } = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData('/pedidos'))
    }, [])
    return (
        <>
            {
                loading || data === null ? <Loader /> : <PedidosTableAdmin />
            }
        </>
    )
}
