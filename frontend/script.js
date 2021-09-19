// THEME

let theme = localStorage.getItem('theme');
let site = "./theme/";
const thisFolderIs = document.getElementsByClassName('this-folder-is').item(0).id;

function setFolder() {
  switch (thisFolderIs) {
    case "index": return "./theme/";
    case "sites/commands/":
    case "sites/legal/": return "../../theme/";
  }
}
const thisFolder = setFolder(); 

function setTheme(th) {
  if (th == 'light') {
    document.getElementById('switch-css').href = thisFolder + "dark.css"
  } else if (th == 'dark') {
    document.getElementById('switch-css').href = thisFolder + "light.css"
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
    document.getElementById('switch-css').href = thisFolder + "dark.css"
  } else if (theme == 'dark') {
    localStorage.setItem('theme', 'light');
    document.getElementById('switch-css').href = thisFolder + "light.css"
  }
  location.reload();
}



// SITES/COMMANDS

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