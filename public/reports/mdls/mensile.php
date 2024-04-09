<?php
setlocale(LC_MONETARY, 'it_IT');
?>
<style type="text/css">
	table{width:100%}
	table,tr,th,td{border:0.1mm black solid;border-collapse:collapse}
	th,td{padding:0.5mm}
	h1{font-size:16pt}
	.ar{text-align:right}
	.ac{text-align:center}
	.abs{position:absolute}
	.subtl{font-weight:normal;float:right}
</style>
<page style="font: helvetica;"
      backtop="15mm"
      backbottom="15mm"
      backleft="15mm"
      backright="15mm"
      footer="page_footer">
    <page_header>
        <div id="testa">
		<h1>	
			Costo reale del personale 
			<small class="subtl"> Filiali: <?=($req['codfil']) ? $req['codfil'] : 'Tutte' ?> - Anno: <?=$req['year']?> - Mesi da <?=$req['mfrom']?> a <?=$req['mto']?></small>
		</h1>
		</div>
    </page_header>   
	<div>
		<table style="width:100%">
			<thead>
				<tr>
					<th>Mese</th>
					<th>Matr.</th>
					<th>Dipendente</th>					
					<th>Costo totale</th>
				</tr>
			</thead>
			<tbody>
				<? $tot=0; foreach($data as $d) : $tot+=$d->salare; ?>
				<tr>
					<td class="ac"><?=$d->mese?></td>
					<td class="ar"><?=$d->codmat?></td>
					<td><?=$d->nomedip?></td>
					<td class="ar"><?=money_format('%.2n', $d->salare)?></td>
				</tr>
				<? endforeach;?>
			</tbody>
		</table>
		<h3>Totale del periodo: <span class="tot"><?=money_format('%.2n', $tot)?></span></h3>
	</div>
    <page_footer>
        <div id="ftr" class="">
			<p id="numeropagina">Pag. [[page_cu]]/[[page_nb]]</p>
        </div>
    </page_footer>
</page>
<?php
	require_once('pdf.php');
?>