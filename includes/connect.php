<?php
session_cache_limiter('none');
session_start();

// Include 'config.php' file
require_once('includes/config.php');




// Connect to SQL Server
$dbConnect = new PDO('mysql:host=' . $gamaDbHost . ';dbname=' . $gamaDbName, $gamaDbUser, $gamaDbPass);
$dbConnect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Assign database table names to constants
require_once('database-tables.php');

// Fetch site configurations

$query_one= $dbConnect->prepare("SELECT * FROM " . GAMA_ADMIN);
$query_one->execute();
$config = $query_one->fetch();
$config['siteUrl'] = $siteUrl;
$config['themeUrl'] = $siteUrl . '/themes/' . $config['theme'];
$config['scriptPath'] = str_replace('index.php', '', $_SERVER['PHP_SELF']);
$config['helper'] = $config['scriptPath'] . 'helper.php';


/*if (!isset($_SESSION['language'])) {
    $_SESSION['language'] = $config['language'];
}*/

//include_once('themes/' . $config['theme'] . '/emoticons/process.php');

// Stores site configurations to variables for later use
$gama = array();
$gama['config'] = $config;
// Login verification and user stats update
$logged = false;
$user = null;

/*if (EH_isLogged()) {
    $user = SK_getUser($_SESSION['user_id'], true);
    
    if (!empty($user['id']) && $user['type'] == "user") {
        $sk['user'] = $user;
        $logged = true;
        
        $query_two = "UPDATE " . DB_ACCOUNTS . " SET last_logged=" . time() . " WHERE id=" . $user['id'];
        $sql_query_two = mysqli_query($dbConnect, $query_two);
        
        if (!empty($user['language'])) {
            $_SESSION['language'] = $user['language'];
        }
        
        if (!SK_isFollowing($user['id'], $user['id'])) {
            $query_three = "DELETE FROM " . DB_FOLLOWERS . " WHERE follower_id=" . $user['id'] . " AND following_id=" . $user['id'];
            $sql_query_three = mysqli_query($dbConnect, $query_three);
            
            $query_four = "INSERT INTO " . DB_FOLLOWERS . " (active,follower_id,following_id,time) VALUES (1," . $user['id'] . "," . $user['id'] . "," . time() . ")";
            $sql_query_four = mysqli_query($dbConnect, $query_four);
        }
    }
}

$sk['logged'] = $logged;

// Fetch preferred language
if (!empty($_GET['lang'])) {
    
    if (file_exists('assets/languages/' . $_GET['lang'] . '.php')) {
        $config['language'] = $_GET['lang'];
        $_SESSION['language'] = $_GET['lang'];
        
        if ($logged == true) {
            mysqli_query($dbConnect, "UPDATE " . DB_ACCOUNTS . " SET language='" . $_GET['lang'] . "' WHERE id=" . $user['id']);
        }
    }
}

require_once('assets/languages/' . $_SESSION['language'] . '.php');
*/
// Removes session and unnecessary variables if user verification fails
if ($logged == false) {
    unset($_SESSION['userId']);
    unset($user);
}