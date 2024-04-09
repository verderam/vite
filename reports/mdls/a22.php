<?php
$libs=dirname(__FILE__).'/..';
require_once($libs.'/lib/tbs/tbs_class.php');
require_once($libs.'/lib/tbs/tbs_plugin_mergeonfly.php');
require_once($libs.'/lib/tbs/tbs_plugin_opentbs.php');
if (!isset($_POST['data'])) die();
$d=json_decode($_POST['data'],true);
$t=json_decode($_POST['data'],true);
$all=$d['orario'];
$indoc=array(); //docenti interni
$esdoc=array(); //docenti esterni
$intut=array(); //tutor interni
$estut=array(); //tutor esterni
$rotut=array('TU','TS','CR','PS','PR','DR');

foreach ($all as $a):
    if (array_key_exists('dipe',$a) && $a['dipe']=='consulente'):
        if (array_key_exists('tipologiabreve',$a) && in_array($a['tipologiabreve'],$rotut)){
            $estut[]=$a;
        }else{
            $esdoc[]=$a;
        }
    else: 
        if (array_key_exists('tipologiabreve',$a) && in_array($a['tipologiabreve'],$rotut)){
            $intut[]=$a;
        }else{
            $indoc[]=$a;
        }        
    endif; 
endforeach;

$TBS = new clsTinyButStrong;
$TBS->SetOption('noerr', true); 
$TBS->Plugin(TBS_INSTALL, OPENTBS_PLUGIN);
$TBS->LoadTemplate(dirname(__FILE__).'/office/'.$prefix.'a22.xlsx', OPENTBS_ALREADY_UTF8);
$TBS->MergeField('d',$d);
$TBS->MergeField('t',$t);
$TBS->MergeBlock('id','array','indoc');
$TBS->MergeBlock('ed','array','esdoc');
$TBS->MergeBlock('it','array','intut');
$TBS->MergeBlock('et','array','estut');
$TBS->Show(OPENTBS_DOWNLOAD, 'a22.xlsx');
?>