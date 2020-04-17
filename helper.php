<?php
error_reporting(1);
require_once('includes/core.php');
$tagOne = "";
$tagTwo = "";

if (isset($_GET['gamaOne'])) {
    $tagOne = GAMA_secureEncode($_GET['gamaOne']);
}

if (isset($_GET['gamaTwo'])) {
    $tagTwo = GAMA_secureEncode($_GET['gamaTwo']);
}

if($tagOne == "login") {
    echo "Login Successful";
    $_SESSION['userIdentity'] = $_POST['userId'];
    $_SESSION['userEmail'] = $_POST['userEmail'];
    $_SESSION['userToken'] = $_POST['token'];
    $_SESSION['userRole'] = $_POST['userRole'];
    $_SESSION['fullName'] = $_POST['fullName'];
    
    session_regenerate_id();
    echo'<script>location.reload(true);</script>';
}

if($tagOne == "logout") {
    echo"Logging you out";
    unset($_SESSION['userEmail']);
    unset($_SESSION['userToken']);
    unset($_SESSION['userRole']);
    unset($_SESSION['fullName']);
    unset($_SESSION['userIdentity']);
    session_regenerate_id();
    echo'<script> setTimeout(function () {
        window.location.href = "'.$gama['config']['siteUrl'].'/";
     }, 2000);</script>';
}

if($tagOne == "contactForm") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $matter = $_POST['matter'];

    $to = "reach@zerofood.in";
    $subject = $subject;
    $txt = $matter;
    $headers = "From:" .$email. "\r\n" .
    "CC: manoj19916@gmail.com";

    mail($to,$subject,$txt,$headers);

    echo "Thank you for contacting us, We will respond soon!";
}
?>