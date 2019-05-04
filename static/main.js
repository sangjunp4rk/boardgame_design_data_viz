var category_text = ""
var mechanic_selected_name = ""
var raw_min_players = 0
var min_players_selected = 0
var description_dict = {}

function load_rating(overall_rating, category_mean, mechanics_mean, min_players_mean) {
	// 5.765892513779056
	// 6.491826454554369
	// 6.036603119145441
	// 6.0981073624929545
	// overall_rating = 5.765892513779056

	$("#category_score_number_id").empty()
	$("#players_score_number_id").empty()
	$("#mechanism_score_number_id").empty()
	$("#overall_score_number_id").empty()

	$("#category_score_number_id").html(category_mean)
	$("#players_score_number_id").html(min_players_mean)
	$("#mechanism_score_number_id").html(mechanics_mean)
	$("#overall_score_number_id").append(overall_rating + "<strong id='out_of_ten'>/10</strong>")

	$("#category_results_div").append("for <br/> <strong class='sub_score_caption_css'>" + category_text + "</strong>")
	$("#min_player_results_div").append("for <br/><strong class='sub_score_caption_css'> " + mechanic_selected_name + "</strong>")
	$("#mechanism_results_div").append("for <br/><strong class='sub_score_caption_css'> " + min_players_selected + " Players</strong>")


}

// function toggleDataInsights (name){
// 	var element = document.getElementById(name);
// 	element.classList.toggle("displayed-text");
// 	element.classList.toggle("hidden-text");
// }

function convertPlayerNum(text){
  switch(text){
    case "0":
      return "1 player";
      break;
    case "1":
      return "2 players";
      break;
    case "2":
      return "3 players";
      break;
    case "3":
      return "4 players";
      break;
    case "4":
      return "5 players";
      break;
    case "5":
      return "6 players";
      break;
     case "6":
      return "7 players";
      break;
     case "7":
      return "8 players";
      break;
     case "8":
      return "9 players";
      break;
       case "9":
      return "10+ players";
      break;
    default:
      return "-1";
      break;
  }
}

function readCsv(){

}

function get_rating() {
	console.log("getting rating")
	console.log(category_text)
	console.log(mechanic_selected_name)
	console.log(raw_min_players)
	$.ajax({
		type: "POST",
		url: "get_rating",
		dataType: "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"category": category_text, "mechanics": mechanic_selected_name, "min_players": raw_min_players}),
        success: function(result) {
        	calculated_rating = result["calculated_rating"]
        	category_mean = result["category_mean"]
        	mechanics_mean = result["mechanics_mean"]
        	min_players_mean = result["min_players_mean"]
        	load_rating(calculated_rating, category_mean, mechanics_mean, min_players_mean)
        },
        error: function(request, status, error) {
        	console.log("Error")
        }
	})
}

function get_descriptions() {
	$.ajax({
		type: "GET",
		url: "get_descriptions",
		dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
        	description_dict = result["description_dict"]
        	console.log(description_dict['Acting'])
        },
        error: function(request, status, error) {
        	console.log("Error")
        }
	})
}

function load_description(key_name) {
	$("#mechanics_description_div").html(description_dict[key_name])
}

$(document).ready(function(){
	get_descriptions()

	$("#category_data_viz").on("click", ".myLabel", function() {
		console.log(this.id)
		category_selected_name = this.id
		category_text = $("#" + this.id).text()
		//console.log(category_text)
		// $("#category_selection_text_mechanics").html(category_text)
		$("#category_selection_text").html(category_text)
		$("#user_category").html(category_text);

		$("#category_rating").html("--");
		$("#overall_rating").html("--");
	})

	$("#mechanics_data_viz").on("click", ".heatmap-button", function() {
		console.log($(this).attr('data-mech'))
		mechanic_selected_name = $(this).attr('data-mech')

		//console.log(mechanic_selected_name);
		//displays the selcted mechanics name
		$("#mechanics_selection_text").html(mechanic_selected_name)
		$("#user_mechanism").html(mechanic_selected_name);

		$("#mechanism_rating").html("--");
		$("#overall_rating").html("--");
	})

	$("#mechanics_data_viz").on("click", ".heatmap-button", function() {
		console.log($(this).attr('data-mech'))
		mechanic_selected_name = $(this).attr('data-mech')
		load_description(mechanic_selected_name)
	})

	$("#num_of_players_data_viz").on("click", ".stacked-rect", function() {
		raw_min_players = $(this).attr('data-person')
		//console.log(raw_min_players)
		min_players_selected = convertPlayerNum(raw_min_players)
	//	console.log(min_players_selected)

		$("#players_selection_text").html(min_players_selected)
		$("#user_players").html(min_players_selected);


		$("#players_rating").html("--");
		$("#overall_rating").html("--");

	})

	$("#rating_panel").on("click", "#calculate_score_button", function() {
		// check if all fields are valid (first three lines)
		// if it doesn't throw an alert
		if (category_text == "" || mechanic_selected_name == "" || min_players_selected == 0) {
			alert('Please make a selection for all aspects of the boardgame.')
		} else {
			get_rating()
		}


	})


	// $("#rules_arrow_div").on("click", '.down_arrow', function() {
	// 	$("#Zombies").click();
	// 	console.log("!!!!")
	// })


})
