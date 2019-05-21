//Cholera Attacks & Death Line Chart
Plotly.d3.tsv("https://raw.githubusercontent.com/garyjw/project1_cholera/master/Cholera%20Deaths.tsv", function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
}
    //Attack trace
    var attacks = {
      type: "scatter",
      mode: "lines",
      name: "Attacks",
      x: unpack(rows, "Date"),
      y: unpack(rows, "Attacks"),
      line: {color: "#65afc6"}
    }
    //Death trace
    var deaths = {
      type: "scatter",
      mode: "lines",
      name: "Deaths",
      x: unpack(rows, "Date"),
      y: unpack(rows, "Deaths"),
      line: {color: "#d33b15"}
    }
    //Total attacks trace
    var totalAttacks = {
        type: "scatter",
        mode: "lines",
        name: "Total Attacks",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Total Attacks"),
        line: {color: "#185474"}
    }
    //Total deaths trace
    var totalDeaths = {
        type: "scatter",
        mode: "lines",
        name: "Total Deaths",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Total Deaths"),
        line: {color: "#ae1212"}
    }
    var chartData = [attacks,deaths,totalAttacks,totalDeaths];
    var chartLayout = {
        title: "Cholera Attacks and Deaths 1854",
        hoverlabel: {
            font: {
                size: 15
            }
        },
        font: {
            family: "Helvetica",
            color: "#000000",
            size: 13
        },
        xaxis: {
            type: "date",
            title: "Date"
        },
        yaxis: {
            title: "Number of Deaths / Attacks",
            rangemode: "tozero",
            showline: true,
            zeroline: true}
    };
    Plotly.newPlot("choleraDeathsChart", chartData, chartLayout, {displayModeBar: false});
});

Plotly.d3.tsv("https://raw.githubusercontent.com/garyjw/project1_cholera/master/Cholera%20Death%20Locations.tsv", function(err, rows){
			Plotly.d3.tsv("https://raw.githubusercontent.com/garyjw/project1_cholera/master/Cholera%20Pump%20Locations.tsv", function(err2, rows2){
				function unpack(rows, key) {
		        return rows.map(function(row) { return row[key]; });
		    }
		    var deaths = unpack(rows, "Deaths"),
		        deathsLatitude = unpack(rows, "Latitude"),
		        deathsLongitude = unpack(rows, "Longitude"),
		        deathCount = [],
		        hoverText = [],
						pumpLatitude = unpack(rows2, "Latitude"),
						pumpLongitude = unpack(rows2, "Longitude");
		    for ( var i = 0 ; i < deaths.length; i++) {
		        var currentDeath = deaths[i] * 4; //Multiply to account for size of marker
		        var currentText = "Deaths: " + deaths[i];
		        deathCount.push(currentDeath);
		        hoverText.push(currentText);
		    }
		    var data = [{
		        type: "scattermapbox",
		        lat: deathsLatitude,
		        lon: deathsLongitude,
		        hoverinfo: "text",
		        text: hoverText,
		        marker: {
		        	size: deathCount,
				color: "red",
		        },
		    },
				{
						type: "scattermapbox",
						lat: pumpLatitude,
						lon: pumpLongitude,
						hoverinfo: "text",
						text: "Pump",
						marker: {
							size: 15,
							color: "blue",
						},
				}];
				//var data = [deathsData, pumpData];
		    var layout = {
		        title: "Cholera Pump and Death Locations",
						showlegend: false,
						font: {
							family: "Helvetica",
							color: "#000000",
							size: 13
						},
						hoverlabel:{
							font:{
								family: "Helvetica",
								size: 15
							}
						},
						mapbox: {
								style: "light",
						    bearing:0,
								pitch:0,
						    zoom:15,
						    center: {
						      lat:51.513389,
						      lon:-0.136565
						    },
						},
		    };
				Plotly.setPlotConfig({
				  mapboxAccessToken: 'pk.eyJ1IjoiZ2FyeWp3IiwiYSI6ImNqbWNlbGR3MjBleHoza25xb2ZwMjc5eXcifQ.WmlpM94XaKe70-BFgBxsqw'
				})
		    Plotly.newPlot(choleraMap, data, layout, {displayModeBar: false});
			});
		});
