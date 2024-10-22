# stock-monitoring-dashboard-vinit

Test Task for upwork

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `git clone`

clone repo to your local machine

### `npm install`

run above command to install node modules

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Thrid Party API

In this Project used Rapid API to get real time stock only limitation is that free tier is having some limitation of request par month.

## Chart

Used APEX candlestick Chart to show stock Open, High, Low, Close price of stock on Chart.

Below Chart, we are displaying data of stock realted to trade like below details.

- Stock Name
- Stock Price
- Stock Price Change
- Stock Price Change in %
- Stock Day High
- Stock Day Low
- 50day avg
- 200day avg

## Dashboard Screenshot

![Stock Monitoring Dashboard](./image.png?raw=true "Stock Monitoring Dashboard")

as shown in above image there is 3 main component.

- Sidebar
  - searchbar - to search stock to add in watchlist
  - list of stock to added watchlist
- Chart
  - to display selected stock's candalistic chart by 5Min with day high, low, open, close.
- Stock Details
  - to show stock details
