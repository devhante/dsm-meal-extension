
document.getElementById("button-size").addEventListener("click", onClickSize);

getFontSizeFromChromeLocalStorage(function(fontSize) {
    changeFontSize(fontSize);
    changeFontSizeButtonText(fontSize);
});

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