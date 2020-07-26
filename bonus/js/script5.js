$(document).ready(init);

function init(){
  var myRightButton = $('#button-right');
  var myLeftButton = $('#button-left');

  var currentMonths = moment('2018-01-01');
  var currentMonth = currentMonths.month(0);
  var prevMonths = moment('2017-01-01');
  var prevMonth = prevMonths.month(11);
  var nextMonths = moment('2018-01-01');
  var nextMonth = nextMonths.month(1);

  var prevNext = parseInt(nextMonth.endOf('month').format('DD'));
  // console.log(prevNext);


  printMonth(currentMonth, prevMonth, nextMonth);
  printHoliday(currentMonth);
  $('#currentYM').html(currentMonths.format('YYYY MMMM'));

  myRightButton.click(goRight);
  myLeftButton.click(goLeft);

  var j = 0;
  var w = 11;
  var u = 1;

  function goRight(){
    j += 1;
    w += 1;
    u += 1;
    currentMonths.month(j);
    prevMonths.month(w);
    nextMonths.month(u);

    var daysInMonthPrev = prevMonth.daysInMonth();

    $('#currentYM').html(currentMonths.format('YYYY MMMM'));
    printMonth(currentMonth, prevMonth, nextMonth);
    printHoliday(currentMonth);

    if (currentMonths.year() != 2018) {
      currentMonths.year(2018);
    }
  }

  function goLeft(){
      j -= 1;
      w -= 1;
      u -= 1;

    currentMonths.month(j);
    prevMonths.month(w);
    nextMonths.month(u);

    var daysInMonthPrev = prevMonth.daysInMonth();
    $('#currentYM').html(currentMonths.format('YYYY MMMM'));

    printMonth(currentMonth, prevMonth, nextMonth);
    printHoliday(currentMonth);
    if (currentMonths.year() != 2018) {
      currentMonths.year(2018);
    }
  }

  printWeek()
}



// ******************************************************************
function printWeek(){
  // var daysInWeek = currentMonth.daysInMonth();
  var templateWeek = $('#template-week').html();
  var compiledWeek = Handlebars.compile(templateWeek);
  var targetWeek = $('#days-week');
  // targetGen.html('');


  for (var i = 0; i <= 6; i++) {
    var dd = moment().day(i);
    var weekTxt = dd.format('dddd');
    targetWeek.append(compiledWeek({
      dataday: i,
      dayname: weekTxt
    }));

  }
}
// ******************************************************************

function printMonth(currentMonth, prevMonth, nextMonth){



  var daysInMonth = currentMonth.daysInMonth();
  var templateGen = $('#template-gen').html();
  var compiledGen = Handlebars.compile(templateGen);
  var targetGen = $('#my-month-new');
  targetGen.html('');


  var daysInMonthPrev = prevMonth.daysInMonth();
  // console.log(daysInMonthPrev);
  var monthPrev = prevMonth.format('MMM');
  // console.log(monthPrev);
  var monthNext = nextMonth.format('MMM');
  // console.log(monthNext);

// ******************************************************************

    var contatore = 0;
    var momObj1 = moment({
      years:currentMonth.year(),
      months:currentMonth.month(),
      days:i
    });



    var dataDayMy1 = parseInt(momObj1.format('d'));
    diff = daysInMonthPrev - dataDayMy1 + 1;
    while(contatore != dataDayMy1){

    // console.log(dataDayMy);
    targetGen.append('<li class="prev-box"><div class="my-numbers">'+diff+'</div><div>'+monthPrev+'</div></li>');

    diff++;
    contatore++;
  }


  for (var i = 1; i <= daysInMonth; i++) {
    var momObj = moment({
      years:currentMonth.year(),
      months:currentMonth.month(),
      days:i
    });

    var dataDayMy = parseInt(momObj.format('d'));
    // console.log(dataDayMy);



    var daysHTML = compiledGen({
      value: i,
      datecomplete: momObj.format('YYYY-MM-DD'),
      dataday: dataDayMy
    });
    targetGen.append(daysHTML);

  }


  var contatore2 = 0;
  var momObj2 = moment({
    years:currentMonth.year(),
    months:currentMonth.month(),
    days:daysInMonth
  });
  var dataDayMy2 = parseInt(momObj2.format('d'));

  // console.log(dataDayMy2);

  while(contatore2 != (6 - dataDayMy2)){

  // console.log(dataDayMy);
  targetGen.append('<li class="next-box"><div class="my-numbers">'+(contatore2 + 1)+'</div><div>'+monthNext+'</div></li>');
  contatore2++;
}

}



function printHoliday(currentMonth){
  var myYear = currentMonth.year();
  var myMonth = currentMonth.month();
  // console.log(myYear, myMonth);
  $.ajax({

    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',
    data: {
      'month': myMonth,
      'year': myYear
    },
    success: function (data, state){
      if(data.success == true){
        var myResp = data['response'];
        // var targetLi = $('#my-month-new > li');
        // var datadata = targetLi.data('datecomplete');

        // console.log(datadata);

        for (var i = 0; i < myResp.length; i++) {
          var myName = myResp[i]['name'];
          var myDate = myResp[i]['date'];
          // $("#my-month-new > li[date-datecomplete='" + myResp[i]['date'] + "']");
          var holiDD = $("#my-month-new > li[data-datecomplete='" + myResp[i]['date'] + "']");
          // console.log(holiDD);
          holiDD.append('<h4>' + myName + '</h4>');
          holiDD.addClass('holiday');
          // console.log("#my-january-new > li[data-datecomplete='" + myResp[i]['date'] + "']");


          // if(datadata == myDate){
            //   targetNN.html('festa');
            // }

            // console.log(myResp[i]);
          }

          // console.log(myResp);

      } else {
        alert('Non ci sono i dati disponibili per l\'anno selezionato!');
      }

    },

    error: function (request, state, error){
      console.log('error!');
      console.log(request);
      console.log(state);
      console.log(error);
    }
  });

}
