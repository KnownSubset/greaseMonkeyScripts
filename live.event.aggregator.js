// ==UserScript==
// @name           yahoo
// @namespace      bob
// @require       http://code.jquery.com/jquery-1.7.1.min.js
// @unwrap
// ==/UserScript==
unsafeWindow.myScript = this;

$(document).ready(function(){
    var header = jQuery.find('div#c_header ul.c_ht');
    header.append('<li><a id="timesheetFormatter" class="uxfa_ml c_ml">Timesheet</a></li>');
    var timesheetLink = header.find("a#timesheetFormatter");
    timesheetLink.onclick(function (){
        var agendaContent = jQuery.find('div#calendarAgendaView div#agendaContent');
        var eventsForEachDay = agendaContent.find('ol.avList');
        eventsForEachDay.each(function(){
            var day = jQuery(this);
            var theEventsOfTheDay = day.find('li.avEvt');
            theEventsOfTheDay.each(function (){
                var eventInfo = jQuery(this).find('table.avWhatTable td a.avEvtWhat').text();
            });
        });
    });

});