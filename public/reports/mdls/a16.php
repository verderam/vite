<?php
$libs=dirname(__FILE__).'/..';
require_once($libs.'/lib/tbs/tbs_class.php');
require_once($libs.'/lib/tbs/tbs_plugin_mergeonfly.php');
require_once($libs.'/lib/tbs/tbs_plugin_opentbs.php');
if (!isset($_POST['data'])) die('Nessun dato da stampare');
$d=json_decode($_POST['data'],true);

$all=$d['orario'];
$t=array(); //docenti interni
$e=array(); //docenti esterni

foreach ($all as $a):
    if (array_key_exists('dipe',$a) && $a['dipe']=='consulente'):
		$e[]=$a;
    else: 
        $t[]=$a;   
    endif; 
endforeach;

$TBS = new clsTinyButStrong;
$TBS->SetOption('noerr', true); 
$TBS->Plugin(TBS_INSTALL, OPENTBS_PLUGIN);
$TBS->LoadTemplate(dirname(__FILE__).'/office/'.$prefix.'a16.docx', OPENTBS_ALREADY_UTF8);
$TBS->MergeField('d',$d);
$TBS->MergeBlock('t','array','t');
$TBS->MergeBlock('e','array','e');
$TBS->Show(OPENTBS_DOWNLOAD, 'a16.docx');
?>