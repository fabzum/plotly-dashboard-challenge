

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

    // Fill testSubjects array for later used
    var testSubjects = [];

    names.forEach(function(name, index){
        var testSubject = {};
        testSubject['name'] = name;
        testSubject['metadata'] = metadata[index];
        testSubject['samples'] = samples[index];
        testSubjects.push(testSubject);  
    });


    
    // Placeholder Charts
    updateAll();
    // Get the selected ID and update all components
    function updateAll() {
        var name = d3.select("#selDataset").property("value");
        var selectedID = {};
        for(i=0; i < testSubjects.length; i++){
            if(testSubjects[i].name === name) {
                selectedID = testSubjects[i];
                break;
            }
        }
        console.log(selectedID);

        // Creation of Graphs
        DemoInfo(selectedID);
        BarChart(selectedID);
        BubbleChart(selectedID);    
    }
});




