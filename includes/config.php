<?php
// MySQL Hostname 
$gamaDbHost = 'localhost';

// MySQL Database Name
$gamaDbName = 'gamaapps_zerofood';

// MySQL Database User
$gamaDbUser = 'gamaapps_zerofoodadmin';

// MySQL Database Password
$gamaDbPass = 'ZeroFood00850560G';

$memcached = new Memcached;
//$memcached->addServer('/home/mamcodes/.applicationmanager/memcached.sock',0);
//$memcached = 1;
$memcached->addServer("127.0.0.1", 11212);


// Site URL
if($_SERVER['HTTP_HOST']=="zf.gamalabs.in")
{
$siteUrl = 'https://zf.gamalabs.in';
}
else if($_SERVER['HTTP_HOST']=="zerofood.in")
{
$siteUrl = 'https://zerofood.in';
}
else if($_SERVER['HTTP_HOST']==getHostByName(getHostName()))
{
$siteUrl = 'http://'.getHostByName(getHostName()).'/zerofood';
}
else if($_SERVER['HTTP_HOST']=="localhost")
{
$siteUrl = 'http://localhost/zerofood';
}
else if($_SERVER['HTTP_HOST']=="127.0.0.1")
{
$siteUrl = 'http://127.0.0.1/zerofood';
}
else if($_SERVER['HTTP_HOST']=="gama")
{
$siteUrl = 'http://gama/zerofood';
}
else
{
$siteUrl = 'http://localhost/zerofood';
}
