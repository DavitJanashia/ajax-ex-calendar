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

  var j = 0;
  var w = 11;
  var u = 1;

  myRightButton.click(function (){
  j += 1;
  w += 1;
  u += 1;
  currentMonths.month(j);
  prevMonths.month(w);
  nextMonths.month(u);


  var daysInMonthPrev = prevMonth.daysInMonth();
  // console.log(daysInMonthPrev);

  $('#currentYM').html(currentMonths.format('YYYY MMMM'));
  printMonth(currentMonth, prevMonth, nextMonth);
  printHoliday(currentMonth);

  if (currentMonths.year() != 2018) {
    currentMonths.year(2018);
  }
  });

  myLeftButton.click(function (){
    j -= 1;
    w -= 1;
    u -= 1;

  currentMonths.month(j);
  prevMonths.month(w);
  nextMonths.month(u);

  var daysInMonthPrev = prevMonth.daysInMonth();
  // console.log(daysInMonthPrev);

  $('#currentYM').html(currentMonths.format('YYYY MMMM'));

  printMonth(currentMonth, prevMonth, nextMonth);
  printHoliday(currentMonth);
  if (currentMonths.year() != 2018) {
    currentMonths.year(2018);
  }
  });

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
    targetGen.append('<li class="empty-box"><div>'+diff+'</div><div>'+monthPrev+'</div></li>');

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
  targetGen.append('<li class="empty-box"><div>'+(contatore2 + 1)+'</div><div>'+monthNext+'</div></li>');
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
        alert('Error! non ci sono i dati disponibili');
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









































// esercizio domani
//
// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all'api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista
// Consigli e domande del giorno:
// Abbiamo visto assieme una libereria che serve per gestire le date... quale sarà?
// Una chiamata ajax può anche non andare a buon fine, che si fa in quel caso? Lasciamo l'utente ad attendere? ;)
//
//
//
//
//
// 1:03
// API: https://flynn.boolean.careers/exercises/api/holidays
// New
//

// PARAMS:
// year: 2018
// month: 0 ~ 11
