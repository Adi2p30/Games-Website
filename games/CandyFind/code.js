var Score;
var Score = 0;
onEvent("INSTRUCTIONSBU", "click", function (event) {
  console.log("button1 clicked!");
  setScreen("Worlds");
});
onEvent("PLAYBU", "click", function (event) {
  console.log("button2 clicked!");
  setScreen("Insructions");
});
onEvent("THECANDYIM", "click", function (event) {
  console.log("THECANDYIM clicked!");
  Score = Score + 1;
  setText("SCORELB", Score);
  if (Score >= 10) {
    setScreen("WinScreen");
  }
  setPosition(
    "THECANDYIM",
    randomNumber(0, 300),
    randomNumber(1, 350),
    41,
    110
  );
});

onEvent("CLUSTERBG", "click", function (event) {
  console.log("CLUSTERBG clicked!");
  setScreen("LoseScreen");
});
onEvent("button2", "click", function (event) {
  console.log("button2 clicked!");
  setScreen("Insructions");
  Score = 0;
});
onEvent("LoseScreen", "click", function (event) {
  console.log("LoseScreen clicked!");
  setScreen("Insructions");
  Score = 0;
});
onEvent("button1", "click", function (event) {
  console.log("button1 clicked!");
  setScreen("GameScreen");
});
function Reset() {
  textLabel("SCORELB", "text");
}
