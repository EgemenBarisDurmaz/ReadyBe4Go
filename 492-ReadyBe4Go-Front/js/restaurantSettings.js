var settings=""
async function saveSettings() {
    userEmail = localStorage.getItem("email")
    var name = document.getElementById("name").placeholder
    if (document.getElementById("name").value) {
        name = document.getElementById("name").value
    }

    var email = document.getElementById("email").placeholder
    if (document.getElementById("email").value) {
        email = document.getElementById("email").value
    }

    var phone = document.getElementById("phone").placeholder
    if (document.getElementById("phone").value) {
        phone = document.getElementById("phone").value
    }

    var city = document.getElementById("city").placeholder
    if (document.getElementById("city").value) {
        city = document.getElementById("city").value
    }

    var address = document.getElementById("address").placeholder
    if (document.getElementById("address").value) {
        address = document.getElementById("address").value
    }

    var description = document.getElementById("description").placeholder
    if (document.getElementById("description").value) {
        description = document.getElementById("description").value
    }

    var amount = document.getElementById("amount").placeholder
    if (document.getElementById("amount").value) {
        amount = document.getElementById("amount").value
    }
    var times = {}
    times["10:00-11:00"] = document.getElementById("time1").placeholder
    times["11:00-12:00"] = document.getElementById("time2").placeholder
    times["12:00-13:00"] = document.getElementById("time3").placeholder
    times["13:00-14:00"] = document.getElementById("time4").placeholder
    times["14:00-15:00"] = document.getElementById("time5").placeholder
    times["15:00-16:00"] = document.getElementById("time6").placeholder
    times["16:00-17:00"] = document.getElementById("time7").placeholder
    times["17:00-18:00"] = document.getElementById("time8").placeholder
    times["18:00-19:00"] = document.getElementById("time9").placeholder
    times["19:00-20:00"] = document.getElementById("time10").placeholder
    times["20:00-21:00"] = document.getElementById("time11").placeholder
    times["21:00-22:00"] = document.getElementById("time12").placeholder
    times["22:00-23:00"] = document.getElementById("time13").placeholder
    times["23:00-24:00"] = document.getElementById("time14").placeholder

    if (document.getElementById("time1").value) {
        times["10:00-11:00"] = document.getElementById("time1").value
    }
    if (document.getElementById("time2").value) {
        times["11:00-12:00"] = document.getElementById("time2").value
    }
    if (document.getElementById("time3").value) {
        times["12:00-13:00"] = document.getElementById("time3").value
    }
    if (document.getElementById("time4").value) {
        times["13:00-14:00"] = document.getElementById("time4").value
    }
    if (document.getElementById("time5").value) {
        times["14:00-15:00"] = document.getElementById("time5").value
    }
    if (document.getElementById("time6").value) {
        times["15:00-16:00"] = document.getElementById("time6").value
    }
    if (document.getElementById("time7").value) {
        times["16:00-17:00"] = document.getElementById("time7").value
    }
    if (document.getElementById("time8").value) {
        times["17:00-18:00"] = document.getElementById("time8").value
    }
    if (document.getElementById("time9").value) {
        times["18:00-19:00"] = document.getElementById("time9").value
    }
    if (document.getElementById("time10").value) {
        times["19:00-20:00"] = document.getElementById("time10").value
    }
    if (document.getElementById("time11").value) {
        times["20:00-21:00"] = document.getElementById("time11").value
    }
    if (document.getElementById("time12").value) {
        times["21:00-22:00"] = document.getElementById("time12").value
    }
    if (document.getElementById("time13").value) {
        times["22:00-23:00"] = document.getElementById("time13").value
    }
    if (document.getElementById("time14").value) {
        times["23:00-24:00"] = document.getElementById("time14").value
    }
    console.log(times)
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/restaurantSettingsSave?TABLE_SIZE=${document.getElementById("table_size").value}&EMAIL=${userEmail}&NAME=${name.toUpperCase()}&PHONE=${phone}&CITY=${city}&ADDRESS=${address}&EMAIL=${email}&time1=${times["10:00-11:00"]}&time2=${times["11:00-12:00"]}&time3=${times["12:00-13:00"]}&time4=${times["13:00-14:00"]}&time5=${times["14:00-15:00"]}&time6=${times["15:00-16:00"]}&time7=${times["16:00-17:00"]}&time8=${times["17:00-18:00"]}&time9=${times["18:00-19:00"]}&time10=${times["19:00-20:00"]}&time11=${times["20:00-21:00"]}&time12=${times["21:00-22:00"]}&time13=${times["22:00-23:00"]}&time14=${times["23:00-24:00"]}&DESCRIPTION=${description}&AMOUNT=${amount}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json();
    console.log(data)
    location.reload();
}

async function getSettings() {
    userEmail = localStorage.getItem("email")
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/restaurantSettings?email=${userEmail}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json();
    settings=data

    data = data[0]
    console.log(data)
    document.getElementById("name").value = data["NAME"].toUpperCase()
    document.getElementById("email").value = data["EMAIL"].toUpperCase()
    document.getElementById("phone").value = data["PHONE"].toUpperCase()
    document.getElementById("address").value = data["ADDRESS"].toUpperCase()
    document.getElementById("description").value = data["DESCRIPTION"].toUpperCase()
    document.getElementById("amount").value = data["AMOUNT"].toUpperCase()
    document.getElementById("table_size").value = data["TABLE_SIZE"].toUpperCase()
    // console.log(data["RESERVATION_HOURS"]["10:00-11:00"])
    document.getElementById("time1").value = data["RESERVATION_HOURS"]["10:00-11:00"].toUpperCase()
    document.getElementById("time2").value = data["RESERVATION_HOURS"]["11:00-12:00"].toUpperCase()
    document.getElementById("time3").value = data["RESERVATION_HOURS"]["12:00-13:00"].toUpperCase()
    document.getElementById("time4").value = data["RESERVATION_HOURS"]["13:00-14:00"].toUpperCase()
    document.getElementById("time5").value = data["RESERVATION_HOURS"]["14:00-15:00"].toUpperCase()
    document.getElementById("time6").value = data["RESERVATION_HOURS"]["15:00-16:00"].toUpperCase()
    document.getElementById("time7").value = data["RESERVATION_HOURS"]["16:00-17:00"].toUpperCase()
    document.getElementById("time8").value = data["RESERVATION_HOURS"]["17:00-18:00"].toUpperCase()
    document.getElementById("time9").value = data["RESERVATION_HOURS"]["18:00-19:00"].toUpperCase()
    document.getElementById("time10").value = data["RESERVATION_HOURS"]["19:00-20:00"].toUpperCase()
    document.getElementById("time11").value = data["RESERVATION_HOURS"]["20:00-21:00"].toUpperCase()
    document.getElementById("time12").value = data["RESERVATION_HOURS"]["21:00-22:00"].toUpperCase()
    document.getElementById("time13").value = data["RESERVATION_HOURS"]["22:00-23:00"].toUpperCase()
    document.getElementById("time14").value = data["RESERVATION_HOURS"]["23:00-24:00"].toUpperCase()


}

getSettings()