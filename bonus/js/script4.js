// console.log('Inizio script');
//
//   // BONUS: (da fare solo se funziona tutto il resto)
//   // all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
//   // con difficoltà 0 => tra 1 e 100
//   // con difficoltà 1 =>  tra 1 e 80
//   // con difficoltà 2 => tra 1 e 50
//   //
// var maxBombe = 16;
// var maxTentativi;
// var numMax;
// var numMin = 1;
//
// var difficola = prompt('Scegli difficolta: 0, 1, 2')
// switch (difficola) {
//   case "0":
//     numMax = 100;
//     break;
//   case "1":
//     numMax = 80;
//     break;
//   case "2":
//     numMax = 50;
//     break;
//   default:
//     numMax = 100;
// }
//
// maxTentativi = numMax - maxBombe;
//
//
// var bombe = generaBombe(maxBombe, numMin, numMax);
// avviaGioco(bombe, maxTentativi, numMin, numMax);
//
// console.log('Fine script');
//
// --------------------------- FUNCTIONS Avvio --------------------------- //
// function generaBombe(maxBombe, numMin, numMax) {
//   // Il computer deve generare 16 numeri casuali tra 1 e 100.
//   // I numeri non possono essere duplicati
//   var arrayBombe = [];
//   var maxBombe = 16;
//
//   // devo generare 16 numeri ma non devono esserci doppioni
//   while (arrayBombe.length < maxBombe) {
//     var bomba = getRandom(numMin, numMax);
//     if(inArray(arrayBombe, bomba) != true) {
//       arrayBombe.push(bomba);
//     }
//   }
//   console.log('Bombe generate', arrayBombe);
//
//   return arrayBombe;
// }
//
// function avviaGioco (arrayBombe, maxTentativi, numMin, numMax) {
//   // In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
//   // L’utente non può inserire più volte lo stesso numero.
//   console.log(numMin, numMax);
//   var arrayUtente = [];
//   var punti = 0;
//   var i = 0;
//
//   //l'utente inserisce dei numeri fino al massimo consentito o fino a quando non inserisce una mina
//   // La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
//   var trovato = false;
//   while (arrayUtente.length < maxTentativi && trovato == false) {
//     var numero = parseInt(prompt('Inserisci un numero'));
//     // se il numero e nel range allora controllo se e in bombe
//     // se non e in bombe allora lo pusho nel mio array
//     //
//     if(isInRange(numMin, numMax, numero) == false) {
//       alert('Non hai inserito un numero corretto');
//     }
//     else if(inArray(arrayUtente, numero) == true) {
//       alert('Lo hai gia inserito');
//     }
//     else if(inArray(arrayBombe, numero) == true) {
//       console.log('Hai perso');
//       trovato = true;
//     } else {
//       arrayUtente.push(numero);
//       punti++;
//     }
//     //
//     // if(isInRange(1, 100, numero) == true && inArray(arrayBombe, numero) == false && inArray(arrayUtente, numero) == false) {
//     //   arrayUtente.push(numero);
//     //   punti++;
//     // }
//
//     // Se il numero è presente nella lista dei numeri generati, la partita termina,
//     // if(inArray(arrayBombe, numero)) {
//     //   console.log('Hai perso');
//     //   trovato = true;
//     // }
//     // altrimenti si continua chiedendo all’utente un altro numero.
//   }
//
//   // Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
//   if (punti == maxTentativi) {
//     console.log('hai vinto');
//   }
//
//   console.log('arrayUtente', arrayUtente);
//   console.log('punti', punti);
//
// }

// --------------------------- FUNCTIONS Utility --------------------------- //
function inArray (array, elemento) {
  var i = 0;
  var trovato = false;
  // questo ciclo si deve interompere se raggiungo la lunghezza dell'array oppure se trovo coorispondenza
  while (i < array.length && trovato == false) {
    if(array[i] == elemento) {
      trovato = true;
    }
    i++
  }
  return trovato;
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}



function isInRange(min, max, num) {
  //l-utente non puo inserire elementi che non siano numeri e che non siano nel range giusto
  if(num >= min && num <= max && !isNaN(num)) {
    return true;
  }
  return false;
}
// --------------------------- Snack 1 --------------------------- //
var num = parseInt(prompt('Inserisci un numero'));


for (var i = 0; i < num; i++) {
   var numeroCasuale = Math.floor(Math.random()*100);
   var nomeAr = [generaBombe(10, 1, 100)];
   console.log(nomeAr);
}



function generaBombe(maxBombe, numMin, numMax) {
  // Il computer deve generare 16 numeri casuali tra 1 e 100.
  // I numeri non possono essere duplicati
  var arrayBombe = [];
  var maxBombe = 10;

  // devo generare 16 numeri ma non devono esserci doppioni
  while (arrayBombe.length < maxBombe) {
    var bomba = getRandom(numMin, numMax);
    if(inArray(arrayBombe, bomba) != true) {
      arrayBombe.push(bomba);
    }
  }

  return arrayBombe;
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

function inArray (array, elemento) {
  var i = 0;
  var trovato = false;
  // questo ciclo si deve interompere se raggiungo la lunghezza dell'array oppure se trovo coorispondenza
  while (i < array.length && trovato == false) {
    if(array[i] == elemento) {
      trovato = true;
    }
    i++
  }
  return trovato;
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}
