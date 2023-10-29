import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsHistory } from '../../../share/domain/services/appServices';
import Loader from '../../layouts/Loader';
import ProductsHistory from './ProductsHistory';


export default function ProductsHistoryContainer() {
    const { loading, data } = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsHistory())
    }, [])
    return (
        <>
            {
                loading || data === null ? <Loader /> : <ProductsHistory />
            }
        </>
    )
}
