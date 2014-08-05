

$(document).ready(function() {

	// Simple Gethub API demo by Jake Rocheleau.  Thank you Jake.
	$('#githubApiData').html('<div id="loader"><img src="img/loader.gif" alt="loading..."></div>');
	
	var username = 'rahlusmorsi';
	var requri   = 'https://api.github.com/users/'+username;
	var repouri  = 'https://api.github.com/users/'+username+'/repos';
	
	requestJSON(requri, function(json) {
	  if(json.message == "Not Found" || username == '') {
		$('#githubApiData').html("<h2>No User Info Found</h2>");
	  }
	  
	  else {
		// else we have a user and we display their info
		var fullname   = json.name;
		var username   = json.login;
		var aviurl     = json.avatar_url;
		var profileurl = json.html_url;
		var location   = json.location;
		var followersnum = json.followers;
		var followingnum = json.following;
		var reposnum     = json.public_repos;

		if(fullname == undefined) { fullname = username; }
		
		var outhtml = '<p><strong>'+'(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</strong></p>';
		outhtml = outhtml + '<div class="repolist clearfix">';
		
		var repositories;
		$.getJSON(repouri, function(json){
		  repositories = json;   
		  outputPageContent();                
		});          
		
		function outputPageContent() {
		  if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
		  else {
			outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
			$.each(repositories, function(index) {
			  outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
			});
			outhtml = outhtml + '</ul></div>'; 
		  }
		  $('#githubApiData').html(outhtml);
		} // end outputPageContent()
	  } // end else statement
	}); // end requestJSON Ajax call
  
  function requestJSON(url, callback) {
	$.ajax({
	  url: url,
	  complete: function(xhr) {
		callback.call(null, xhr.responseJSON);
	  }
	});
  }

  $('button#keys').on('click', function(){
  	$(this).toggleClass('active');

  	if( $(this).hasClass('active') ){
		$(this).on('keydown', function(e){
			console.log('You pressed the keyCode ' + String(e.keyCode) + ' key.');
		})
  	}
  });

});

  