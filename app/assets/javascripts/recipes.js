// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function(){

	var callback = function(){
		var ingredient = $('#ingredient').val();
		$('#ingredient').val('');
		$('#ingredient-box').append('<div class="tag-box"><button type="button" class="ingredient-in-box tag" data-ingredient='+ ingredient +'>' + ingredient + '</button></div>');

		$('button.ingredient-in-box').on('click', function(){
			$(this).remove();
		});
	}

	$('#ingredient').keypress(function(event){
		if (event.which == 13) {
			callback();
		}       
	});

	$("#add-ingredient").on('click', callback);

	// Prepare ingredient query string
	$('#recipe-search').submit(function(e) {

		e.preventDefault();  
		var ingredients = $('#ingredient-box div').map(function(index, div){return $(div).text()});
		var ingredients_array = [];

		ingredients.each(function(index,value){ingredients_array.push(value)});
		ingredients_string = ingredients_array.join(',');
	    // var valuesToSubmit = {ingredients: string_ingredients};
	    var valuesToSubmit = {ingredients: ingredients_string};
	    console.log(valuesToSubmit);

	    $.ajax({
	    	type: "GET",
	        url: $(this).attr('action'), //sumbits it to the given url of the form
	        data: valuesToSubmit,
	        dataType: "SCRIPT" // you want a difference between normal and ajax-calls, and json is standard
	    }).fail(function(){
	    	console.log('fail');
	    });
	});

	var imageCallback = function() {
		var imgRight = child +1;
		var imgLeft = child -1;

		var numRecipes = $("#search-results").children().length;
		if (imgRight > numRecipes) { imgRight = 1; }
		if (imgLeft < 1) { imgLeft = numRecipes; }

		var imageUrlRight = $("#search-results .recipe-thumb:nth-child(" + imgRight + ") .inner img").attr('src');
		$('#right-img').css('background-image', 'url(' + imageUrlRight + ')');

		var imageUrlLeft = $("#search-results .recipe-thumb:nth-child(" + imgLeft + ") .inner img").attr('src');
		$('#left-img').css('background-image', 'url(' + imageUrlLeft + ')');
	}


	var child = 1;
	$('#right-swipe').on('click', function() {
		child ++;

		var numRecipes = $("#search-results").children().length;
		if (child > numRecipes) { child = 1; }

		$("#search-results").children().hide();
		$("#search-results .recipe-thumb:nth-child(" + child + ")").show();
		$('.title').textfill({ maxFontPixels: 200 });

		imageCallback();
	});

	$('#left-swipe').on('click', function() {
		child --;

		var numRecipes = $("#search-results").children().length;
		if (child < 1) { child = numRecipes; }

		$("#search-results").children().hide();
		$("#search-results .recipe-thumb:nth-child(" + child + ")").show();
		$('.title').textfill({ maxFontPixels: 200 });

		imageCallback();
	});

	//Add hover class to recipe thumb when hovering over buttons

	$("#right-swipe").hover(
		function() {
			$(".recipe-thumb").addClass( "hover" );
		}, function() {
			$(".recipe-thumb").removeClass( "hover" );
		}
		);

	$("#left-swipe").hover(
		function() {
			$(".recipe-thumb").addClass( "hover2" );
		}, function() {
			$(".recipe-thumb").removeClass( "hover2" );
		}
		);
});













