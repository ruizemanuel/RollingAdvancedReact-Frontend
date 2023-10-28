import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function BarsChart() {
    const { sales, salesPerCategory } = useSelector(state => state.app);
    const [salesChart, setSalesChart] = useState(true);
    var beneficios = salesChart ? sales?.map((sale) => sale.ventas) : salesPerCategory?.map((sale) => sale.ventas)
    var tags = salesChart ? sales?.map((sale) => sale.mes) : salesPerCategory?.map((sale) => sale._id)

    var misoptions = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: -500,
                max: 1000
            },
            x: {
                ticks: { color: 'rgba(0, 220, 195)' }
            }
        }
    };

    var midata = {
        labels: tags,
        datasets: [
            {
                label: 'Beneficios',
                data: beneficios,
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            }
        ]
    };
    const handleChange = (e) => {
        if (e.target.value === 'ventas-categoria') {
            setSalesChart(false)
        } else {
            setSalesChart(true)
        }
    };
    return (
        <div>
            <Form.Select onChange={handleChange} className="w-25 border border-1 border-dark float-end">
                <option value="ventas-mensuales">Ventas Mensuales</option>
                <option value="ventas-categoria">Ventas por Categoria</option>
            </Form.Select>
            <Bar data={midata} options={misoptions} />

        </div>

    )
}