<?php
/* Core */
require_once("includes/core.php");
if(!isset($_SESSION['userEmail']))
{
	$gama['content'] = GAMA_getPage('userhome/signin');
}
else
{
	$gama['content'] = GAMA_getPage('userhome/content');	
}