import React, { useEffect, useState, useCallback } from 'react'
import "./styles.scss"
import Chart from "./chart"
import { getStock, getStockLetest } from '../../api';

const Contant = ({ selected }) => {
    const [data, setData] = useState(null)
    const [chartData, setchartData] = useState([])

    const FetchStockData = useCallback(() => {
        if (selected?.ticker) {
            getStockLetest(selected?.ticker).then((response) => {
                setData(response?.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [selected?.ticker])


    const FetchData = useCallback(() => {
        const params = { frame: '5Min', limit: '1000', }
        if (selected?.ticker) {
            getStock(selected?.ticker, params).then((response) => {
                const data = response?.data?.map((x) => ([x?.time, x?.open, x?.high, x?.low, x?.close]))
                setchartData(data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [selected?.ticker])

    useEffect(() => {
        FetchData()
        FetchStockData()
    }, [FetchData, FetchStockData])

    if (!selected) {
        return <div className='not-found'>Please select any stock to see chart</div>
    } else {
        return (!chartData && chartData?.length >= 0) || data ? (
            <div className='contant'>
                <div className='chart-container'>
                    <Chart seriesData={chartData} />
                </div>
                <div className='infomation'>
                    <h2>{selected?.name}:{selected?.ticker}</h2>
                    <div className='details-container'>
                        {Object.keys(data[0])?.map((x, index) => {
                            return (
                                <div key={index} className='details-contant'>
                                    <span>{x}</span>
                                    <span className='value'>{data[0][x]}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        ) : (<div className='not-found'>No Data Found</div>)
    }
}

export default Contant