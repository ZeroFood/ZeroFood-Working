
InstantClick.on('change', function(){
    $('form').bind("keypress", function(e) {
      if (e.keyCode == 13) {               
        e.preventDefault();
        return false;
      }
    });

	$('#myTable').DataTable();
	var regexMinThree = /^[A-Za-z0-9_ ]{3,40}$/;
	var regexMinEight = /^[A-Za-z0-9_]{8,20}$/;
	var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	var regexPassword =  /^[A-Za-z0-9!@#$%^&*()_]{8,40}$/;
	var regexMinTen = /^[0-9+]{10,14}$/;
	var regexMin = /^[A-Za-z0-9_. ,\:\;\(\)\[\]\{\}\"\'\-\+\*\/\=\&\%\$\#\@\!\~]{3,500}$/;

	$('#exampleInputEmail1').blur(function()
	{
	var userEmail=$(this).val();
	if (!regexEmail.test(userEmail))
	{
		$(this).next().fadeIn().html("Invalid Email Address");
		$(this).css("border", "1px solid #d40303");
	}
	else
	{
		$(this).next().fadeOut();
		$(this).css("border", "1px solid #ccc");
	}
	});

	$('#exampleInputPassword1').blur(function()
	{
	var userPassword=$(this).val();
	if (!regexPassword.test(userPassword))
	{
		$(this).next().fadeIn().html("Invalid Password, Shall contain minimum of 8 characters");
		$(this).css("border", "1px solid #d40303");
	}
	else
	{
		$(this).next().fadeOut();
		$(this).css("border", "1px solid #ccc");
	}
	});

	$('#exampleInputPassword2').blur(function()
	{
	var userPassword=$(this).val();
	if (!regexPassword.test(userPassword))
	{
		$(this).next().fadeIn().html("Invalid Password, Shall contain minimum of 8 characters");
		$(this).css("border", "1px solid #d40303");
	}
	else
	{
		$(this).next().fadeOut();
		$(this).css("border", "1px solid #ccc");
	}
	});
	
	$('#examplefullname1').blur(function()
	{
	var fullName=$(this).val();
	if (!regexMin.test(fullName))
	{
		$(this).next().fadeIn().html("Minimum of 3 characters");
		$(this).css("border", "1px solid #d40303");
	}
	else
	{
		$(this).next().fadeOut();
		$(this).css("border", "1px solid #ccc");
	}
	});
	
	$('#exampleInputphone1').blur(function()
	{
	var mobile=$(this).val();
	if (!regexMinTen.test(mobile))
	{
		$(this).next().fadeIn().html("Enter 10 digit mobile number");
		$(this).css("border", "1px solid #d40303");
	}
	else
	{
		$(this).next().fadeOut();
		$(this).css("border", "1px solid #ccc");
	}
	});
	

	$.ajax({
		type: "GET",
		url: gama_zone()+"/food-centers/count",
		data: "", 
		cache: false,
		beforeSend: function() {
			
			},
		success: function(html) {
			
			$('#foodCenterCount').html(html.count).slideDown('fast');
		
		}
	});

});
  

$(document).ready(function(){
    
    $('form').bind("keypress", function(e) {
      if (e.keyCode == 13) {               
        e.preventDefault();
        return false;
      }
    });
    
	google.maps.event.trigger(map, 'resize');
	$('#myTable').DataTable();	



	$.ajax({
		type: "GET",
		url: gama_zone()+"/food-centers/count",
		data: "", 
		cache: false,
		beforeSend: function() {
			
			},
		success: function(html) {
			
			$('#foodCenterCount').html(html.count).slideDown('fast');
		
		}
	});
});







function userForgotPassword() {
	$('.ehMainAjaxResult').slideUp('fast');
	var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var regexMinTen = /^[0-9+]{8,14}$/;
	var userEmailLoginForgot = $.trim($('#forgotPasswordEmailAddress').val());

	if(regexEmail.test(userEmailLoginForgot) || regexMinTen.test(userEmailLoginForgot))
	{
	$.ajax({
		type: "POST",
		url: eh_zone()+"?ehOne=userForgotPassword",
		data: "userEmailLoginForgot="+userEmailLoginForgot, 
		cache: false,
		beforeSend: function() {
			$('.ehMainAjaxResult').slideUp('fast');
			$('.ehMainLoader').slideDown('fast');
			},
		success: function(html) {
				$('.ehMainLoader').slideUp('fast');
				$('.ehMainAjaxResult').html(html).slideDown('fast');
				$('.ehMainAjaxResult').delay(4000).slideUp('fast');
		}
	});
	}
	else
	{
		$('.ehMainLoader').slideUp('fast');
		$('.ehMainAjaxResult').html('Invalid Email Address/Mobile').slideDown('fast');
		$('.ehMainAjaxResult').delay(4000).slideUp('fast');
	}
}

function logout(){
	$.ajax({
		type: "POST",
		url: gamaTwo_zone()+"?gamaOne=logout",
		data: "", 
		cache: false,
		beforeSend: function() {
			$('.ehMainAjaxResult').slideUp('fast');
			$('.ehMainLoader').slideDown('fast');
			},
		success: function(html) {
			$('.ehMainLoader').slideUp('fast');
			$('.ehMainAjaxResult').html(html).slideDown('fast');
			$('.ehMainAjaxResult').delay(4000).slideUp('fast');
		}
	});
}

function login() {
	$('.ehMainAjaxResult').slideUp('fast');
	var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var regexPassword =  /^[A-Za-z0-9!@#$%^&*()_]{8,40}$/;
	var userEmail = $.trim($('#exampleInputEmail1').val());
	var userPassword = $.trim($('#exampleInputPassword1').val());
	if(regexEmail.test(userEmail) && regexPassword.test(userPassword))
	{
		var dataOne = {
            emailId: userEmail,
            password: userPassword
        }
		$.ajax({
			type: "POST",
			url: gama_zone()+"/login",
			dataType: 'json',
            contentType: 'application/json',
			data: JSON.stringify(dataOne), 
			cache: false,
			beforeSend: function() {
				$('.ehMainAjaxResult').slideUp('fast');
				$('.ehMainLoader').slideDown('fast');
				},
			success: function(html) {
				$('.ehMainLoader').slideUp('fast');
				console.log(html.user.id);
				if(html.token){
					$.ajax({
						type: "POST",
						url: gamaTwo_zone()+"?gamaOne=login",
						data: "userEmail="+userEmail+"&token="+html.token+"&fullName="+html.user.fullName+"&userRole="+html.user.role+"&userId="+html.user.id, 
						cache: false,
						beforeSend: function() {
							$('.ehMainAjaxResult').slideUp('fast');
							$('.ehMainLoader').slideDown('fast');
							},
						success: function(html) {
							$('.ehMainLoader').slideUp('fast');
							$('.ehMainAjaxResult').html(html).slideDown('fast');
							$('.ehMainAjaxResult').delay(4000).slideUp('fast');
							
						}
					});
				}
				$('.ehMainAjaxResult').html("success... Please Wait...").slideDown('fast');
				$('.ehMainAjaxResult').delay(4000).slideUp('fast');	
			},
			complete: function(xhr, textStatus) {
				if(xhr.status != 200){
					$('.ehMainLoader').slideUp('fast');
					$('.ehMainAjaxResult').html(xhr.responseJSON.message).slideDown('fast');
					$('.ehMainAjaxResult').delay(4000).slideUp('fast');	
				}
			}
    	});
	} else {
		$('.ehMainLoader').slideUp('fast');
		$('.ehMainAjaxResult').html('Invalid Email Address/Password').slideDown('fast');
		$('.ehMainAjaxResult').delay(4000).slideUp('fast');
	}

}

function signup(){
	var regexMinTen = /^[0-9+]{10,14}$/;
	var regexMin = /^[A-Za-z0-9_. ,\:\;\(\)\[\]\{\}\"\'\-\+\*\/\=\&\%\$\#\@\!\~]{1,500}$/;
	var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var regexPassword =  /^[A-Za-z0-9!@#$%^&*()_]{8,40}$/;
	var userEmail = $.trim($('#exampleInputEmail1').val());
	var userPassword = $.trim($('#exampleInputPassword1').val());	
	var fullName = $.trim($('#examplefullname1').val());	
	var mobile = $.trim($('#exampleInputphone1').val());	
	var passwordRepeat = $.trim($('#exampleInputPassword2').val());
	var conditions = $.trim($('#exampleCheck2').val());
	if ($('#exampleCheck2').is(":checked"))
	{
		if(regexEmail.test(userEmail) && regexPassword.test(userPassword) && regexMinTen.test(mobile) && regexMin.test(fullName)) {
			if(userPassword == passwordRepeat) {
				var dataOne = {
					fullName: fullName,
					emailId: userEmail,
					phoneNumber: mobile,
					password: userPassword

				}
				$.ajax({
					type: "POST",
					url: gama_zone()+"/users",
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(dataOne), 
					cache: false,
					beforeSend: function() {
						$('.ehMainAjaxResult').slideUp('fast');
						$('.ehMainLoader').slideDown('fast');
						},
					success: function(html, textStatus, xhr) {
						if(xhr.status == 200){
							$('.ehMainLoader').slideUp('fast');
							$('.ehMainAjaxResult').html("User registered successfully").slideDown('fast');
							$('.ehMainAjaxResult').delay(4000).slideUp('fast');	
							login();
						}
					},
					complete: function(xhr, textStatus) {
						if(xhr.status != 200){
							$('.ehMainLoader').slideUp('fast');
							$('.ehMainAjaxResult').html(xhr.responseJSON.message).slideDown('fast');
							$('.ehMainAjaxResult').delay(4000).slideUp('fast');	
						}
					} 
				});
			} else {
				$('.ehMainLoader').slideUp('fast');
				$('.ehMainAjaxResult').html('Passwords do not match').slideDown('fast');
				$('.ehMainAjaxResult').delay(4000).slideUp('fast');
			}
		} else {
			$('.ehMainLoader').slideUp('fast');
			$('.ehMainAjaxResult').html('Fill all the details correctly').slideDown('fast');
			$('.ehMainAjaxResult').delay(4000).slideUp('fast');
		}
	} else {
		$('.ehMainLoader').slideUp('fast');
		$('.ehMainAjaxResult').html('Please check Terms and Conditions to proceed').slideDown('fast');
		$('.ehMainAjaxResult').delay(4000).slideUp('fast');
	}
}

function createFoodCenter(){
	var regexMinTen = /^[0-9+]{10,14}$/;
	var regexMin = /^[A-Za-z0-9_. ,\:\;\(\)\[\]\{\}\"\'\-\+\*\/\=\&\%\$\#\@\!\~]{1,500}$/;
	var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var regexPassword =  /^[A-Za-z0-9!@#$%^&*()_]{8,40}$/;
	var place = $.trim($('#Place_Name_id').val());
	var state = $.trim($('#State_id').val());	
	var city = $.trim($('#city_id').val());	
	var address = $.trim($('#address_description').val());
	var lunchTimeFrom = $.trim($('#lunchTimeFrom').val());	
	var lunchTimeTo = $.trim($('#lunchTimeTo').val());	
	var dinnerTimeFrom = $.trim($('#dinnerTimeFrom').val());
	var dinnerTimeTo = $.trim($('#dinnerTimeTo').val());
	var capacity = $.trim($('#capacity_id').val());
	var contactNumber = $.trim($('#contact_id').val());
	var location = $.trim($('#autocomplete').val());
	var postedBy = $.trim($('#author').val());
	var userId = $.trim($('#userIdentity').val());
	var token = $('#token').val();
	var lat = homeMarker.getPosition().lat();
	var lng = homeMarker.getPosition().lng();
	console.log(token);
	if(place != "" && state != "" && lunchTimeFrom != "" && lunchTimeTo != "" && dinnerTimeFrom != "" && capacity != "" && contactNumber != "" && location != "" && postedBy != "" && lat != "" && lng != "") {
		var dataOne = {
			name: place,
			address: address,
			city: city,
			state: state,
			capacity: capacity,
			location: {
				type: "Point",
				coordinates: [lat,lng],
				googleAddress: location
			},
			timings: {
				lunch: {
					start: lunchTimeFrom,
					end: lunchTimeTo
				},
				dinner: {
					start: dinnerTimeFrom,
					end: dinnerTimeTo
				}
			},
			user: {
				id: userId
			},
			contactNumber: contactNumber
		}
		$.ajax({
			type: "POST",
			headers: {
				'Authorization': 'Bearer '+token,
			},
			url: gama_zone()+"/food-centers/",
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(dataOne), 
			cache: false,
			beforeSend: function() {
				$('.ehMainAjaxResult').slideUp('fast');
				$('.ehMainLoader').slideDown('fast');
				},
			success: function(html, textStatus, xhr) {
				if(xhr.status == 200){
					$('.ehMainLoader').slideUp('fast');
					$('.ehMainAjaxResult').html("Food Center Added, will be activated soon").slideDown('fast');
					$('.ehMainAjaxResult').delay(4000).slideUp('fast');	
					$('#createFoodCenterForm')[0].reset();
				}
			},
			complete: function(xhr, textStatus) {
				if(xhr.status != 200){
					$('.ehMainLoader').slideUp('fast');
					$('.ehMainAjaxResult').html(xhr.responseJSON.message).slideDown('fast');
					$('.ehMainAjaxResult').delay(4000).slideUp('fast');	
					$('#createFoodCenterForm')[0].reset();
				}
			} 
		});
	} else {
		$('.ehMainLoader').slideUp('fast');
		$('.ehMainAjaxResult').html('Fill all the details correctly').slideDown('fast');
		$('.ehMainAjaxResult').delay(4000).slideUp('fast');
	}
}

function updateFoodCenter(id, userId){
	var regexMinTen = /^[0-9+]{10,14}$/;
	var regexMin = /^[A-Za-z0-9_. ,\:\;\(\)\[\]\{\}\"\'\-\+\*\/\=\&\%\$\#\@\!\~]{1,500}$/;
	var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var regexPassword =  /^[A-Za-z0-9!@#$%^&*()_]{8,40}$/;
	var place = $.trim($('#Place_Name_id').val());
	var state = $.trim($('#State_id').val());	
	var city = $.trim($('#city_id').val());	
	var address = $.trim($('#address_description').val());
	var lunchTimeFrom = $.trim($('#lunchTimeFrom').val());	
	var lunchTimeTo = $.trim($('#lunchTimeTo').val());	
	var dinnerTimeFrom = $.trim($('#dinnerTimeFrom').val());
	var dinnerTimeTo = $.trim($('#dinnerTimeTo').val());
	var capacity = $.trim($('#capacity_id').val());
	var contactNumber = $.trim($('#contact_id').val());
	var location = $.trim($('#autocomplete').val());
	var postedBy = $.trim($('#author').val());
	var userId = $.trim($('#userIdentity').val());
	var token = $('#token').val();
	var status = $('#status').val();
	var lat = homeMarker.getPosition().lat();
	var lng = homeMarker.getPosition().lng();
	console.log(token);
	if(place != "" && state != "" && lunchTimeFrom != "" && lunchTimeTo != "" && dinnerTimeFrom != "" && capacity != "" && contactNumber != "" && location != "" && postedBy != "" && lat != "" && lng != "" && status != "") {
		var dataOne = {
			name: place,
			address: address,
			city: city,
			state: state,
			capacity: capacity,
			location: {
				type: "Point",
				coordinates: [lat,lng],
				googleAddress: location
			},
			timings: {
				lunch: {
					start: lunchTimeFrom,
					end: lunchTimeTo
				},
				dinner: {
					start: dinnerTimeFrom,
					end: dinnerTimeTo
				}
			},
			user: {
				id: userId
			},
			contactNumber: contactNumber,
			status: status
		}
		$.ajax({
			type: "PUT",
			headers: {
				'Authorization': 'Bearer '+token,
			},
			url: gama_zone()+"/food-centers/"+id,
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(dataOne), 
			cache: false,
			beforeSend: function() {
				$('.ehMainAjaxResult').slideUp('fast');
				$('.ehMainLoader').slideDown('fast');
				},
			success: function(html, textStatus, xhr) {
				if(xhr.status == 200){
					$('.ehMainLoader').slideUp('fast');
					$('.ehMainAjaxResult').html("Food Center Updated").slideDown('fast');
					$('.ehMainAjaxResult').delay(4000).slideUp('fast');	
					
				}
			},
			complete: function(xhr, textStatus) {
				if(xhr.status != 200){
					$('.ehMainLoader').slideUp('fast');
					$('.ehMainAjaxResult').html(xhr.responseJSON.message).slideDown('fast');
					$('.ehMainAjaxResult').delay(4000).slideUp('fast');	
					
				}
			} 
		});
	} else {
		$('.ehMainLoader').slideUp('fast');
		$('.ehMainAjaxResult').html('Fill all the details correctly').slideDown('fast');
		$('.ehMainAjaxResult').delay(4000).slideUp('fast');
	}
}

function contactForm() {
	$('.ehMainAjaxResult').slideUp('fast');
	var regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	var regexMinTen = /^[0-9+]{8,14}$/;
	var name = $.trim($('#name').val());
	var email = $.trim($('#email').val());
	var subject = $.trim($('#subject').val());
	var matter = $.trim($('#matter').val());

	if(regexEmail.test(email) && name != "" && subject !="" && matter != "")
	{
	$.ajax({
		type: "POST",
		url: gamaTwo_zone()+"?gamaOne=contactForm",
		data: "name="+name+"&email="+email+"&subject="+subject+"&matter="+matter, 
		cache: false,
		beforeSend: function() {
			$('.ehMainAjaxResult').slideUp('fast');
			$('.ehMainLoader').slideDown('fast');
			},
		success: function(html) {
				$('.ehMainLoader').slideUp('fast');
				$('.ehMainAjaxResult').html(html).slideDown('fast');
				$('.ehMainAjaxResult').delay(4000).slideUp('fast');
		}
	});
	}
	else
	{
		$('.ehMainLoader').slideUp('fast');
		$('.ehMainAjaxResult').html('Fill all the details correctly').slideDown('fast');
		$('.ehMainAjaxResult').delay(4000).slideUp('fast');
	}
}