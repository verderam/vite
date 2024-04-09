<?php
	$content = ob_get_clean();
try
{
    $DIR=dirname(__FILE__);
    $f = $DIR.'\\f.pdf';
    if (file_exists($f)) unlink($f);
    $f = $DIR.'\\df.pdf';
    if (file_exists($f)) unlink($f);
    $html2pdf = new HTML2PDF('L','A4','it');
    $html2pdf->pdf->SetDisplayMode('fullpage');
    $html2pdf->writeHTML($content, isset($_GET['h']));
    $html2pdf->Output('df.pdf','F');
    header('Content-disposition: inline; filename=f.pdf');
    header('Content-type: application/pdf');
    readfile('df.pdf');
}
catch(HTML2PDF_exception $e) { echo $e; }

?>