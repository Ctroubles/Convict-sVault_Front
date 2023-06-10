import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import style from './Sales.module.css';

function CategoryChart({ categoryCounts }) {
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
          ],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: chartOptions,
    });
  }, [categoryCounts]);

  return (
    <div className={style.salescontainer}>
      <h2>Productos por categoría</h2>
      <canvas ref={chartRef} style={{ width: '400px', height: '400px' }}></canvas>
    </div>
  );
}

function Sales() {
  const [soldProducts, setSoldProducts] = useState([]);
  const [stockProducts, setStockProducts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      const products = response.data;
      setSoldProducts(products.filter(product => !product.isActive));
      setStockProducts(products.filter(product => product.isActive));
      setCategoryCounts(getCategoryCounts(products));
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryCounts = (products) => {
    const categoryCounts = {};
    products.forEach(product => {
      const category = Array.isArray(product.category) ? product.category[0] : product.category;
      if (category in categoryCounts) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
    return categoryCounts;
  };

  return (
    <div className={style.salescontainer}>
      <div className={style.chart}>
        <CategoryChart categoryCounts={categoryCounts} />
      </div>
    </div>
  );
}

export default Sales;