<?php
/* Core */
require_once("includes/core.php");
if(isset($_SESSION['userEmail']))
{
    if($_SESSION['userRole'] == "admin") {
        $gama['content'] = GAMA_getPage('userhome/adminList');
    } else {
        $gama['content'] = GAMA_getPage('userhome/content');
    }
	
}
else
{
	$gama['content'] = GAMA_getPage('userhome/content');	
}