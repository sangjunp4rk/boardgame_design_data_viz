var category_selected_name = ""

$(document).ready(function(){
	console.log("hi")
	$("#category_data_viz").on("click", ".myLabel", function() {
		console.log(this.id)
		category_selected_name = this.id
		var category_text = $("#" + this.id).text()
		console.log(category_text)
		$("#category_selection_text").html(category_text)
	})

	// $("#rules_arrow_div").on("click", '.down_arrow', function() {
	// 	$("#Zombies").click();
	// 	console.log("!!!!")
	// })

	
})