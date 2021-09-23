// THEME

let theme = localStorage.getItem('theme');

function setTheme(th) {
  if (th == 'light') {
    document.getElementById('switch-css').href = "/dark.css";
  } else if (th == 'dark') {
    document.getElementById('switch-css').href = "/light.css";
  }
}

if (theme == null) {
  localStorage.setItem('theme', 'light');
} else {
  setTheme(theme);
}

function swapTheme() {
  if (theme == 'light') {
    localStorage.setItem('theme', 'dark');
    document.getElementById('switch-css').href = "/dark.css";
  } else if (theme == 'dark') {
    localStorage.setItem('theme', 'light');
    document.getElementById('switch-css').href = "/light.css";
  }
  location.reload();
}



// COMMANDS

let comcat;
const comlist = document.getElementsByClassName('comlist');

function changeDiv(category) {
  switch (category) {
    case "system": comcat = "system"; break;
    case "moderation": comcat = "moderation"; break;
    case "entertainment": comcat = "entertainment"; break;
    case "utility": comcat = "utility"; break;
    case "music": comcat = "music"; break;
    case "leveling": comcat = "leveling";
  }

  for (let i = 0; i < comlist.length; i++) {
    comlist[i].style.display = "none";
  }
  document.getElementById(comcat).style.display = "grid";
}