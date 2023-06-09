import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import style from './Sales.module.css';
import { FaChartPie, FaChartBar, FaUsers, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';

function CategoryChart({ categoryCounts, chartType }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          data: Object.values(categoryCounts),
          backgroundColor: [
            '#007bff',
            '#28a745',
            '#dc3545',
            '#ffc107',
            '#17a2b8',
            '#ff6b6b',
            '#00b894',
            '#6c5ce7',
            '#fd79a8',
            '#fdcb6e',
            '#ff7675',
            '#00cec9',
            '#a29bfe',
            '#71afbe',
            '#d88bfe'
          ],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const ctx = chartRef.current.getContext('2d');

    let chart;
    if (chartType === 'pie') {
      chart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: chartOptions,
      });
    } else if (chartType === 'bar') {
      chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }

    return () => {
      chart.destroy();
    };
  }, [categoryCounts, chartType]);

  return (
    <div className={style.salescontainer}>
      <h2>Categorías</h2>
      <canvas ref={chartRef} style={{ width: '400px', height: '400px' }}></canvas>
    </div>
  );
}

function Sales({ txValue }) {
  const [soldProducts, setSoldProducts] = useState([]);
  const [stockProducts, setStockProducts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [chartType, setChartType] = useState(() => {
    const savedChartType = localStorage.getItem('chartType');
    return savedChartType || 'pie';
  });
  const [salesCount, setSalesCount] = useState(0);
  const [txValue2, setTxValue2] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  console.log(txValue);

  useEffect(()=>{
    setTotalRevenue(txValue)
  })

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('chartType', chartType);
  }, [chartType]);

  useEffect(() => {
    setTransactionHistory((prevTransactionHistory) => [...prevTransactionHistory, txValue]);
    setTotalRevenue((prevTotalRevenue) => prevTotalRevenue + Number.parseFloat(txValue));
  }, [txValue]);
  

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      const products = response.data;
      setSoldProducts(products.filter((product) => !product.isActive));
      setStockProducts(products.filter((product) => product.isActive));
      setCategoryCounts(getCategoryCounts(products));
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryCounts = (products) => {
    const categoryCounts = {};
    products.forEach((product) => {
      const category = Array.isArray(product.category) ? product.category[0] : product.category;
      if (category in categoryCounts) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
    return categoryCounts;
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handleSale = (saleValue) => {
    // Actualiza el estado de las ventas y el total de ingresos acumulados
    setSalesCount(salesCount + 1);
    setTotalRevenue(totalRevenue + saleValue);
  };

  return (
    <div className={style.salescontainer}>
      <div className={style.cardsContainer}>
        <div className={style.card}>
          <div className={style.cardIcon}>
            <FaShoppingCart />
          </div>
          <div className={style.cardInfo}>
            <h3>Ventas</h3>
            <p>{salesCount}</p>
          </div>
        </div>
        <div className={style.card}>
          <div className={style.cardIcon}>
            <FaMoneyBillWave />
          </div>
          <div className={style.cardInfo}>
            <h3>Ingresos</h3>
            <p>${totalRevenue.toFixed(0)}</p>
          </div>
        </div>
      </div>
      <div className={style.chart}>
        <CategoryChart categoryCounts={categoryCounts} chartType={chartType} />
      </div>
      <div className={style.chartTypeButtons}>
        {chartType === 'pie' && (
          <button className={style.activeChartTypeButton} disabled>
            <FaChartPie />
          </button>
        )}
        {chartType === 'bar' && (
          <button className={style.activeChartTypeButton} disabled>
            <FaChartBar />
          </button>
        )}
        {chartType !== 'pie' && (
          <button className={style.chartTypeButton} onClick={() => handleChartTypeChange('pie')}>
            <FaChartPie />
          </button>
        )}
        {chartType !== 'bar' && (
          <button className={style.chartTypeButton} onClick={() => handleChartTypeChange('bar')}>
            <FaChartBar />
          </button>
        )}
      </div>
    </div>
  );
}

export default Sales;
