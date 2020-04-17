<?php
/* Core */
require_once("includes/core.php");
if(!isset($_SESSION['userEmail']))
{
	$gama['content'] = GAMA_getPage('userhome/signup');
}
else
{
	$gama['content'] = GAMA_getPage('userhome/content');	
}