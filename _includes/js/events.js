var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://ohiourisa.github.io/events.json",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (event) {
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

  var eventsListing = "";
  var featuredTxt = "";
  var bannerTxt = "";

  for (var i=0; i < event.length; i++) {
      //console.log(event.length);
      var d = new Date(event[i].date);
      var id = event[i].eventbright;
      var dd = d.getDate();
      var day = d.getDay();
      var mm = d.getMonth(); //January is 0!
      var year = d.getFullYear();
      var time = moment(d).format("h:mm a");
      if (d >= now && z < 1 && event[i].featured == 'true') {
        featuredTxt += '<h4>' + event[i].title + '</h4><p>' + event[i].subtitle + '</p>'
        x = x + 1;
        $('#featuredEvent').html(featuredTxt);
      }
      if (d >= now && y < 1) {
        eventBanner += '<h4>' + event[i].title + '</h4><p>' + event[i].subtitle + '</p>'
        y = y + 1;
        $('#eventBanner').html('Next Event ' + months[mm] + '&nbsp;' + dd);
      }
      if (d >= now && z < 4) {
        eventsListing += '<tr> \
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
  $('#eventsTable').append(eventsListing);
});