import React, { useCallback, useEffect, useState } from 'react'
import Contant from './contant'
import Sidebar from './sidebar'
import "./styles.scss"
import { getStockList } from '.././api';
import { useDispatch, useSelector } from 'react-redux'
import { addStockListData } from '../redux/slices/stockListSlice'

const Dashboard = () => {
    const [selected, setSelected] = useState(null)
    const dispatch = useDispatch()
    const list = useSelector(state => state.stockList?.stockListData)

    const FetchData = useCallback(() => {
        if (list?.length === 0) {
            getStockList().then((response) => {
                const list = response?.data
                dispatch(addStockListData(list))
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [dispatch, list?.length])

    useEffect(() => {
        FetchData()
    }, [FetchData])

    const handelSelectItem = (data) => {
        setSelected(data)
    }

    return (
        <div className='container'>
            <Sidebar handelSelectItem={handelSelectItem} data={list} />
            <Contant selected={selected} />
        </div>
    )
}

export default Dashboard