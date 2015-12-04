$(document).ready(function() {
    window.data_library = [];
    window.data_summary = {};

    $.get("/data/data.json", function(response) {
	console.log("Fetched response.");
	window.data_library = response.data_library;
	render_data_library();
    });

    $("#data-library-search").keydown(function(event) {
	render_data_library();
    });
});

function render_data_library() {
    var allNewElements = [];

    var sortedDataLibrary = window.data_library; // TODO(allen): Actually sort the data library.

    for (var dataElementIndex = 0; dataElementIndex < sortedDataLibrary.length; dataElementIndex++) {
	var dataElement = sortedDataLibrary[dataElementIndex];
	var newElement = $("<li class='data-element'></li>")
	    .data("full_element", dataElement)
	    .append($("<span>" + dataElement.item_name + "</span>"))
	    .prepend($("<div class='handle'></div>"));
	allNewElements.push(newElement);
    }

    // Clears #data-library of all children
    $("#data-library-content").empty();

    // Add all the data library elements at once
    $("#data-library-content").append(allNewElements);

    allNewElements.forEach(attach_data_element_listeners);

    $("#data-library-content").selectable({
	filter: "li",
	cancel: ".handle",
	selected: function(event, ui) { render_data_summary($(ui.selected).data("full_element")); }
    });
    $("#data-library-content").sortable({ handle: ".handle" });
}

function render_data_summary(elementObject) {
    if (window.data_summary.id == elementObject.id) {
	// Don't re-render identical summaries.
	return;
    }

    window.data_summary = elementObject;
    $("#data-summary-content").empty();

    console.log("Rendering data summary for", elementObject);

    $("#data-summary-content").append($("<h1>" + elementObject.item_name + "</h1>"))
	.append($("<h3>" + elementObject.author_name + "</h3>"))
	.append($("<h3>" + elementObject.last_updated + "</h3>"));

}

function attach_data_element_listeners(element) {
    // Removed due to being handled by jQuery UI 'selected'.
    // element.click(function(event) {
    // 	render_data_summary($(this).data("full_element"));
    // });
}


    // var width = 960,
    // height = 500,
    // radius = Math.min(width, height) / 2;

    // var color = d3.scale.ordinal()
    // 	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    // var arc = d3.svg.arc()
    // 	.outerRadius(radius - 10)
    // 	.innerRadius(0);

    // var pie = d3.layout.pie()
    // 	.sort(null)
    // 	.value(function(d) { return d.value; });

    // var svg = d3.select("body")
    // 	.append("svg")
    // 	.attr("width", width)
    // 	.attr("height", height)
    // 	.append("g")
    // 	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // d3.csv("data.csv", function(error, data) {
    // 	console.log(data);
    // 	data.forEach(function(d) {
    // 	    d.value = +d.value;
    // 	});

    // 	var g = svg.selectAll(".arc")
    // 	    .data(pie(data))
    // 	    .enter().append("g")
    // 	    .attr("class", "arc");

    // 	g.append("path")
    // 	    .attr("d", arc)
    // 	    .style("fill", function(d) { return color(d.data.key); });

    // 	g.append("text")
    // 	    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    // 	    .attr("dy", ".35em")
    // 	    .style("text-anchor", "middle")
    // 	    .text(function(d) { return d.data.key; });
    // });

