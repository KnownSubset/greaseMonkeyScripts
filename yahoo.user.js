// ==UserScript==
// @name           yahoo
// @namespace      bob
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @include        http://finance.yahoo.com/q/ta*
// @unwrap
// ==/UserScript==
unsafeWindow.myScript = this;

var initialStocks = 'MON AA AAPL ABT ACI ACN ADM AEM AET AFL AGN AGU AKAM ALG AMAT AMGN AMRN AMSC AMZN ANF APA APC APOG ARG ATHR ATK ATVI AUY AXP B BA BABY BAC BAP BAX BBY BCR BDX BEAV BEZ BGP BHI BHP BIG BIIB BK BMY BP BQI BTU BUCY BUD BWEN BXP C CALM CAT CBRL CBS CEDC CELG CENX CETV CF CFX CHK CIEN CKH CL CLB CLF CLNE CLR CLX CMCSA CMI CMP CNI CNQ CNSL CNX COH COMV COP COST CPL CPST CRUS CRZO CSCO CSX CTCM CVS CVX CX CXO D DAR DD DE DECK DELL DHR DIS DM DO DOV DOW DPTR DRI DRYS DTV DVN EBAY ECA ED EGN EGO EK EMC EMR ENI ENS ENTR EOG EP EPD EQT ESV ETN EXC F FCX FDX FII FLEX FLIR FLS FMCN FMX FO FRO FSLR FSYS FTEK FTI FWLT GD GDI GE GFA GGB GILD GIS GLBL GLD GLW GM GNTX GOOG GPRO GPS GS GSI GTE GTS GU HAL HBAN HBI HCBK HCP HD HDY HEV HK HMC HNZ HOG HON HOS HP HPQ HRB HSC HSP IART IBM IMAX INFY INTC IPI IR ISRG ITT ITW JBHT JCI JNJ JNY JOYG JPM JRCC K KCI KDN KEP KFT KMB KMP KO KOP KR KSS KSU LEN LINE LLL LLY LMT LNN LOW LPX LUB LULU LVLT M MA MASI MAT MCD MCF MCP MDR MDT MDU MEA MELI MEOH MHS MICC MMM MO MOS MRK MRO MRVL MRX MSFT MTL MTW MTZ MUR NAT NBL NBR NFLX NKE NOC NOG NRG NRGY NS NUE NVDA NYX OC OESX OI OII OMG ORA ORCL OTTR OXY PBR PBT PCP PCX PEP PFE PG PH PHM PKG PLCE PM PNRA POT PPG PSA PTR PVH PWR Q QCOM R RAD RBN REXX RIG RIMM RIO RRC RS RSG RSTI S SAN SBUX SCHN SCHW SE SGY SID SIGM SINA SIRI SLB SLM SNN SO SPLS SQM SRE STJ STO STP STR SU SWKS SWN SYMC SYT SYX T TAP TC TDY TGT TIN TJX TM TNB TNE TOL TRN TSN TTEK TUP TXN TXT UA UMC UNG UNH UPL UPS URBN USB UST VFC VIA VLO VMI VZ WAG WBD WFC WFMI WFT WGOV WHR WIN WIT WLL WLT WMB WMT WPI WTI WWE WY WYNN X XEC XHB XIDE XOM YHOO YUM ZMH'

$(document).ready(function(){
	var stocks = initialStocks.split(" ");
	stocks.sort();
	var $pageTicker = $('#pageTicker');
	var $button = $(':submit[value="GO"]');
	var stockIndex = setInitalStock(stocks, $pageTicker);
	var $ranges = $('table.yfnc_datamodoutline1 table tr:first td:eq(2)').children(':visible');
	var selectedRangeIndex = $ranges.index($ranges.not('a'));

	$pageTicker.keypress(function(event){
 		if (event.keyCode  == 38) {
			stockIndex = (stockIndex - 1) < 0 ? stocks.length - 1 : stockIndex - 1;
			updatePage(stocks[stockIndex],$(this), $button);
		} else if (event.keyCode  == 40) {
			stockIndex = ( stockIndex + 1 ) % stocks.length;
			updatePage(stocks[stockIndex],$(this), $button);
		} else if (event.keyCode  == 37) {
			selectedRangeIndex = (selectedRangeIndex - 1) < 0 ? $ranges.length  - 1: selectedRangeIndex - 1;
			javascript:window.location=$ranges.eq(selectedRangeIndex).attr('href');
		} else if (event.keyCode  == 39) {
			selectedRangeIndex = (selectedRangeIndex + 1) % $ranges.length;			
			javascript:window.location=$ranges.eq(selectedRangeIndex).attr('href');
		}


				
	});

	$('#yfncbrobtn,#ygmaheader').hide();	
	$pageTicker.focus();	
});

function updatePage(stock,$input, $submitButton){
	$input.val(stock);
	$submitButton.click();
}

function setInitalStock(stocks, $input){
	var url = document.location.href;
	var selectedStock = url.lastIndexOf("s=");
	var stockIndex = 0;
	if (selectedStock > 0){
		var queryParamsUrl = url.substring(selectedStock + 2, url.length);
		var endIndex = queryParamsUrl.indexOf('&') > 0 ? queryParamsUrl.indexOf('&') : url.length;
		selectedStock = queryParamsUrl.substring(0, endIndex);
		jQuery.each(stocks, function(index, value) {
			if (value == selectedStock){
				$input.val(selectedStock);
				stockIndex = index;				
			}
		});	
	}
	return stockIndex ;
}