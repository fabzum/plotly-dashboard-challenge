

//Reading in the local json file
d3.json("data/samples.json").then(data => {
    //Accessing the three keys
    var metadata = data.metadata;  
    var names = data.names;
    var samples = data.samples;
    

    // Fill in the Dropdown Bar
    var dropdownMenu = d3.select("#selDataset");
    dropdownMenu.on("change", updateAll);
    dropdownMenu.selectAll("option").remove();
    names.forEach(function(name){
        var option = dropdownMenu.append("option").text(name);
        option.attr("value", name);
    });

    
    // Placeholder Charts
    updateAll();
    // Get the selected ID and update all components
    function updateAll() {
        var name = d3.select("#selDataset").property("value");
        var selectedID = {};
        for(i=0; i < names.length; i++){
            if(names[i] === name) {
                selectedID = names[i];
                break;
            }
        }
        console.log(selectedID);

        // Creation of Graphs
        DemoInfo(selectedID, metadata);
        BarChart(selectedID, samples);
        BubbleChart(selectedID, samples);    
    }
});

function DemoInfo(selectedID, metadata) {
    var metaDiv = d3.select("#sample-metadata");
    // setting div to nothing
    metaDiv.html("")
    var metaList = metaDiv.append("ul").classed("list-group", true);
    metadata.forEach(obj =>  { 
        if (obj.id === parseInt(selectedID)) {
            Object.entries(obj).forEach(keyVa => {
            var listItem = metaList.append("li").classed("list-group-item", true).text(`${keyVa[0]}:${keyVa[1]}`);
        });
        }
    });
}

function BubbleChart(selectedID, samples) {
    samples.forEach(obj =>  { 
        if (obj.id === selectedID) {
            var trace1 = {
                x: obj.otu_ids,
                y: obj.sample_values,
                mode: 'markers',
                marker: {
                color: obj.otu_ids,
                size: obj.sample_values
                }
            };
            
            var data = [trace1];
            
            var layout = {
                title: 'OTU ID',
                showlegend: false,
                height: 600,
                width: 1200
            };
            
            Plotly.newPlot('bubble', data, layout);
        }
    });
}

function BarChart(selectedID, samples) {
    samples.forEach(samp => {
        if (samp.id === selectedID) {
            var trace1 = {
                x: samp.sample_values.slice(0,10).reverse(),
                y: samp.otu_ids.slice(0,10).map(d => `OTU ${d}`).reverse(),
                text: samp.otu_labels,
                type: "bar",
                orientation: "h",
                marker: {
                    color: 'rgb(142,124,195)'
                  }
            };
            var data = [trace1];

            var layout = {
                title: 'Top 10 OTU found in Subject',
                font:{
                  family: 'Raleway, sans-serif'
                },
                showlegend: false,
                xaxis: {
                  tickangle: 90
                },
                bargap :0.1
            };

            Plotly.newPlot("bar", data, layout);

        console.log(toString(samp.otu_ids.slice(0,10)));
        }
    });
    

}