<style type="text/css">
    <!--
    *{margin:0;padding:0}
    h2{font-size:14pt}
    .ar{text-align:right;}
    .ac{text-align:center;}
    .box{border:0.2mm #000000 solid;padding:5mm;}
    .bordato{border:0.2mm #ccc dotted;}
    .bg{background-color:#f1f1f1;padding:1mm}
    .abs{position:absolute}
    .lbl{font-size:8pt;font-style:italic;color:#595959;margin-bottom:3mm;}
    .tl{font-weight:bold;text-transform:uppercase;}
    .dith{font-size:8pt;color:#595959}
    .spazioditta{padding-left:0.85mm;}
    .txtdxlogo{margin-left:40mm;font-size:7pt}
	#testa{margin-left:5mm;margin-top:5mm;}
    #dilo{border-right:3mm #25AB7E;top:25mm;left:2mm;width:33mm;height:14mm;overflow:hidden;font-size:8pt;padding-right:1mm;text-align:right;}
    #slogan{font-size:7.5pt;text-transform:uppercase;color:#25AB7E;margin-top:13mm;text-align:justify;margin-bottom:6.6mm}
    #dittadi{font-style:italic;}
    #ditta{top:10mm;width:100mm;}
    #recapiti{line-height:10pt;}
    #tl-descrizione{left:14mm;}
    #tl-prezzo{left:118mm}
    #tl-sconto{left:136mm;}
    #tl-importo{left:162mm}
    #tl-iva{left:181mm;}    
    
    #destinatario{top:11mm;left:103mm;width:86mm}
    #recapito{top:41mm;left:103mm;width:86mm}
    #r0{top:51mm;left:2mm}
    #r1{top:61mm;left:2mm}
    #r2{top:71mm;left:2mm}
    #th1{top:80.8mm;left:2mm}
    #riferimenti{left:45mm;width:137mm;font-size:8pt}
	#piva,#CF{left:55mm;}
    #numdoc{left:21mm;}
    #numeropagina{left:45mm;}
    #modpag{left:90mm;width:39mm;}
    #merce{padding-top:5mm;padding-left:-10mm}
    #rf1{top:241mm;left:7mm}
    #rf2{top:251mm;left:7mm}
    #rf3{top:261mm;left:7mm}
    #rf4{top:271mm;left:7mm}
    #rf5{top:277mm;left:7mm}
    #peso{left:15mm}
    #aspetto,#iniziotrasporto{left:40mm}
    #tipitrasporto_id,#conducente,#firmavettore{left:89mm}
    #notedfddt{left:135mm;width:59mm;height:16mm;}
    #firmadestinatario{left:135mm;}
    #notedf{left:90mm;}
    #tiva{left:111.5mm; width:20mm;}
    #tese{left:131.5mm; width:20mm;}
    #timpo{width:26mm;left:85mm;}
    #pagare{left:154mm;width:33mm;font-weight:bold;}
    #pagare-tot{font-size:12pt;margin-top:-0.5mm}
	#scadenze{left:133.5mm;width:53.5mm;height:14mm;}
	#filigrana{color:#f1f1f1;font-size:60pt;width:180mm;z-index:-1!important;text-align:right;padding:1mm;top:50mm;left:-10mm;text-align:center}
    .nota{font-size:8pt;left:116mm;}
    .trmerce{}
    .trmerce td{}
    .tdqta{width:14mm;}
    .tddescrizione{
        padding-left:1mm;
    <? if (!$DDT) : ?>
        width:98mm;
    <? endif; ?>
    }
    .tdprezzo{width:18mm}
    .tdsconto{width:18mm;font-style:italic}
    .tdimporto{width:28mm}
    .tdaliva{width:8mm;font-style:italic}
    .dettiva{width:20mm;}
    .dett-aliva{width:11mm;}
    .dett-impo{width:20mm;}
    .dett-iva{width:19.5mm;font-style: italic;}
    .dett-descriva{width:27mm;padding-left:1.5mm;}
    .b{font-weight:bold;}
    -->
</style>
<page style="font: helvetica;"
      backtop="76mm"
      backbottom="35mm"
      backleft="15mm"
      backright="15mm"
      backimg="img/<?=$PagSf?>"
      backimgx="center"
      backimgy="top"
      backimgw="100%"
      footer="page_footer">
    <page_header>
        <div id="testa">
            <div id="ditta" class="g abs">
                <? if (isset($d) && $d['intestazionedf']) : ?>
                    <?=$d['intestazionedf']?>
                <? elseif(isset($d)) : ?>
                    <h2><?=$d['ditta']?></h2>
                    <hr />
                    <p id="datiditta"><?=$d['indirizzo']?> - <?=$d['cap']?> <?=$d['citta']?> <?=$d['prov']?></p>
                    <p>Tel <?=$d['tel']?> - E-mail: <?=$d['email']?></p>
                    <p>P. I.V.A.: <b><?=$d['pi']?></b> - Cod. Fisc.: <b><?=$d['cf']?></b></p>
                <? endif; ?>
                
            </div>

            <div id="destinatario" class="g abs">
                <p class="lbl">Intestatario documento</p>
                <p>
                    <i>Spettabile Ditta</i><br />
                    <b><?=$cl['nome']?></b><br />
                    <?=$cl['indi1']?><br />
                    <?=$cl['indi2']?>
                </p>
            </div>
            <div id="recapito" class="g abs">
                <p class="lbl">Luogo di destinazione o recapito documento</p>
                <p>
                    <i>Spettabile Ditta</i><br />
                    <b><?=$sp['nome']?></b><br />
                    <?=$sp['indi1']?><br />
                    <?=$sp['indi2']?>
                </p>
            </div>
            <div id="r0" class="riga abs">
                <div id="tipodoc" class="abs b"><span class="lbl">Tipo Documento</span><br /><?=$r->tdf->tdf; ?></div>
                <div id="cf" class="abs"><span class="lbl">Codice Fiscale</span><br /><?=$cl['cf']?></div>
            </div>
            <div id="r1" class="riga abs">
                <div id="datadoc" class="abs b"><span class="lbl">Data</span><br /><?=DataUsa2Ita($r['datadf']) ?></div>
                <div id="numdoc" class="abs b"><span class="lbl">Numero</span><br /><?=$r->numero; ?>/<?=substr(($r['datadf']),2,2);?></div>
                <div id="numeropagina" class="abs"><span class="lbl">Pag.</span><br />[[page_cu]]/[[page_nb]]</div>
                <div id="piva" class="abs"><span class="lbl">Partita IVA</span><br /><?=$cl['pi']?></div>
            </div>
            <div id="r2" class="riga abs">
				<?php if ($DDT) : ?>
					<div id="causale" class="abs"><span class="lbl">Causale</span><br /><?=($r['causali_id']) ? $r->causali['causale'] : null; ?></div>
					<div id="riferimenti" class="abs"><span class="lbl">Riferimenti</span><br /><?=$r['riferimenti']?></div>
				<?php else : ?>					
					<div id="rifdf" class="abs"><span class="lbl">Riferimenti</span><br /><?=$r['riferimenti']?></div>
				<?php endif; ?>
                
            </div>
            <div id="th1" class="riga abs">
                <div id="tl-qta" class="abs tl">Q.T&Agrave;</div>
                <div id="tl-descrizione" class="abs tl">DESCRIZIONE</div>
                <?php if (!$DDT): ?>
                    <div id="tl-prezzo" class="abs tl">PREZZO</div>
                    <div id="tl-sconto" class="abs tl">SCONTO</div>
                    <div id="tl-importo" class="abs tl">IMPORTO</div>
                    <div id="tl-iva" class="abs tl">IVA</div>
                <?php endif;?>
            </div>             
        </div><!-- /#TESTA -->
    </page_header>   
    <!-- <div id="corpo"> -->
	<?php if (isset($_REQUEST['__fili']) && $_REQUEST['__fili']=='1') : ?> 
		<div class="abs back" id="filigrana"><?=$r->tdf->tdf; ?></div>
	<?php endif; ?>
    <table id="merce" border="0">
        <?php
            $imponibile=0.00;
            $importo=0.00;
            $iva=0.00;
            if (isset($arriva)) unset($arriva);
            $arriva=Array();
            $descriva=Array();
            if (isset($arrese)) unset($arrese);
            $arrese=Array();
            $descrese=Array();
            $i=0;
        foreach ($f as $F):
            if ($F->aliva['aliva']>0) :
                if (!isset($arriva[$F->aliva['id']]) ) $arriva[$F->aliva['aliva']] =null;
                $arriva[$F->aliva['id']]+=$F['importo'];
                $descriva[$F->aliva['id']]=$F->aliva['descriva'];
				$imponibile += $F['importo'];
            elseif($F->aliva) :
				if (!isset($arrese[$F->aliva['id']])) $arrese[$F->aliva['id']] = 0;
                $arrese[$F->aliva['id']]+=$F['importo'];
                $descrese[$F->aliva['id']]=$F->aliva['descriva'];
            endif;
            
            ?>
            <tr class="trmerce">
                <td class="ar tdqta" valign="top">
                    <? if($F->prezzo>0){echo "$F->um"." ";} ?>
                    <? if($F->prezzo>0){echo fd2("$F->qta");} ?>
                </td>                
                <td class="tddescrizione">
                    <? //echo htmlentities("$F[descrizione]", ENT_QUOTES | ENT_IGNORE, "UTF-8"); ?>
                    <?= ($F['descrizione']) ? $F['descrizione'] : $F->articoli['articolo'];  ?>
                </td>
                <? if (!$DDT) : ?>
                    <td class="ar tdprezzo" valign="bottom"><? if($F->prezzo!=0){ echo fd2("$F->prezzo");} ?></td>
                    <td class="ar tdsconto" valign="bottom"><?=Pp($F['sconto'])?></td>
                    <td class="ar tdimporto" valign="bottom" ><? if($F->prezzo!=0){ echo fd2("$F->importo");} ?></td>
                    <td class="ar tdaliva" valign="bottom"><? $i = ($F->aliva) ? $F->aliva['id'] : ''; echo $i; ?></td>
                <? endif; ?>
            </tr>
            <? $i++; endforeach; ?>
    </table>
    <!-- </div>  /#corpo -->
    <page_footer>
        <div id="ftr" class="abs">
        <? /*
        <div id="rf1" class="riga abs">
            <p class="nota abs"><br /><?=$T->annotazioni?> Contributo CONAI assolto dove dovuto</p>
        </div>
        */ ?>
        <div id="rf2" class="riga abs">
            <? if (!$DDT): ?>
            <table id="riva" class="abs" border="0">
                <tr>
                    <th class="di ar dett-aliva dith">Cod.</th>
                    <th class="di ar dett-impo dith">Imponib./Es.</th>
                    <th class="di ar dett-iva dith">Imposta</th>
                    <th class="di dett-descriva dith">Descriz. IVA/Esenz.</th>
                </tr>
                <?php
                $tiva=0.00;
                $tese=0.00;
                $totale=0.00;
                if (isset($arriva)) :
                    foreach ($arriva as $k=>$v):
                        $iva = round($v*$k/100,2);
                        $tiva+=$iva;
                        ?>
                        <tr>
                            <td class="di ar dett-aliva"><?=$k;?></td>
                            <td class="di ar dett-impo"><?=fd2($v) ?></td>
                            <td class="di ar dett-iva"><?=fd2($iva) ?></td>
                            <td class="di dett-descriva"><?=$descriva[$k] ?></td>
                        </tr>
                        <?
                        $i++;
                    endforeach;
                endif;
                if (isset($arrese)) :
                    foreach ($arrese as $k=>$v):
                        $tese+=$v;
                        ?>
                        <tr>
                            <td class="di ar dett-aliva"><?=$k;?></td>
                            <td class="di ar dett-impo"><?=fd2($v) ?></td>
                            <td class="di ar dett-iva"><?=fd2(0) ?></td>
                            <td class="di dett-descriva"><?=$descrese[$k];?></td>
                        </tr>
                        <?
                        $i++;
                    endforeach;
                endif;                  
                    ?>
            </table><!-- /#riva -->
            
                <div id="timpo" class="ar abs"><span class="lbl">Tot. Imponibile</span><br /><?=fd2($imponibile) ?></div>
                <div id="tiva" class="ar abs"><span class="lbl">Tot. Imposta</span><br /><?=fd2($tiva) ?></div>
                <div id="tese" class="ar abs"><span class="lbl">Tot. Esenzioni</span><br /><?=fd2($tese) ?></div>
                <div id="pagare" class="abs"><span class="lbl">TOTALE A PAGARE</span><br /><p class="ar" id="pagare-tot">&euro; <?=fd2($imponibile+$tiva+$tese); ?></p></div>
                
            <? else : ?>
                <div id="colli" class="ar abs"><span class="lbl">N° Colli</span><br /><?=$r['colli']?></div>
                <div id="peso" class="ar abs"><span class="lbl">Peso (Kg.)</span><br /><?=fd2($r['peso'])?></div>
                <div id="aspetto" class="abs"><span class="lbl">Aspetto esteriore dei beni</span><br /><?=$r['aspetto']?></div>
                <div id="tipitrasporto_id" class="abs"><span class="lbl">Trasporto a cura del</span><br /><?=($r->tipitrasporto_id) ? $r->tipitrasporto['tipotrasporto']:''; ?></div>
                <div id="notedfddt" class="abs"><span class="lbl">Note e ulteriori indicazioni</span><br /><?=$r['notedf']?></div>
            <? endif; ?>
                
        </div><!-- /#rf2 -->
            <div id="rf3" class="riga abs">
                <? if(!$DDT) : ?>
                    <div id="modpag" class="abs"><span class="lbl">Modalit&agrave; di pagamento</span><br /><?=$r->modpag['modpag']; ?>&nbsp;</div>
                    <div id="scadenze" class="abs"><span class="lbl">Scadenze</span><br /><?=$r['scadenze']; ?>&nbsp;</div>
                <? else: ?>
                    <div id="porto" class="abs"><span class="lbl">Porto</span><br /><?=($r['porti_id']) ? $r->porti['porto'] : ''; ?></div>
                    <div id="iniziotrasporto" class="abs"><span class="lbl">Inizio Trasporto</span><br /><?=($r['iniziotrasporto'])?date_format(date_create($r['iniziotrasporto']),'d/m/Y H:i') : ''?></div>
                    <div id="conducente" class="abs"><span class="lbl">Vettore/Conducente</span><br /><?=$r['conducente']?></div>
                <? endif; ?>
            </div>
			<? if ($DDT) : ?>
				<div id="rf4" class="riga abs">
					<div id="annotazioni" class="abs"><span class="lbl">Annotazioni</span><br /></div>
                    <div id="firmavettore" class="abs"><span class="lbl">Firma Vettore/Conducente</span><br /></div>
                    <div id="firmadestinatario" class="abs"><span class="lbl">Firma Destinatario</span><br /></div>
				</div>
            <? else : ?>
				<div id="rf5" class="riga abs">
					<div id="iban" class="abs b"><span class="lbl">IBAN Ns. Banca:&nbsp;</span><span class="ac"><?=$d['iban']; ?></span></div>
					<div id="notedf" class="abs"><?=CONAI.'. '.$r['notedf'];?></div>
				</div>   
			<? endif; ?>
        </div> <!-- /#ftr -->
    </page_footer>
</page>