let comcat;
const comlist = document.getElementsByClassName('comlist');

function changeDiv(category) {
  switch (category) {
    case "system": comcat = "system"; break;
    case "moderation": comcat = "moderation"; break;
    case "entertainment": comcat = "entertainment"; break;
    case "utility": comcat = "utility"; break;
    case "leveling": comcat = "leveling";
  }

  for (let i = 0; i < comlist.length; i++) {
    comlist[i].style.display = "none";
  }
  document.getElementById(comcat).style.display = "grid";
}