import React from "react";
import Plot from "react-plotly.js";

function Pie({ tasks }) {
	const trueTasks = tasks.filter((task) => task.status === true).length;
	const falseTasks = tasks.filter((task) => task.status === false).length;
	const data = {
		data: [
			{
				labels: ["Done", "Not Done"],
				values: [trueTasks, falseTasks],
				type: "pie",
				marker: {
					colors: ["#ae50ff", "#f68657"], // Colors for true and false
				},
				textinfo: "value+label",
				hoverinfo: "percent", // Display label and percentage on hover
				textfont: {
					size: 16, // Customize the text size
					color: "#fff", // Customize the text color
				},
			},
		],
		layout: {
			showlegend: false,
			width: 400, // Adjust the width of the chart
			height: 400, // Adjust the height of the chart
			margin: {
				l: 20,
				r: 20,
				b: 20,
				t: 20,
			},
			plot_bgcolor: "#fed0bc", // Background color of the plot area
			paper_bgcolor: "#fed0bc", // Background color of the paper
			pie: {
				width: 100,
				hole: 0.4, // Size of the hole in the middle of the pie chart (0 to 1)
				textinfo: "label+percent", // Display labels and percentages
				textfont: {
					size: 20,
					color: "#fff",
				},
				marker: {
					colors: ["#ff5733", "#33ff57", "#5733ff"], // Colors for each category
				},
			},
		},
	};

	return <Plot data={data.data} layout={data.layout} />;
}

export default Pie;