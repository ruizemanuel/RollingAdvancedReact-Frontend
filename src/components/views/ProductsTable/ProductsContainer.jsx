import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../share/domain/services/appServices';
import Loader from '../../layouts/Loader';
import ProductsTable from './ProductsTable';

export default function ProductsContainer() {
    const { loading, data } = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData('/products'))
    }, [])
    return (
        <>
            {
                loading || data === null ? <Loader /> : <ProductsTable />
            }
        </>
    )
}
