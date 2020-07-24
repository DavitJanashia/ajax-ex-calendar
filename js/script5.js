// $(document).ready(init);
//
// function init(){
//
// }
// // *****************************************************************************
// // // handlebar template
// function myAll (){
//   var template = $('#template').html();
//   var compiled = Handlebars.compile(template);
//   var targetD = $('#my-day');
//   var targetM = $('#my-month');
//   var targetY = $('#my-year');
//
//   // *****************************************************************************
//   // days
//   for (var i = 1; i <= 31; i++) {
//
//     var optHtml = compiled({
//       'value': i,
//       'valueTxt': i
//     });
//     targetD.append(optHtml);
//   }
//
//   // *****************************************************************************
//   // month
//   var myMonths = moment.months(); // restituisce un array di mesi
//
//   console.log(myMonths);
//
//
//   for (var i = 1; i <= 12; i++) {
//
//     var optHtml = compiled({
//       'value': i,
//       'valueTxt': myMonths[i - 1]
//     });
//     targetM.append(optHtml);
//   }
//
//   // *****************************************************************************
//   // year
//
//   for (var i = 1980; i <= 2020; i++) {
//
//     var optHtml = compiled({
//       'value': i,
//       'valueTxt': i
//     });
//     targetY.append(optHtml);
//   }
//
//
//   // target deve diventare  un array quindi usiamo questo
//
//   var myOpt = $('.my-opt');
//   for (var j = 0; j < 31; j++) {
//   }
// }
//
// myAll ();
//
// // snack 3
//
// // Dopo aver popolato le select, creare un bottone. L'utente sceglierà una data tramite le select e farà click sul bottone.
// // Al click controlliamo che la data sia valida. 31 Febbraio ad esempio non è una data valida (aiutiamoci con Moment)
//
//
// var btnn = $('#my-btnn');
//
//
//
// btnn.click(function(){
//
//   var targetD = $('#my-day');
//   var targetM = $('#my-month');
//   var targetY = $('#my-year');
//
//   var day = targetD.val();
//   var month = targetM.val();
//   var year = targetY.val();
//
//
//   if (month == 2){
//     console.log('ciao');
//   }
// });
//
//
//
//
// $('#my-btnn-prova').click(function () {
//   var valueDay = $('#my-day').val();
//   var valueMonth = $('#my-month').val();
//   var valueYear = $('#my-year').val();
//
//   var mom = moment("'" + valueMonth + "/" + valueDay + "/" + valueYear + "'", 'MM/DD/YYYY').format('ddd DD MMMM YYYY');
//   console.log("'" + valueMonth + "/" + valueDay + "/" + valueYear + "'");
//
//   console.log(mom);
// });
// // ********************************************************
// // Ajax.function
//
// function getCalendar2018(){
//   $.ajax({
//
//     url: 'https://flynn.boolean.careers/exercises/api/holidays',
//     method: 'GET',
//     data: {
//       'month': 0,
//       'year': 2018
//     },
//     success: function (data, state){
//       // console.log(data); // oggetto con le festivita
//       var arFesta = data['response'];
//       console.log(arFesta);
//       // ********************************************************
//       // mese di gennaio
//       var templateGen = $('#template-gen').html();
//       // console.log(templateGen);
//       var compiledGen = Handlebars.compile(templateGen);
//       var targetGen = $('#my-january');
//
//       console.log(arFesta[0]['date'], arFesta[1]['date']);
//
//       var myArFesta = [];
//       for (var l = 0; l < arFesta.length; l++) {
//         myArFesta.push(arFesta[l]['date']);
//       }
//
//
//
//
//
//       // console.log(myArFesta);
//
//       // if (dateCondizione == stringaCondizione)
//
//       var dateCondizione = arFesta[0]['date'];
//
//       var arProvaaa = [];
//
//       for (var q = 0; q < 31; q++) {
//         var formattedNumber = ("0" + q).slice(-2);
//         var stringaCondizione = '2018-01-' + formattedNumber;
//         arProvaaa.push(stringaCondizione);
//       }
//       console.log(arProvaaa);
//
//       for (var k = 1; k <= 31; k++) {
//
//         var formattedNumber = ("0" + k).slice(-2);
//         var stringaCondizione = '2018-01-' + formattedNumber;
//
//         // check if (dateCondizione == stringaCondizione) and if (dateCondizione ==)
//         // se true appendere il nome del festivo corrispondente al date
//
//
//         for (var p = 0; p < arFesta.length; p++) {
//           if (arFesta[p]['date'] == stringaCondizione){
//             // array.push();
//             targetGen.append(compiledGen({
//               date: 'Festa',
//               name: arFesta[p]['name']
//             }));
//           }
//         }
//
//         targetGen.append(compiledGen({
//           date: stringaCondizione
//         }));
//
//         // console.log(formattedNumber);
//         }
//
//
//
//
//     },
//
//     error: function (request, state, error){
//       console.log('error!');
//       console.log(request);
//       console.log(state);
//       console.log(error);
//     }
//   });
//
// }
// getCalendar2018();
// ************************************************

// var m = moment().day(); // gives 4 for thursday
// var d = moment().day(0); //shows sunday
// var a = moment().day('Monday'); //set the day of week to monday
// var k = moment().day(10); //since it greater than 0-6 it sets to the next week and outputs Wed.
// var o = moment().day(-5); // since the value is -ve it will set for last week



$(document).ready(init);

function init(){
  var myRightButton = $('#button-right');
  var myLeftButton = $('#button-left');

  var currentMonths = moment('2018-01-01');
  var currentMonth = currentMonths.month(0);
  printMonth(currentMonth);
  printHoliday(currentMonth);
  $('#currentYM').html(currentMonths.format('YYYY MMMM'));

  var j = 0;
  myRightButton.click(function (){
  j += 1;
  currentMonths.month(j);
  $('#currentYM').html(currentMonths.format('YYYY MMMM'));
  // console.log(currentMonth);
  printMonth(currentMonth);
  printHoliday(currentMonth);

  if (currentMonths.year() != 2018) {
    currentMonths.year(2018);
  }
  });

  myLeftButton.click(function (){
    j -= 1;
  currentMonths.month(j);
  $('#currentYM').html(currentMonths.format('YYYY MMMM'));
  // console.log(currentMonth);
  printMonth(currentMonth);
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
    // var momObj = moment({
    //   days:i,
    // });

    // var dayssHTML = compiledWeek({
    //   dataday: i,
    //   dayname: momObj.format('dddd')
    // });
    // targetWeek.append(dayssHTML);
    targetWeek.append(compiledWeek({
      dataday: i,
      dayname: weekTxt
    }));

  }
}
// ******************************************************************



function printMonth(currentMonth){
  var daysInMonth = currentMonth.daysInMonth();
  var templateGen = $('#template-gen').html();
  var compiledGen = Handlebars.compile(templateGen);
  var targetGen = $('#my-month-new');
  targetGen.html('');

  // ******************************************************************


  for (var i = 1; i <= daysInMonth; i++) {
    var momObj = moment({
      years:currentMonth.year(),
      months:currentMonth.month(),
      days:i
    });
    // console.log(momObj);

    var daysHTML = compiledGen({
      value: i,
      datecomplete: momObj.format('YYYY-MM-DD'),
      dataday: momObj.format('d')
    });
    targetGen.append(daysHTML);

  }
}

function printHoliday(currentMonth){
  var myYear = currentMonth.year();
  var myMonth = currentMonth.month();
  console.log(myYear, myMonth);
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
          console.log(holiDD);
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
