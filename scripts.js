document.addEventListener("DOMContentLoaded", () => {
  generateTiles("numbers", getRandomInt);
  generateTiles("dates", getRandomDate);
  generateTiles("math", getRandomInt);
});

function generateTiles(sectionId, generatorFunction) {
  const container = document.getElementById(`${sectionId}-tiles`);
  for (let i = 0; i < 8; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = generatorFunction();
    tile.addEventListener("click", () =>
      displayFact(tile.textContent, sectionId)
    );
    container.appendChild(tile);
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 100) + 1;
}

function getRandomDate() {
  const day = Math.floor(Math.random() * 28) + 1;
  const month = Math.floor(Math.random() * 12) + 1;
  return `${month}/${day}`;
}

function displayFact(value, type) {
  let queryType = "trivia";

  if (type === "math") {
    queryType = "math";
  } else if (type === "dates") {
    queryType = "date";
  }

  fetch(`http://numbersapi.com/${value}/${queryType}`)
    .then((response) => response.text())
    .then((data) => showPopup(data));
}

function showPopup(text, color = "#000") {
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");
  popupContent.textContent = text;
  popup.style.display = "flex";
  popup.style.color = color;
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

function getNumberFact() {
  const input = document.getElementById("number-input").value;
  if (Number(input) < 1) {
    return showPopup("Надо ввести число  больше нуля.", "red");
  } else if (input) {
    fetch(`http://numbersapi.com/${input}/trivia`)
      .then((response) => response.text())
      .then((data) => showPopup(data));
  }
}

function getDateFact() {
  const input = new Date(document.getElementById("date-input").value);
  const month = input.getMonth() + 1;
  const day = input.getDate();
  if (month && day) {
    fetch(`http://numbersapi.com/${month}/${day}/date`)
      .then((response) => response.text())
      .then((data) => showPopup(data));
  }
}

function getMathFact() {
  const input = document.getElementById("math-input").value;
  if (Number(input) < 1) {
    return showPopup("Надо ввести число больше нуля.", "red");
  } else if (input) {
    fetch(`http://numbersapi.com/${input}/math`)
      .then((response) => response.text())
      .then((data) => showPopup(data));
  }
}
