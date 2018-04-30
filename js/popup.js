let $date = null;
let dateNow = null;
let menu = null;

$(document).ready(function() {
    $date = $("#date");
    dateNow = new Date();
    loadMenu(dateNow);

    $("#button-yesterday").click(function() {
        dateNow.setDate(dateNow.getDate() - 1);
        loadMenu(dateNow);
    });

    $("#button-tomorrow").click(function() {
        dateNow.setDate(dateNow.getDate() + 1);
        loadMenu(dateNow);
    });
});

const myDate = {
    getYear(dateObject) {
        return dateObject.getYear() + 1900;
    },
    getMonth(dateObject) {
        return dateObject.getMonth() + 1;
    },
    getDate(dateObject) {
        return dateObject.getDate();
    },
    getDay(dateObject) {
        let days = ['일', '월', '화', '수', '목', '금', '토'];
        return days[dateObject.getDay()];
    }
}

function loadMenu(dateObject) {
    let year = myDate.getYear(dateObject);
    let month = myDate.getMonth(dateObject).toString().length == 1 ? "0" + myDate.getMonth(dateObject) : myDate.getMonth(dateObject);
    let date = myDate.getDate(dateObject).toString().length == 1 ? "0" + myDate.getDate(dateObject) : myDate.getDate(dateObject);

    let menuUrl = `http://dsm2015.cafe24.com/meal/${year}-${month}-${date}`;

    axios.get(menuUrl)
    .then(response => {
        menu = JSON.parse(JSON.stringify(response.data));
        printMenu();
    })
    .catch(err => {
        console.log(err);
    })
}

function printMenu() {
    let month = myDate.getMonth(dateNow);
    let date = myDate.getDate(dateNow);
    let day = myDate.getDay(dateNow);

    let text = `${month}월 ${date}일 ${day}요일`;
    $date.text(text);

    let $breakfast = $("#breakfast .menu-list");
    let $lunch = $("#lunch .menu-list");
    let $dinner = $("#dinner .menu-list");

    $breakfast.html("");
    $lunch.html("");
    $dinner.html("");

    for (i of menu.breakfast) {
        $breakfast.append('<li><span class="text">' + i + '</span></li>');
    }

    for (i of menu.lunch) {
        $lunch.append('<li><span class="text">' + i + '</span></li>');
    }

    for (i of menu.dinner) {
        $dinner.append('<li><span class="text">' + i + '</span></li>');
    }
}