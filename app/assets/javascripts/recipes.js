// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function(){

	// Prepare ingredient query string
	// $('#recipe-search').submit(function(e) {

	// 	e.preventDefault();  
	var recipeCount = 10;
	var recipeGet = function() {
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
	    }).success(function(){
	    	console.log('success');
	    	var recipeCount = $('.search-results > div').length;
	    	var currentIndex = 0;
    	  /* add the active class to the first item to hide all the others */
	    	$('.search-results > div:eq(' + currentIndex + ')').addClass('active');
	    	imageCallback();
	    });
	}

	recipeGet();

	var callback = function(){
		var ingredient = $('#ingredient').val();
		$('#ingredient').val('');
		$('#ingredient-box').append('<div class="tag-box"><button type="button" class="ingredient-in-box tag" data-ingredient='+ ingredient +'>' + ingredient + '</button></div>');

		$('button.ingredient-in-box').on('click', function(){
			$(this).remove();
			recipeGet();
		});

		recipeGet();
	}

	$('#ingredient').keypress(function(event){
		if (event.which == 13) {
			callback();
		}       
	});

	$("#add-ingredient").on('click', callback);

	var imageCallback = function() {
		var imgRight = currentIndex +2;
		var imgLeft = currentIndex;

		var recipeCount = $(".search-results").children().length;
		if (imgRight > recipeCount) { imgRight = 1; }
		if (imgLeft < 1) { imgLeft = recipeCount; }

		var imageUrlRight = $(".search-results .recipe-thumb:nth-child(" + imgRight + ") .inner img").attr('src');
		$('.right-img').css('background-image', 'url(' + imageUrlRight + ')');

		var imageUrlLeft = $(".search-results .recipe-thumb:nth-child(" + imgLeft + ") .inner img").attr('src');
		$('.left-img').css('background-image', 'url(' + imageUrlLeft + ')');
	}

	//Add hover class to recipe thumb when hovering over buttons

	$(".right-swipe").hover(
		function() {
			$(".recipe-thumb").addClass( "hover" );
		}, function() {
			$(".recipe-thumb").removeClass( "hover" );
		}
		);

	$(".left-swipe").hover(
		function() {
			$(".recipe-thumb").addClass( "hover2" );
		}, function() {
			$(".recipe-thumb").removeClass( "hover2" );
		}
		);

	// Transition out recipe result on clicking next
	var currentIndex = 0;
  $('.swipe').on('click', function() {
  	console.log('CLICK');
    var $active  = $('.search-results > div.active'),
        isNext   = $(this).hasClass('right-swipe');
    currentIndex = ((currentIndex + (isNext ? 1 : -1)) % recipeCount);

     // go back to the last item if we hit -1 
    if (currentIndex === -1) {
      currentIndex = recipeCount - 1;
    }

    var $next = $('.search-results > div:eq(' + currentIndex + ')');
    $active.addClass(isNext ? 'next-out' : 'prev-out');
    $next.addClass('active').addClass(isNext ? 'next-in' : 'prev-in');
    setTimeout(function() { 
      $active.removeClass('active next-out prev-out');
      $next.removeClass('next-in prev-in');
      imageCallback();
    }, 500);
    return false;
  });

});













