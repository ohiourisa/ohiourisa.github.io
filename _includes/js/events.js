var settings = {
  "async": true,
  "crossDomain": true,
  "url": "{{ site.baseurl }}/assets/events-new.json",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (data) {
  var event = _.sortBy(data, function(o) { return (new Date(o.start).getTime()) });
  //event.reverse();
  console.log(event);
  /////////////////////
  //console.log(event);

  var months = [
    "", "Jan", "Feb", "March",
    "April", "May", "June", "July",
    "Aug", "Sept", "Oct",
    "Nov", "Dec"
  ];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  //counters to limit event table propogation
  var y = 0,
  z = 0;
  x = 0;
  var now = moment();
  console.log('Today is ' + now);
  var eventsTable = "";
  var featuredTxt = "";
  var bannerTxt = "";

  for (var i=0; i < event.length; i++) {
    //console.log(event.length);
    var eventDate = moment(event[i].start);
    var d = moment(event[i].start).format();
    console.log(d);
    var id = event[i].eventbright;
    var dd = moment(d).format('D');
    console.log(dd);
    var day = moment(d).format('d');
    var mm = moment(d).format('M'); //January is 1!
    var year = moment(d).format('YYYY');
    //var time = moment(d).format("h:mm a");
    var time = moment(d).format('h:mm a');
    if (eventDate >= now && x < 1 && event[i].featured == 'true') {
      //console.log(x);
      featuredTxt += '<h4>' + event[i].title + '</h4><p>' + event[i].subtitle + '</p>'
      x = x + 1;
      $('#featuredEvent').html(featuredTxt);
    }
    if ($("#eventBanner").length > 0) {
      if (eventDate >= now && y < 1) {
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
        if (eventDate >= now && z < 10) {
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
