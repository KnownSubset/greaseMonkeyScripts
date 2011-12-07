// ==UserScript==
// @name           live.event.aggregator
// @namespace      bob
// @require       http://code.jquery.com/jquery-1.7.1.min.js
// @include       https://bay02.calendar.live.com/calendar/*
// @unwrap
// ==/UserScript==
unsafeWindow.myScript = this;

$(document).ready(function(){
	var header = $('div#c_header ul.c_ht');
    header.append('<li><a id="timesheetFormatter" class="uxfa_ml c_ml">Timesheet</a></li>');
    var timesheetLink = header.find("a#timesheetFormatter");
    timesheetLink.click(function (){
        var agendaContent = $('div#calendarAgendaView div#agendaContent');
        var eventsForEachDay = agendaContent.find('ol.avList');
        eventsForEachDay.each(function(){
            var day = $(this);
            var theEventsOfTheDay = day.find('li.avEvt');
            var total=0;
            theEventsOfTheDay.each(function (){
                $(this).find('.avEvtCalTD, .Charm.buttonRest').remove();
                var eventInfo = $(this).find('table.avWhatTable td a.avEvtWhat').text();
                var timeStartIndex = eventInfo.indexOf('(', eventInfo.length - 10 );
                var info = eventInfo.substr(0, timeStartIndex);
                var timeString = eventInfo.substr(timeStartIndex);
                var hourIndex = timeString.indexOf('h');
                var minutesIndex = timeString.indexOf('m');
                var hours = parseInt(timeString.substr(1, hourIndex - 1));
                var minutesText = timeString.substr(hourIndex+2, minutesIndex - hourIndex-1);
                var minutes = minutesText == "" ? 0 : parseInt(minutesText);
                total += hours + minutes/60;
            });
            var dayHeader = day.prev().find('h3');
            dayHeader.append("  (" + parseInt(total) + "h " + (total - parseInt(total)) * 60 + "m)");

        });
    });

});