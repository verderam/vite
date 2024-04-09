<?php
$libs=dirname(__FILE__).'/..';
require_once($libs.'/lib/tbs/tbs_class.php');
require_once($libs.'/lib/tbs/tbs_plugin_mergeonfly.php');
require_once($libs.'/lib/tbs/tbs_plugin_opentbs.php');

/*
$d=Array();
$i=0;
foreach ($data as $o):
	$d[$i]['username']=$o[0]->username;
	$d[$i]['nome']=$o[0]->username;
	$d[$i]['disciplinabreve']=$o[0]->disciplinabreve;
	$d[$i]['corsobreve']=$o[0]->corsobreve;
	$d[$i]['giorno']=$o[0]->giorno;
	$d[$i]['mese']='prova';
	$i++;	
endforeach;
*/

$d=json_decode($_POST['data'],true);
$t=$d['orario'];

$TBS = new clsTinyButStrong;
$TBS->SetOption('noerr', true); 
$TBS->Plugin(TBS_INSTALL, OPENTBS_PLUGIN);
$TBS->LoadTemplate(dirname(__FILE__).'/office/'.$prefix.'presenzeallievi.xlsx', OPENTBS_ALREADY_UTF8);
$TBS->MergeBlock('t','array','t');
//$TBS->Show(OPENTBS_DOWNLOAD, 'a23_'.$d['mese'].'_'.$t[0]['corsobreve'].'_'.$t[0]['username'].'.docx');
$TBS->Show(OPENTBS_DOWNLOAD, 'presenzeallievi.xlsx');
?>