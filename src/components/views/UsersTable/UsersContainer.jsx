import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../share/domain/services/appServices';
import Loader from '../../layouts/Loader';
import UsersTable from './UsersTable';

export default function UsersContainer() {
    const { loading, data } = useSelector(state => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData('/users'))
    }, [])
    return (
        <>
            {
                loading || data === null ? <Loader /> : <UsersTable />
            }
        </>
    )
}
