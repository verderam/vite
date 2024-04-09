<?php
require_once('common.php');
?>
<style type="text/css">
	*{margin:0;padding:0;box-sizing:border-box}
	body{font-size:10pt}
	table{max-width:100%}
	table.bordered ,.bordered tr,.bordered th,.bordered td{border:0.2mm #111 solid;border-collapse:collapse}
	.oratbl th, .oratbl td{padding:0.2mm;vertical-align:middle;text-align:center;width:27mm;height:22mm}
	.oratbl th{height:18mm;background-color:#f1f1f1}
	h3{font-size:14pt}
	.fw{width:100%}
	.ar{text-align:right}
	.ac{text-align:center}
	.abs{position:absolute}
	.subtl{font-weight:normal;float:right}
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
						<b>Orario del docente: </b><?=$data->persona?>
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
		<?php /*
		<table id="oratbl" class="bordered fw oratbl">
			<thead>
				<tr>
					<th style="width:6em">Giorno/Ora</th>
					<?php foreach ($data->ore as $o) : ?>
						<th class="ac">
							<?=$o->ora?><br />
							<small><?=$o->dalle?> - <?=$o->alle?></small>
						</th>
					<?php endforeach; ?>
				</tr>
			</thead>
			<tbody class="taborario">
				<?php foreach ($data->giorni as $g) : ?>
					<tr>
						<td class="tdgiorno ac">
							<?=strftime("%A", strtotime($g))?>
						</td>
						<?php foreach ($data->ore as $o) : ?>
							<td class="ac">
								<?php foreach ($data->data as $d) : ?>
									<?php if($d->giorno==$g && $d->ora==$o->ora) : ?>
										<p class="tc">
											<span class="tdd mat">
												<?=($d->tipologiabreve===('DO'||'DZ') ? $d->disciplina : $d->tipologia )?>
												<br />
											</span>
											<b class="tdu">
												<?=$d->corso?>
											</b>
										</p>
									<?php endif; ?>
								<?php endforeach; ?>
							</td>
						<?php endforeach; ?>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	*/?>
	</div>
    <page_footer>
        <div id="ftr" class="">
			<p>Ore totali n° <b><?=$data->tot?></b> - Pag. [[page_cu]]/[[page_nb]]</p>
        </div>
    </page_footer>
</page>
<?php
	require_once('pdf.php');
?>