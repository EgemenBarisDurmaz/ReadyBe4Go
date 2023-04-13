async function saveSettings() {
    userEmail = localStorage.getItem("email")
    var name = document.getElementById("name").placeholder
    if (document.getElementById("name").value) {
        name = document.getElementById("name").value
    }
    var surname = document.getElementById("surname").placeholder
    if (document.getElementById("surname").value) {
        surname = document.getElementById("surname").value
    }

    var email = document.getElementById("email").placeholder
    if (document.getElementById("email").value) {
        email = document.getElementById("email").value
    }

    var phone = document.getElementById("phone").placeholder
    if (document.getElementById("phone").value) {
        phone = document.getElementById("phone").value
    }

    var hes = document.getElementById("hes").placeholder
    if (document.getElementById("hes").value) {
        hes = document.getElementById("hes").value
    }

    var city = document.getElementById("city").placeholder
    if (document.getElementById("city").value) {
        city = document.getElementById("city").value
    }

    var address = document.getElementById("address").placeholder
    if (document.getElementById("address").value) {
        address = document.getElementById("address").value
    }

    var cardNum = document.getElementById("cardNum").placeholder
    if (document.getElementById("cardNum").value) {
        cardNum = document.getElementById("cardNum").value
    }

    var cardOwn = document.getElementById("cardOwn").placeholder
    if (document.getElementById("cardOwn").value) {
        cardOwn = document.getElementById("cardOwn").value
    }

    var cvc = document.getElementById("cvc").placeholder
    if (document.getElementById("cvc").value) {
        cvc = document.getElementById("cvc").value
    }

    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/userSettingsSave?EMAIL=${userEmail}&NAME=${name.toUpperCase()}&SURNAME=${surname.toUpperCase()}&PHONE=${phone}&HES=${hes}&CITY=${city}&ADDRESS=${address}&CARD=${cardNum}&EMAIL=${email}&CVC=${cvc}&CARD-OWNER=${cardOwn}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json();
    console.log(data)
    location.reload();
}

async function getSettings() {
    userEmail = localStorage.getItem("email")
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/userSettings?email=${userEmail}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json();

    data = data[0]
    console.log(data)
    document.getElementById("name").value = data["NAME"].toUpperCase()
    document.getElementById("surname").value = data["SURNAME"].toUpperCase()
    document.getElementById("email").value = data["EMAIL"].toUpperCase()
    document.getElementById("phone").value = data["PHONE"].toUpperCase()
    document.getElementById("hes").value = data["HES"].toUpperCase()
    document.getElementById("address").value = data["ADDRESS"].toUpperCase()
    document.getElementById("cardNum").value = data["CARD"].toUpperCase()
    document.getElementById("cardOwn").value = data["CARD-OWNER"].toUpperCase()
    document.getElementById("cvc").value = data["CVC"].toUpperCase()
}

getSettings()