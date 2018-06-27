
updateMenu();

function updateMenu() {
    let menu = getMenuFromStorage(currentMealInfo.date);
    if(menu == null) {
        setMenuOfMonthToStorage(currentMealInfo.date);
        getMenuFromAPI(currentMealInfo.date, function(menu) {
            currentMealInfo.menu = menu;
            printMenu();
        });
    } else {
        currentMealInfo.menu = menu;
        printMenu();
    }
}

function setMenuOfMonthToStorage(date) {
    let dateKey = getFirstDayOfMonth(date);
    while(dateKey.getMonth() == date.getMonth()) {
        let dateObject = new Date(dateKey);
        getMenuFromAPI(dateObject, function(menu) {
            setMenuToStorage(dateObject, menu);
        });
        dateKey.setDate(dateKey.getDate() + 1);
    }
}

function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getMenuFromAPI(menuDate, callback) {
    let date = getYearMonthAndDate(menuDate);
    let url = `http://dsm2015.cafe24.com/meal/${date}`;

    axios.get(url)
    .then(response => {
        menu = JSON.parse(JSON.stringify(response.data));
        callback(menu);
    })
    .catch(err => {
        console.log(err);
    })
}

function getYearMonthAndDate(dateObject) {
    let year = dateObject.getFullYear().toString();
    let month = (dateObject.getMonth() + 1).toString();
    let date = dateObject.getDate().toString();

    month = month.length == 1 ? "0" + month : month;
    date = date.length == 1 ? "0" + date : date;

    return `${year}-${month}-${date}`;
}

function getMenuFromStorage(date) {
    let key = getYearMonthAndDate(date);
    let menu = JSON.parse(localStorage.getItem(key));
    return menu;
}

function setMenuToStorage(date, menu) {
    let key = getYearMonthAndDate(date);
    let value = JSON.stringify(menu);
    localStorage.setItem(key, value);
}

