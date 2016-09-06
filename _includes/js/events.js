
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://ohiourisa.github.io/events-new.json",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (event) {
  _.sortBy(event, function(o) { return o.date; })
  console.log(event);
  /////////////////////
  //console.log(event);

  var months = [
    "Jan", "Feb", "March",
    "April", "May", "June", "July",
    "Aug", "Sept", "Oct",
    "Nov", "Dec"
  ];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  //counters to limit event table propogation
  var y = 0,
  z = 0;
  x = 0;
  var now = new Date();
  console.log('Today is ' + now);
  var eventsTable = "";
  var featuredTxt = "";
  var bannerTxt = "";

  for (var i=0; i < event.length; i++) {
    //console.log(event.length);
    var d = new Date(event[i].date);
    //console.log(d);
    var id = event[i].eventbright;
    var dd = d.getDate();
    var day = d.getDay();
    var mm = d.getMonth(); //January is 0!
    var year = d.getFullYear();
    //var time = moment(d).format("h:mm a");
    var time = event[i].time;
    if (d >= now && x < 1 && event[i].featured == 'true') {
      //console.log(x);
      featuredTxt += '<h4>' + event[i].title + '</h4><p>' + event[i].subtitle + '</p>'
      x = x + 1;
      $('#featuredEvent').html(featuredTxt);
    }
    if ($("#eventBanner").length > 0) {
      if (d >= now && y < 1) {
        //eventBanner += '<h4>' + event[i].title + '</h4><p>' + event[i].subtitle + '</p>'
        $('#eventBanner').html('Next Event ' + months[mm] + '&nbsp;' + dd);
        y = y + 1;
      }
    }
    if($("#eventsTable").length > 0) {
      if ($("#eventsPage").length > 0) {
        eventsTable += '<tr> \
                  <td class="agenda-date" class="active" rowspan="1"> \
                    <div class="dayofmonth">'+ dd + '</div> \
                    <div class="dayofweek">' + days[day] + '</div> \
                    <div class="shortdate text-muted">' + months[mm] + ', ' + year + '</div> \
                  </td> \
                  <td class="agenda-time">' + time + ' \
                     \
                  </td> \
                  <td class="agenda-events"> \
                    <div class="agenda-event"> \
                      '+ event[i].title + ' \
                    </div> \
                    <div class="text-muted">' + event[i].location + '</div> \
                    <span><a href="https://www.eventbrite.com/e/' + id +'" target="_blank">More Info</a></span> \
                  </td> \
                </tr>'
        z = z+1;
      }
      else {
        if (d.setHours(0,0,0,0) >= now.setHours(0,0,0,0) && z < 4) {
          eventsTable += '<tr> \
                    <td class="agenda-date" class="active" rowspan="1"> \
                      <div class="dayofmonth">'+ dd + '</div> \
                      <div class="dayofweek">' + days[day] + '</div> \
                      <div class="shortdate text-muted">' + months[mm] + ', ' + year + '</div> \
                    </td> \
                    <td class="agenda-time">' + time + ' \
                       \
                    </td> \
                    <td class="agenda-events"> \
                      <div class="agenda-event"> \
                        '+ event[i].title + ' \
                      </div> \
                      <div class="text-muted">' + event[i].location + '</div> \
                      <span><a href="https://www.eventbrite.com/e/' + id +'" target="_blank">More Info</a></span> \
                    </td> \
                  </tr>'
          z = z+1;
        }
      }
    }
  }
  if($("#eventsTable").length > 0) {
    $('#eventsTable').append(eventsTable);
  }
});
