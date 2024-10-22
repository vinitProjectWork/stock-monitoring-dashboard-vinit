import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const Chart = ({ seriesData }) => {
    const series = [
        {
            data: seriesData
        }
    ]

    const [options] = useState({
        chart: {
            type: 'candlestick',
            height: 290,
            id: 'candles',
            toolbar: {
                autoSelected: 'pan',
                show: false
            },
            zoom: {
                enabled: false
            },
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#3C90EB',
                    downward: '#DF7D46'
                }
            }
        },
        xaxis: {
            type: 'datetime'
        }
    });

    return (
        <div>
            <div className="chart-box">
                <div id="chart-candlestick">
                    <ReactApexChart options={options} series={series} type="candlestick" height={290} />
                </div>
            </div>
        </div>
    );
}

export default Chart