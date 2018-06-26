// Variables

// dateNow: Date 객체. 출력되어 있는 날짜 정보를 담고 있음.
// menu: dateNow의 메뉴 정보를 담고 있는 객체.

let currentMealInfo = {date: new Date(), menu: new Object()};
updateMenu();

document.getElementById("button-yesterday").addEventListener("click", onClickYesterday);
document.getElementById("button-tomorrow").addEventListener("click", onClickTomorrow);
document.getElementById("button-size").addEventListener("click", onClickSize);

getFontSizeFromChromeLocalStorage(function(fontSize) {
    changeFontSize(fontSize);
    changeFontSizeButtonText(fontSize);
});

function updateMenu() {
    getMenuFromAPI(currentMealInfo.date, function(menu) {
        currentMealInfo.menu = menu;
        printMenu();
    });
}

function getMenuFromAPI(menuDate, callback) {
    let year = menuDate.getFullYear().toString();
    let month = (menuDate.getMonth() + 1).toString();
    let date = menuDate.getDate().toString();

    month = month.length == 1 ? "0" + month : month;
    date = date.length == 1 ? "0" + date : date;

    let url = `http://dsm2015.cafe24.com/meal/${year}-${month}-${date}`;

    axios.get(url)
    .then(response => {
        menu = JSON.parse(JSON.stringify(response.data));
        callback(menu);
    })
    .catch(err => {
        console.log(err);
    })
}

function printMenu() {
    let month = (currentMealInfo.date.getMonth() + 1).toString();
    let date = currentMealInfo.date.getDate().toString();
    let day = ['일', '월', '화', '수', '목', '금', '토'][currentMealInfo.date.getDay()];

    document.getElementById("date").innerHTML = `${month}월 ${date}일 ${day}요일`;

    let breakfast = document.getElementById("breakfast").getElementsByClassName("menu-list")[0];
    let lunch = document.getElementById("lunch").getElementsByClassName("menu-list")[0];
    let dinner = document.getElementById("dinner").getElementsByClassName("menu-list")[0];

    breakfast.innerHTML = "";
    lunch.innerHTML = "";
    dinner.innerHTML = "";

    for (item of currentMealInfo.menu.breakfast) {
        breakfast.innerHTML += '<li><span class="text">' + item + '</span></li>';
    }

    for (item of currentMealInfo.menu.lunch) {
        lunch.innerHTML += '<li><span class="text">' + item + '</span></li>';
    }

    for (item of currentMealInfo.menu.dinner) {
        dinner.innerHTML += '<li><span class="text">' + item + '</span></li>';
    }
}

function onClickYesterday() {
    currentMealInfo.date.setDate(currentMealInfo.date.getDate() - 1);
    updateMenu();
}

function onClickTomorrow() {
    currentMealInfo.date.setDate(currentMealInfo.date.getDate() + 1);
    updateMenu();
}

function onClickSize() {
    getFontSizeFromChromeLocalStorage(function(fontSize) {
        let newFontSize = getLargerFontSize(fontSize);
        setFontSizeToChromeLocalStorage(newFontSize, function(fontSize) {
            changeFontSize(fontSize);
            changeFontSizeButtonText(fontSize);
        });
    });
}

function getFontSizeFromChromeLocalStorage(callback) {
    chrome.storage.local.get("fontSize", function(items) {
        if(items.fontSize === undefined) {
            setFontSizeToChromeLocalStorage("12px", callback);
        } else {
            callback(items.fontSize);
        }
    });
}

function setFontSizeToChromeLocalStorage(value, callback) {
    chrome.storage.local.set({fontSize: value}, function() {
        callback(value);
    });
}

function changeFontSize(fontSize) {
    document.getElementsByTagName("html")[0].style.fontSize = fontSize;
}

function changeFontSizeButtonText(fontSize) {
    document.getElementById("button-size").innerHTML = fontSize;
}

function getLargerFontSize(fontSize) {
    let newFontSize;
    switch(fontSize) {
        case "8px": newFontSize = "12px"; break;
        case "12px": newFontSize = "16px"; break;
        case "16px": newFontSize = "8px"; break;
    }
    return newFontSize;
}