import { Bar } from 'react-chartjs-2';

const DealValueChart = ({ dealValues }) => {
  const data = {
    labels: dealValues.map(deal => deal.date),
    datasets: [
      {
        label: 'Deal Value',
        data: dealValues.map(deal => deal.value),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: '#22c55e',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Deal Value Chart</h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DealValueChart;
