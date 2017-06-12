jQuery(document).ready(function($) {
	var quotes = [
		"Anything<br>In Life<br>Can Be<br>Achieved", 
		"There Is<br>Always A<br>Strategy<br>For It", 
		"Connecting<br>The Dots", 
		"Amazing<br>Things<br>Are<br>Coming", 
		"Site Under<br>Construction"];

	// Testing Array
	// console.log(quotes.length);
	// for (var i = 0; i < quotes.length; i++) {
	// 	console.log("Quote " + i + ": " + quotes[i]);
	// };


	$.each($('.fadeIn'), function(index, el) {
		setTimeout(function(){
	       $(el).removeClass('fadeIn');
	    }, ( index * 200 ));
	});

	// Changing Quotes Function
		// Init Array Next Quote Value
		var nextQuote = 0;
		// Interval Timer
		var lsInterval = 6000;

		// Transition Animation Duration
		var lsTransition = 800;

		// Function
		window.setInterval(function(){
			// First change: get off the scope the quote
			$('#shiftQ').addClass('switchQuote');

			// Second change: wait until the quote is out, then replace it with the new one
			setTimeout(function(){
				$('#shiftQ').empty();
				$('#shiftQ').append(quotes[nextQuote]);

				// Third and Final change: insert in the scope the quote again and update the 'nextQuote' var
				$('#shiftQ').removeClass('switchQuote');
				nextQuote += 1;
				if (nextQuote >= 5) {
					nextQuote = 0;
				};

			}, lsTransition);

		}, lsInterval);
});