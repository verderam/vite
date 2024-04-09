<?php
	require_once('common.php');
?>
<style type="text/css">
	*{margin:0;padding:0;box-sizing:border-box}
	body{font-size:10pt}
	table{max-width:100%}
	table.bordered ,.bordered tr,.bordered th,.bordered td{border:0.2mm #111 solid;border-collapse:collapse}
	.oratbl th, .oratbl td{padding:0.2mm;vertical-align:middle;text-align:center;width:27mm;height:22mm}
	.oratbl th{height:18mm;background-color:#f1f1f1;font-size:12pt}
	.tdgiorno{font-weight:bold;font-size:12pt}
	h3{font-size:14pt}
	.fw{width:100%}
	.ar{text-align:right}
	.ac{text-align:center}
	.abs{position:absolute}
	.subtl{font-weight:normal;float:right}
	.np{height:0;width:0;color:white;position:absolute;top:-20mm;left:-20mm}
</style>
<page style="font: helvetica;"
      backtop="25mm"
      backbottom="10mm"
      backleft="0mm"
      backright="0mm"
      footer="page_footer">
    <page_header>
		<table class="inte" style="border:0" border="0">
			<tr  border="0">
				<td valign="middle" align="left"   border="0">
					<img src="img/<?=$prefix?>logo.jpg" valign="middle" />
				</td>
				<td valign="middle"  align="left"  border="0">
					<p>
						<b>Orario del corso: </b><?=$data->corso?> 
						<?php if ($data->codice) : ?>
							<span> - Cod. <b><?=$data->codice?></b></span>
						<?php endif; ?>
						<br />
						Settimana dal 
						<b><?=strftime("%d/%m/%Y", strtotime($data->dal))?></b> 
						al 
						<b><?=strftime("%d/%m/%Y", strtotime($data->al))?></b>
					</p>
				</td>
			</tr>
		</table>	
    </page_header>
	<div>
		<?=$frag?>
	</div>
    <page_footer>
        <div id="ftr" class="">
			<p>
				Ore totali n° <b><?=$data->tot?></b>
				<?php /*- Pag. [[page_cu]]/[[page_nb]] */ ?>
			</p>
        </div>
    </page_footer>
</page>
<?php
	require_once('pdf.php');
?>