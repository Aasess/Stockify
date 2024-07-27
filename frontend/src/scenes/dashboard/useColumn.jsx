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

  const barData = {
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

  return {
    barData,
  }
}

export default useColumn
