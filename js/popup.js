
let currentMealInfo = {date: new Date(), menu: new Object()};

document.getElementById("button-yesterday").addEventListener("click", onClickYesterday);
document.getElementById("button-tomorrow").addEventListener("click", onClickTomorrow);

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
