import { Line } from 'react-chartjs-2';

const LeadScoreChart = ({ leadScores }) => {
  const data = {
    labels: leadScores.map(score => score.date),
    datasets: [
      {
        label: 'Lead Score',
        data: leadScores.map(score => score.value),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
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
      <h3 className="text-xl font-semibold mb-4">Lead Score Chart</h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LeadScoreChart;
