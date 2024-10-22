import axios from 'axios';

const headers = {
    'x-rapidapi-key': '33fea27e86msh06935b5a445562bp16cc58jsn421870aa40eb',
    'x-rapidapi-host': 'real-time-stock-finance-quote.p.rapidapi.com'
}

export const getStockList = async () => {
    const options = {
        method: 'GET',
        url: 'https://real-time-stock-finance-quote.p.rapidapi.com/stock/list',
        headers
    };
    try {
        const response = await axios.request(options);
        return response
    }
    catch (error) {
        return error;
    }
}

export const getStockLetest = async (item) => {
    const options = {
        method: 'GET',
        url: `https://real-time-stock-finance-quote.p.rapidapi.com/stock/latest/${item}`,
        headers
    };
    try {
        const response = await axios.request(options);
        return response
    }
    catch (error) {
        return error;
    }
}

export const getStock = async (item, params) => {
    const options = {
        method: 'GET',
        url: `https://real-time-stock-finance-quote.p.rapidapi.com/quote/stock/${item}`,
        params,
        headers
    };
    try {
        const response = await axios.request(options);
        return response
    }
    catch (error) {
        return error;
    }
}