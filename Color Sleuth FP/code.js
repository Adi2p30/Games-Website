var Player1 = 0;
var Player2 = 0;
var CurrPlay = 1;
var Red;
var green;
var blue;
var oddone = 0;
function Set_Board() {
  Red = randomNumber(1, 255);
  green = randomNumber(1, 255);
  blue = randomNumber(1, 255);
  setProperty("button1", "background-color", rgb(Red,green,blue));
  setProperty("button2", "background-color", rgb(Red,green,blue));
  setProperty("button3", "background-color", rgb(Red,green,blue));
  setProperty("button4", "background-color", rgb(Red,green,blue));
  oddone = randomNumber(1, 4);
  setProperty("button" + oddone, "background-color", rgb(Red + 25, green + 25, blue + 25));
}
function Checkanswer(Buttoncheck) {
  if (Buttoncheck == "button" + oddone) {
    if (CurrPlay == 1) {
      Player1 ++;
      setText("score1_label", Player1);
    } else {
      Player2 ++;
      setText("score2_label", Player2);
    }
  } else {
    if (CurrPlay==1) {
      Player1--
      setText("score1_label", Player1);
    } else {
      Player2--
      setText("score2_label", Player2);
    }
  }
}
Set_Board();
function Switchplayer() {
  if (CurrPlay == 1) {
    CurrPlay = 2;
    setProperty("player1_highlight", "hidden", true);
    setProperty("player2_highlight", "hidden", false);
  } else {
    CurrPlay = 1;
    setProperty("player1_highlight", "hidden", false);
    setProperty("player2_highlight", "hidden", true);
  }
}
onEvent("button1", "click", function( ) {
  Checkanswer("button1");
Switchplayer();
  Set_Board();
});
onEvent("button2", "click", function( ) {
  Checkanswer("button2");
  Switchplayer();
  Set_Board();
});
onEvent("button3", "click", function( ) {
  Checkanswer("button3");
  Switchplayer();
  Set_Board();
});
onEvent("button4", "click", function( ) {
  Checkanswer("button4");
  Switchplayer();
  Set_Board();
});
function Set_Board2() {
  Red = randomNumber(1, 255);
  green = randomNumber(1, 255);
  blue = randomNumber(1, 255);
  setProperty("button100", "background-color", rgb(Red,green,blue));
  setProperty("button101", "background-color", rgb(Red,green,blue));
  setProperty("button102", "background-color", rgb(Red,green,blue));
  setProperty("button103", "background-color", rgb(Red,green,blue));
  setProperty("button104", "background-color", rgb(Red,green,blue));
  setProperty("button105", "background-color", rgb(Red,green,blue));
  setProperty("button106", "background-color", rgb(Red,green,blue));
  setProperty("button107", "background-color", rgb(Red,green,blue));
  setProperty("button108", "background-color", rgb(Red,green,blue));
  oddone = randomNumber(100, 108);
  setProperty("button" + oddone, "background-color", rgb(Red + 25, green + 25, blue + 25));
}
function Checkanswer2(Buttoncheck) {
  if (Buttoncheck == "button" + oddone) {
    if (CurrPlay == 1) {
      Player1 ++;
      setText("label6", Player1);
    } else {
      Player2 ++;
      setText("label9", Player2);
    }
  } else {
    if (CurrPlay==1) {
      Player1--
      setText("label6", Player1);
    } else {
      Player2--
      setText("label9", Player2);
    }
  }
}
Set_Board();
function Switchplayer2() {
  if (CurrPlay == 1) {
    CurrPlay = 2;
    setProperty("firstlight", "hidden", true);
    setProperty("secondlight", "hidden", false);
  } else {
    CurrPlay = 1;
    setProperty("firstlight", "hidden", false);
    setProperty("secondlight", "hidden", true);
  }
}
onEvent("button100", "click", function( ) {
  Checkanswer2("button100");
Switchplayer2();
  Set_Board2();
});
onEvent("button101", "click", function( ) {
  Checkanswer2("button101");
  Switchplayer2();
  Set_Board2();
});
onEvent("button102", "click", function( ) {
  Checkanswer2("button102");
  Switchplayer2();
  Set_Board2();
});
onEvent("button103", "click", function( ) {
  Checkanswer2("button103");
  Switchplayer2();
  Set_Board2();
});
onEvent("button104", "click", function( ) {
  Checkanswer2("button104");
Switchplayer2();
  Set_Board2();
});
onEvent("button105", "click", function( ) {
  Checkanswer2("button105");
  Switchplayer2();
  Set_Board2();
});
onEvent("button106", "click", function( ) {
  Checkanswer2("button106");
  Switchplayer2();
  Set_Board2();
});
onEvent("button107", "click", function( ) {
  Checkanswer2("button107");
  Switchplayer2();
  Set_Board2();
});
onEvent("button108", "click", function( ) {
  Checkanswer2("button108");
  Switchplayer2();
  Set_Board2();
});
setScreen("screen1");
onEvent("button5", "click", function(event) {
  console.log("button5 clicked!");
  setScreen("screen2");
});
onEvent("button7", "click", function(event) {
  console.log("button5 clicked!");
  setScreen("gamePlay_screen");
});
onEvent("button8", "click", function(event) {
  console.log("button5 clicked!");
  Set_Board2();
  setScreen("screen3");
});
