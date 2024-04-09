<?php
if (empty($_REQUEST['report'])) die('Report non specificato.');
$prefix=(empty($_REQUEST['prefix'])) ? '': $_REQUEST['prefix'].'-';
$mdl=dirname(__FILE__).'/mdls/'.$_REQUEST['report'].'.php';
if(empty($_POST['data'])) die('Nessun dato da stampare'.print_r($_POST));
if (!file_exists($mdl)) die('Template '.$mdl.' non presente');
$data=json_decode($_POST['data']);
$frag=(empty($_POST['frag'])) ? false : $_POST['frag'];
$req=$_REQUEST;
ob_start();
try{
	include_once($mdl);
} catch(Exception $e) {
	echo 'Caught exception: ',  $e->getMessage(), "\n";
	die('Template non funzionante'.$e);
}
?>
