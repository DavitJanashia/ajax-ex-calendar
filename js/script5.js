$(document).ready(init);

function init(){

}
// *****************************************************************************
// // handlebar template
function myAll (){
  var template = $('#template').html();
  var compiled = Handlebars.compile(template);
  var targetD = $('#my-day');
  var targetM = $('#my-month');
  var targetY = $('#my-year');

  // *****************************************************************************
  // days
  for (var i = 1; i <= 31; i++) {

    var optHtml = compiled({
      'value': i,
      'valueTxt': i
    });
    targetD.append(optHtml);
  }

  // *****************************************************************************
  // month
  var myMonths = moment.months(); // restituisce un array di mesi

  console.log(myMonths);


  for (var i = 1; i <= 12; i++) {

    var optHtml = compiled({
      'value': i,
      'valueTxt': myMonths[i - 1]
    });
    targetM.append(optHtml);
  }

  // *****************************************************************************
  // year

  for (var i = 1980; i <= 2020; i++) {

    var optHtml = compiled({
      'value': i,
      'valueTxt': i
    });
    targetY.append(optHtml);
  }


  // target deve diventare  un array quindi usiamo questo

  var myOpt = $('.my-opt');
  for (var j = 0; j < 31; j++) {
  }
}

myAll ();

// snack 3

// Dopo aver popolato le select, creare un bottone. L'utente sceglierà una data tramite le select e farà click sul bottone.
// Al click controlliamo che la data sia valida. 31 Febbraio ad esempio non è una data valida (aiutiamoci con Moment)


var btnn = $('#my-btnn');



btnn.click(function(){

  var targetD = $('#my-day');
  var targetM = $('#my-month');
  var targetY = $('#my-year');

  var day = targetD.val();
  var month = targetM.val();
  var year = targetY.val();


  if (month == 2){
    console.log('ciao');
  }
});




$('#my-btnn-prova').click(function () {
  var valueDay = $('#my-day').val();
  var valueMonth = $('#my-month').val();
  var valueYear = $('#my-year').val();

  var mom = moment("'" + valueMonth + "/" + valueDay + "/" + valueYear + "'", 'MM/DD/YYYY').format('ddd DD MMMM YYYY');
  console.log("'" + valueMonth + "/" + valueDay + "/" + valueYear + "'");

  console.log(mom);
});
// ********************************************************
// Ajax.function

function getCalendar2018(){
  $.ajax({

    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',
    data: {
      'month': 0,
      'year': 2018
    },
    success: function (data, state){
      // console.log(data); // oggetto con le festivita
      var arFesta = data['response'];
      console.log(arFesta);
      // ********************************************************
      // mese di gennaio
      var templateGen = $('#template-gen').html();
      // console.log(templateGen);
      var compiledGen = Handlebars.compile(templateGen);
      var targetGen = $('#my-january');

      console.log(arFesta[0]['date'], arFesta[1]['date']);

      var myArFesta = [];
      for (var l = 0; l < arFesta.length; l++) {
        myArFesta.push(arFesta[l]['date']);
      }





      // console.log(myArFesta);
      var dateCondizione = arFesta[0]['date'];


      for (var k = 01; k <= 31; k++) {


        var formattedNumber = ("0" + k).slice(-2);
        var stringaCondizione = '2018-01-' + formattedNumber;
        // console.log(formattedNumber);
        if (myArFesta.includes(stringaCondizione)){
          targetGen.append(compiledGen({
            date: 'Festa'
          }));
        } else {
          targetGen.append(compiledGen({
            date: stringaCondizione
          }));

        }

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
getCalendar2018();



// collegare al calendario del 2018



//

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
// Giovanni Cappelletti:boolean:  1:16 PM
// PARAMS:
// year: 2018
// month: 0 ~ 11
