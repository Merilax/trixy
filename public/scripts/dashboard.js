// Swap Personal and Guild configs

let thisConfig;
const conflist = document.getElementsByClassName('conf');

function selectThis(selected) {
    switch (selected) {
        case "personal": thisConfig = "pconf"; break;
        case "guild": thisConfig = "gconf";
    }

    for (let i = 0; i < 2; i++) {
        conflist[i].style.display = "none";
    }
    document.getElementById(thisConfig).style.display = "flex";
}

// Swap Guild config modules

let thisModule;
const modlist = document.getElementsByClassName('module');

function changeModule(selected) {
    switch (selected) {
        case "system": thisModule = "system"; break;
        case "leveling": thisModule = "leveling";
    }

    for (let i = 0; i < 2; i++) {
        modlist[i].style.display = "none";
    }
    document.getElementById(thisModule).style.display = "flex";
    document.getElementById("gconf2").style.display = "flex";
}

function updateDB(inputType) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/dbupdate', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) { }
    };
    try {
        var param = document.getElementById(inputType).value
    } catch (e) {
        var param = "reset";
    }
    xhr.send(`edit=${inputType}&value=${param}`);
}