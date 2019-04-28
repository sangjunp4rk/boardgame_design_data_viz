var category_text = ""
var mechanic_selected_name = ""
var min_players_selected = 0

function load_rating(overall_rating) {
	$("#results_text").html(overall_rating)
}

function convertPlayerNum(text){
  switch(text){
    case "0":
      return 1;
      break;
    case "1":
      return 2;
      break;
    case "2":
      return 3;
      break;
    case "3":
      return 4;
      break;
    case "4":
      return 5;
      break;
    case "5":
      return 6; // 5+
      break;
    default:
      return -1;
      break;
  }
}

function get_rating() {
	console.log("getting rating")
	$.ajax({
		type: "POST",
		url: "get_rating",
		dataType: "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"category": category_text, "mechanics": mechanic_selected_name, "min_players": min_players_selected}),
        success: function(result) {
        	calculated_rating = result["calculated_rating"]
        	load_rating(calculated_rating)
        },
        error: function(request, status, error) {
        	console.log("Error")
        }
	})
}

$(document).ready(function(){
	console.log("hi")
	$("#category_data_viz").on("click", ".myLabel", function() {
		console.log(this.id)
		category_selected_name = this.id
		category_text = $("#" + this.id).text()
		console.log(category_text)
		$("#category_selection_text").html(category_text)
	})

	$("#mechanics_data_viz").on("click", ".heatmap-button", function() {
		console.log($(this).attr('data-mech'))
		mechanic_selected_name = $(this).attr('data-mech')
		$("#mechanics_selection_text").html(mechanic_selected_name)
	})

	$("#num_of_players_data_viz").on("click", ".stacked-rect", function() {
		console.log("lsadfjklsadjflkjdsalfkja")
		raw_min_players = $(this).attr('data-person')
		console.log(raw_min_players)
		min_players_selected = convertPlayerNum(raw_min_players)
		console.log(min_players_selected)
		if (min_players_selected == 6) {
			$("#players_selection_text").html("5+")
		} else {
			$("#players_selection_text").html(min_players_selected)
		}
		
	})

	$("#rating_panel").on("click", "#get_results", function() {
		get_rating()
	})

	// $("#rules_arrow_div").on("click", '.down_arrow', function() {
	// 	$("#Zombies").click();
	// 	console.log("!!!!")
	// })

	
})