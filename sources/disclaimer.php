<?php
/* Core */
require_once("includes/core.php");
if(isset($_SESSION['userEmail']))
{
	$gama['content'] = GAMA_getPage('userhome/disclaimer');
}
else
{
	$gama['content'] = GAMA_getPage('userhome/disclaimer');	
}