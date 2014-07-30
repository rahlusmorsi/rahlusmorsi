'use strict';

$(document).ready(function() {
  var mainHeight = $('#main').height();

  var asideHeight = $('aside').height();

  if ( mainHeight < asideHeight){
  	console.log('main is smaller than aside');
  	$('#main').height(asideHeight);
  }
  
});