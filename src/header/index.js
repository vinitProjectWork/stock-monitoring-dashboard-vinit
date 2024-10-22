import React, { useState } from 'react'
import "./styles.scss"
import { useDispatch, useSelector } from 'react-redux'
import { CiFilter } from 'react-icons/ci'
import { handelfilter } from '../redux/slices/stockListSlice'

const Header = () => {
    const [show, setShow] = useState(false)
    const { filter } = useSelector(state => state.stockList)
    const dispatch = useDispatch()

    return (
        <div className="header">
            <a href="/" className="logo">Store Monitoring Dashboard</a>
            <div className="header-right">
                <div className='search-input'>
                    {show && <input
                        id="filter"
                        name='filter'
                        value={filter}
                        placeholder='Enter % to filter stock'
                        onChange={(e) => dispatch(handelfilter(e.target.value))}
                    />}
                    <CiFilter onClick={() => setShow(!show)} className='clear' title='Stock % Change Filter' />
                </div>
            </div>
        </div>
    )
}

export default Header