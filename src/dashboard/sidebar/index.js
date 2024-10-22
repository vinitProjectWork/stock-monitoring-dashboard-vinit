import React, { useState, useEffect } from 'react';
import "./styles.scss";
import { CiSearch } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaArrowTrendUp, FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addStock, removeStock } from '../../redux/slices/stockListSlice';
import { getStockLetest } from '../../api';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Sidebar = ({ data = [], handelSelectItem = () => { } }) => {
    const { data: userStockList, filter } = useSelector(state => state.stockList)
    const dispatch = useDispatch()

    const [searchText, setSearchText] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [loader, setLoader] = useState(false);
    const debouncedSearchText = useDebounce(searchText, 300)

    const filterData = filter ? userStockList?.filter((x) => x?.changePercentage > filter) : userStockList

    useEffect(() => {
        if (debouncedSearchText) {
            setLoader(true);
            const filteredList = data.filter((item) => {
                const key = Object.keys(item)[0];
                return key.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
                    item[key].toLowerCase().includes(debouncedSearchText.toLowerCase());
            });
            setSearchList(filteredList);
            setLoader(false);
        } else {
            setSearchList([]);
            setLoader(false);
        }
    }, [debouncedSearchText, data]);

    const addItem = (item) => {
        const stockList = [...(userStockList ?? []), item]?.map(i => i.ticker ?? i.value).join(',');
        getStockLetest(stockList).then((response) => {
            dispatch(addStock(response?.data))
        }).catch((error) => {
            console.log(error)
        })

        setSearchList([]);
        setSearchText("");
    };

    const deleteListItem = (item) => {
        dispatch(removeStock(item))
    };

    const clearSearch = () => {
        setSearchText("");
        setSearchList([]);
    };

    return (
        <div className='sidebar'>
            <div className='search-autocomplete'>
                <div className='search-input'>
                    <CiSearch />
                    <input
                        id="search"
                        name='search'
                        value={searchText}
                        placeholder='Search...'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    {searchText && <IoClose onClick={clearSearch} className='clear' />}
                </div>
                <div className='search-result' style={{ display: searchList?.length === 0 && !loader ? "none" : "block" }}>
                    {loader ? <div className="loader"></div> : searchList.map((item, index) => {
                        const selectedObj = { title: item[Object.keys(item)[0]], value: Object.keys(item)[0] };
                        return (
                            <div className='list-item' key={index + selectedObj.value}>
                                <span>{selectedObj.title}</span>
                                <span className="success">{selectedObj.value}</span>
                                <div className='actions'>
                                    <FaPlus className='chart-btn' onClick={() => addItem(selectedObj)} title='Add To Watchlist' />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='sidebar-contant'>
                {filterData?.map((item, index) => {
                    return (
                        <div className='list-item' key={index + item?.ticker}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span><b>{item.ticker}</b></span>
                                <span style={{ fontSize: '10px' }}>{item.name}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                <span><b>${item.price}</b></span>
                                <span className={item.changePercentage > 0 ? 'success' : 'danger'}>{item.changePercentage}%</span>
                            </div>
                            <div className='actions'>
                                <FaArrowTrendUp className='chart-btn' onClick={() => handelSelectItem(item)} title='See Chart' />
                                <MdDeleteOutline className='delete-btn' onClick={() => deleteListItem(item)} title='Delete from Watchlist' />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Sidebar;