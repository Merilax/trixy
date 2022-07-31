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