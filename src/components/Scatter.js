import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function TasksChart({ month, year }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const daysInMonth = new Date(year, month, 0).getDate();
			const dataArray = [];

			for (let day = 1; day <= daysInMonth; day++) {
				try {
					const response = await fetch(
						`/api/tasks/${year}-${month}-${day}`, // Adjust your API endpoint
						{
							method: "GET",
							credentials: "include",
						}
					);

					if (response.ok) {
						const tasks = await response.json();
                        const trueTasks = tasks.filter((task) => task.status === true);
                        const countTrueTasks = trueTasks.length;
						dataArray.push(countTrueTasks);
					} else {
						console.error(`Failed to fetch data for day ${day}`);
					}
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			}

			setData(dataArray);
		};

		fetchData();
    }, [month, year]);

	const numbers = [];

	for (let i = 1; i <= 30; i++) {
		numbers.push(i);
	}

	const chartData = {
		data: [
			{
				x: numbers, // Example x-axis data
				y: data, // Example y-axis data (number of tasks per day)
				type: "bar", // Use "line" for a line chart or "scatter" for a scatter chart
				mode: "lines", // Customize the chart mode (lines, markers, or both)
				marker: {
					color: "#f68657", // Color of the line/points
					size: 0, // Size of markers (if using markers)
				},
				line: {
					color: "#ae50ff", // Color of the line
					width: 2, // Width of the line
				},
				text: numbers, // Text to display on hover
				textposition: "top center", // Position of the hover text
				hoverinfo: "y", // Display y-value and text on hover
			},
		],
		layout: {
			showlegend: false,
			width: 700, // Adjust the width of the chart
			height: 400, // Adjust the height of the chart
			margin: {
				l: 50,
				r: 20,
				b: 50,
				t: 20,
			},
			plot_bgcolor: "#fed0bc", // Background color of the plot area
			paper_bgcolor: "#e1beff", // Background color of the paper
			xaxis: {
				title: "Day of the Month", // X-axis title
				titlefont: {
					size: 16,
					color: "black",
				},
				showline: true, // Show X-axis line
				linecolor: "#ae50ff", // Color of X-axis line
			},
			yaxis: {
				title: "Number of Tasks Done", // Y-axis title
				titlefont: {
					size: 16,
					color: "black",
				},
				showline: true, // Show Y-axis line
				linecolor: "#ae50ff", // Color of Y-axis line
			},
		},
	};

	return <Plot data={chartData.data} layout={chartData.layout} />;
}

export default TasksChart;
