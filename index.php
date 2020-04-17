<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//error_reporting(0);
require_once('includes/core.php');

if (!isset($_GET['gamaOne'])) {
    $_GET['gamaOne'] = 'welcome';
}

switch ($_GET['gamaOne']) {
    
    // Welcome page source
    case 'welcome':
        include('sources/welcome.php');
	break;
	
	// About page source
	case 'about':
        include('sources/about.php');
	break;
	
	// Contact page source
	case 'contact':
		include('sources/contact.php');
	break;

	// Signin page source
	case 'signin':
		include('sources/signin.php');
	break;

	// Signup page source
	case 'signup':
		include('sources/signup.php');
	break;

	// reset Password page source
	case 'resetpassword':
		include('sources/resetpassword.php');
	break;

	// Search Result page source
	case 'searchresult':
		include('sources/searchresult.php');
	break;

	// Food Center page source
	case 'foodcenter':
		include('sources/foodcenter.php');
	break;

	// Create Food Center page source
	case 'create':
		include('sources/create.php');
	break;

	// My List page source
	case 'mylist':
		include('sources/mylist.php');
	break;

	// Edit Food Center page source
	case 'edit-food-center':
		include('sources/editfoodcenter.php');
	break;

	// Admin List page source
	case 'admin-list':
		include('sources/adminList.php');
	break;
	
	// Disclaimer page source
	case 'disclaimer':
		include('sources/disclaimer.php');
	break;
}

// If no sources found
if (empty($gama['content'])) {
    $gama['content'] = GAMA_getPage('error');
}
if($_GET['gamaOne']=='feed')
{
include('sources/rss.php');
}
else
{
echo GAMA_getPage('container');
}
