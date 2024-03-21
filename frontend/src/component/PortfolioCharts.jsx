import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useComponentContext from '../context/component-context'

ChartJS.register(ArcElement, Tooltip, Legend);



export default function PortfolioCharts() {
    const { assets } = useComponentContext()
    const assetName = assets.map(asset => {
        const assetID = asset.name
        return assetID
    })
    const assetTotalAmount = assets.map(asset => {
        const assetTotalAmount = asset.totalAmount
        return assetTotalAmount
    })

    const data = {
        labels: [...assetName],
        datasets: [
          {
            label: '$',
            data: [...assetTotalAmount],
            backgroundColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ]
          },
        ],
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '1rem',
            height: 400,
        }}>
            <Pie data={data} />
        </div>
    )
}