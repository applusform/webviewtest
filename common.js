var printLogTime = true;

function log(text) {
    addLog();
    var date = new Date();
    var timeStamp = "";
    if (printLogTime) {
        timeStamp = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) + "." + ("00" + date.getMilliseconds()).slice(-3);
    }
    document.getElementById("status").innerHTML = document.getElementById("status").innerHTML + timeStamp + "&nbsp;&nbsp;&nbsp; " + text + "<br/>";
}

var headerAdded = false;
function addHeader() {
    if (headerAdded)
        return;
    headerAdded = true;

    var bodyText = document.body.innerHTML;
    var header = '<h3> <a href="javascript:history.go(-1)" style="text-decoration:none;font-size:1.5em">&#x2039;&nbsp;&nbsp;</a> &nbsp;&nbsp;' + document.title + '</h3><hr />';

    document.body.innerHTML = header + bodyText;
}

var logAdded = false;
function addLog() {
    if (logAdded)
        return;
    logAdded = true;
    var div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = '<div>Log :</div><div style="background:black;margin-top:0;"><span id="status" style="font-size:11px;10px;color:#80f080;background:black;"></div></p>';

}

function processPassFailButton() {
    var tags = document.getElementsByClassName("passFail");

    for (var i = 0; i < tags.length; ++i) {
        var element = tags[i];
        var id = element.id;

        element.addEventListener("click", function (e) {
            changePassFailStatus(e.target);
        });
        updatePassFailStatus(id);
    }
}

function changePassFailStatus(element) {
    if (!localStorage)
        return;

    var passFail = localStorage.getItem(element.id);
    if (passFail == "PASS") {
        passFail = "FAIL";
    } else if (passFail == "FAIL") {
        passFail = "NA";
    } else if (passFail == "NA") {
        passFail = "NT";
    } else {
        passFail = "PASS";
    }
    localStorage.setItem(element.id, passFail);
    updatePassFailStatus(element.id)
}

function setAutoTest(id) {
    var passFail = localStorage.getItem(id);
    if (passFail == null) {
        localStorage.setItem(id, "AUTO");
        updatePassFailStatus(id);
    }
}

function setAutoTestResult(id, result) {
    var passFail = localStorage.getItem(id);
    if (passFail == "AUTO" || passFail == null) {
        localStorage.setItem(id, result);
        updatePassFailStatus(id);
    }
}

function isAndroid() {
    if (navigator.userAgent.indexOf("Android") >= 0)
        return true;
    return false;
}

var isAndroid = navigator.userAgent.indexOf("Android") >= 0;
var isiOS = navigator.userAgent.indexOf("iPhone") >= 0 || navigator.userAgent.indexOf("iPad") >= 0 || navigator.userAgent.indexOf("iPod") >= 0;

function getAndroidVersion() {
    var ua = navigator.userAgent.toLowerCase();
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? match[1] : 0;
};

var androidVersion = parseFloat(getAndroidVersion());

function getDefault(id) {
    if (id == "A04" || id == "A06" || id == "A05") {
        if (isiOS)
            return "NA";
    } else if (id == "A07") {
        if (isAndroid)
            return "NA";
    } else if (id == "H01") {
        if (isiOS)
            return "NA";
    } else if (id == "I01") {
        if (isiOS)
            return "NA";
    }

}

function updatePassFailStatus(id) {
    if (!localStorage)
        return;

    var passFail = "NT";
    var element = document.getElementById(id);
    if (element != null) {
        passFail = localStorage.getItem(id);
        if (passFail == null) {
            passFail = getDefault(id);
            if (passFail != null) {
                localStorage.setItem(id, passFail);
            }
        }
        if (passFail == "PASS") {
            element.innerHTML = "PASS";
            element.style.background = "#a0ff80";
        } else if (passFail == "FAIL") {
            element.innerHTML = "FAIL";
            element.style.background = "#ffa0a0";
        } else if (passFail == "NA") {
            element.innerHTML = "N/A";
            element.style.background = "#a0a0a0";
        } else if (passFail == "AUTO") {
            element.innerHTML = "AUTO";
            element.style.background = "#ffff80";
        } else {
            element.innerHTML = "N/T";
            element.style.background = "#ffffa0";
        }
    }
}

function onDOMContentLoaded() {
    if (!document.useCustomHeader)
        addHeader();

    if (typeof (test) == "function") {
        window.setTimeout(function () {
            test();
        }, 700);
    }

    processPassFailButton();

    if (typeof (onInit) == "function") {
        onInit();
    }

}

//window.addEventListener('load', wrapBody, false)
document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

