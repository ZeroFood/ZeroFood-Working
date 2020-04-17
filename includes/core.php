<?php

require_once('connect.php');

function GAMA_secureEncode($string) {
    global $dbConnect;
    $string = trim($string);
    $string = htmlspecialchars($string, ENT_QUOTES);
    $string = str_replace('\\r\\n', '<br>',$string);
    $string = str_replace('\\r', '<br>',$string);
    $string = str_replace('\\n\\n', '<br>',$string);
    $string = str_replace('\\n', '<br>',$string);
    $string = str_replace('\\n', '<br>',$string);
    $string = stripslashes($string);
    $string = str_replace('&amp;#', '&#',$string);
    
    return $string;
}


function GAMA_smoothLink($query='') {
    global $config;
    
    if ($config['smoothLinks'] == 1) {
        $query = preg_replace(
            array(
                '/^index\.php\?gamaOne=timeline&gamaTwo=([^\/]+)&gamaThree=([^\/]+)&recipient_id=([^\/]+)&id=([^\/]+)$/i',
                '/^index\.php\?gamaOne=timeline&gamaTwo=([^\/]+)&gamaThree=([^\/]+)&id=([^\/]+)$/i',
                '/^index\.php\?gamaOne=timeline&gamaTwo=([^\/]+)&id=([^\/]+)$/i',
                '/^index\.php\?gamaOne=timeline&id=([^\/]+)$/i',
                
                '/^index\.php\?gamaOne=story&id=([0-9]+)$/i',
                
                '/^index\.php\?gamaOne=welcome&gamaTwo=forgot_password$/i',
                '/^index\.php\?gamaOne=welcome&gamaTwo=password_reset&id=([A-Za-z0-9_]+)$/i',
                
                '/^index\.php\?gamaOne=([^\/]+)&query=([^\/]+)$/i',
                
                '/^index\.php\?gamaOne=([^\/]+)&gamaTwo=([^\/]+)&gamaThree=([^\/]+)&gamaFour=([^\/]+)$/i',
                '/^index\.php\?gamaOne=([^\/]+)&gamaTwo=([^\/]+)&gamaThree=([^\/]+)$/i',
                '/^index\.php\?gamaOne=([^\/]+)&gamaTwo=([^\/]+)$/i',
                '/^index\.php\?gamaOne=([^\/]+)$/i'
            ),
            array(
                $config['siteUrl'] . '/@$4/$1/$2/$3',
                $config['siteUrl'] . '/@$3/$1/$2',
                $config['siteUrl'] . '/@$2/$1',
                $config['siteUrl'] . '/@$1',
                
                $config['siteUrl'] . '/story/$1',
                
                $config['siteUrl'] . '/forgot-password',
                $config['siteUrl'] . '/password-reset/$1',
                
                $config['siteUrl'] . '/$1/$2',
                
                $config['siteUrl'] . '/$1/$2/$3',
                $config['siteUrl'] . '/$1/$2',
                $config['siteUrl'] . '/$1'
            ),
            $query
        );
    } else {
        $query = $config['siteUrl'] . '/' . $query;
    }
    
    return $query;
}

function GAMA_permalink($str)
{
	if($str !== mb_convert_encoding( mb_convert_encoding($str, 'UTF-32', 'UTF-8'), 'UTF-8', 'UTF-32') )
		$str = mb_convert_encoding($str, 'UTF-8', mb_detect_encoding($str));
	$str = htmlentities($str, ENT_NOQUOTES, 'UTF-8');
	$str = preg_replace('`&([a-z]{1,2})(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig);`i', '\\1', $str);
	$str = html_entity_decode($str, ENT_NOQUOTES, 'UTF-8');
	$str = preg_replace(array('`[^a-z0-9]`i','`[-]+`'), '-', $str);
	$str = strtolower( trim($str, '-') );
	return $str;
}

function GAMA_getPage($pageUrl='') {
    global $gama, $lang;
    
    $page = './themes/' . $gama['config']['theme'] . '/layout/' . $pageUrl . '.phtml';
    $pageContent = '';
    
    ob_start();
    include($page);
    $pageContent = ob_get_contents();
    ob_end_clean();
    
    return $pageContent;
}

function GAMA_loadEmailTemplate($pageUrl='') {
    global $gama, $lang;
    
    $page = 'email-templates/' . $pageUrl . '.ehmail';
    $pageContent = '';
    
    ob_start();
    include($page);
    $pageContent = ob_get_contents();
    ob_end_clean();
    
    return $pageContent;
}