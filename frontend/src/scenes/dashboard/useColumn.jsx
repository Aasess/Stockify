import React from 'react'

const useColumn = ({ state }) => {
  // Aggregate received quantities by item_name
  const aggregatedData = state.mostStockItems?.reduce((acc, item) => {
    if (!acc[item.item_name]) {
      acc[item.item_name] = 0
    }
    acc[item.item_name] += item.received_quantity
    return acc
  }, {})

  // Extract labels and data for the chart
  const labels = Object.keys(aggregatedData)
  const data = Object.values(aggregatedData)

  const barMostStockItem = {
    labels: labels,
    datasets: [
      {
        label: 'Most Stock Items',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data,
      },
    ],
  }

  const barMostStockOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Most Stock Items',
      },
    },
  }

  const doughnutMostBeneficialData = {
    labels: state.mostBeneficialItems.map((item) => item.item_name),
    datasets: [
      {
        data: state.mostBeneficialItems.map((item) => item.total_revenue),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#B4B4B4',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#B4B4B4',
        ],
      },
    ],
  }

  const doughnutMostBeneficialOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Most Beneficial Items Based on Total Revenue',
      },
    },
  }

  const pieMostStockedData = {
    labels: state.mostStockedCategories.map(
      (category) => category.category_name
    ),
    datasets: [
      {
        data: state.mostStockedCategories.map(
          (category) => category.total_stocked_quantity
        ),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#B4B4B4',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#B4B4B4',
        ],
      },
    ],
  }

  const pieMostStockedOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Most Stocked Categories',
      },
    },
  }

  const barFrequentlySoldData = {
    labels: state.frequentlySoldItems.map((item) => item.item_name),
    datasets: [
      {
        label: 'Frequently Sold Items',
        data: state.frequentlySoldItems.map((item) => item.sale_count),
        backgroundColor: '#36A2EB',
      },
    ],
  }

  const barFrequentlySoldOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Frequently Sold Items',
      },
    },
  }

  return {
    barMostStockItem,
    barMostStockOptions,
    doughnutMostBeneficialData,
    doughnutMostBeneficialOptions,
    pieMostStockedData,
    pieMostStockedOptions,
    barFrequentlySoldData,
    barFrequentlySoldOptions,
  }
}

export default useColumn
