var restaurants = {}
var reservationTime = ""
var minAmount = 0
var seats = 0
var carInfo = {}
var orderInfo = {}
var items = ""
var restaurantEmail = ""
var customerPhone = ""
var customerName = ""
var hes = ""
var selectedRestaurant=""
async function userInfo() {
    userEmail = localStorage.getItem("email")
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/user?email=${userEmail}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json();
    if (!localStorage.getItem("email") || !validateEmail(localStorage.getItem("email"))) {
        window.location.replace("/login.html");
    }
    console.log(data)
    console.log(window.location.href.split("/")[3])
    // document.getElementById("username").innerHTML = userEmail

    if (data[0]["ACCOUNT_TYPE"] == "Restaurant" && window.location.href.split("/")[3] == "user.html") {
        window.location.replace("/restaurant.html");
    }

    if (data[0]["ACCOUNT_TYPE"] == "User" && window.location.href.split("/")[3] == "restaurant.html") {
        window.location.replace("/user.html");
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function logout() {
    localStorage.setItem("email", "");
    window.location.replace("/login.html");
}

async function getSettings() {

    try {
        userEmail = localStorage.getItem("email")
        let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/userSettings?email=${userEmail}`;
        let response = await fetch(url, {
            credentials: 'include'
        });
        let data = await response.json();

        data = data[0]
        document.getElementById("name").innerHTML = data["NAME"].toUpperCase()
        console.log(data)
        customerPhone = data["PHONE"]
        customerName = data["NAME"] + " " + data["SURNAME"]
        hes = data["HES"]
        cardInfo = {
            "NUM": data["CARD"],
            "OWN": data["CARD-OWNER"],
            "CVC": data["CVC"]
        }
    } catch (error) {
        
    }

}

function showReservation() {
    document.getElementById("reservation").style.visibility = "visible"
    document.getElementById("reservation-arrow").style.visibility = "visible"
    document.getElementById("reservation-info").style.visibility = "hidden"

    document.getElementById("toReservation-btn").disabled = false
    document.getElementById("restaurantSelect").disabled = false
}

function showPayment() {
    document.getElementById("payment").disabled = false
    document.getElementById("payment").style.visibility = "visible"
}

function showTakeAway() {
    document.getElementById("reservation").style.visibility = "hidden"
    document.getElementById("reservation-arrow").style.visibility = "hidden"
    document.getElementById("reservation-info").style.visibility = "hidden"

}

async function selectRestaurant() {
    selectedRestaurant = document.getElementById("restaurantSelect").value
    if (selectedRestaurant != "Select Restaurant") {
        document.getElementById("reservation-info").style.visibility = "visible"
        document.getElementById("toReservation-btn").disabled = true
        document.getElementById("restaurantSelect").disabled = true
        document.getElementById("menu-card").style.pointerEvents = "none"
        document.getElementById("menu-card").style.opacity = "50%"
        document.getElementById("orders-card").style.pointerEvents = "none"
        document.getElementById("orders-card").style.opacity = "50%"
        selectedRestaurant = selectedRestaurant.split(' -')[0]

        

        for (const [key, value] of Object.entries(restaurants)) {
            if (value["NAME"] == selectedRestaurant) {
                console.log(value["TABLE_SIZE"])

                for (i=0;i<parseInt(value["TABLE_SIZE"]);i++){
                    document.getElementById("guestNumberSelect").innerHTML=document.getElementById("guestNumberSelect").innerHTML+`<option>${i+1}</option>`
                }

                minAmount = parseInt(value["AMOUNT"])
                document.getElementById("ordersHead").innerHTML = `BUCKET<span style="font-size:small; color:#DC3545;"><br>(min amount: ${value["AMOUNT"]}₺)`
                restaurantEmail = value["EMAIL"]
                var i = 100
                for (var [keyH, valueH] of Object.entries(value["RESERVATION_HOURS"])) {
                    i = i + 2
                    var disable = ""
                    var className = "timeTable"
                    var bgcolor = ""
                    var pointerEvents = ""
                    if (valueH == "0") {
                        valueH = "Full"
                        disable = "disabled"
                        className = ""
                        bgcolor = "background-color:#DC3545;"
                        pointerEvents = "pointer-events:none"
                    } else {
                        valueH = valueH + " Table Available"
                    }
                    var reservationhour = keyH.split(":")[0]
                    if (parseInt(reservationhour) < parseInt(new Date().getHours())) {
                        valueH = "Too Late"
                        disable = "disabled"
                        className = ""
                        bgcolor = "background-color:#dc354685;"
                        pointerEvents = "pointer-events:none"

                    }
                    document.getElementById("timeBody").innerHTML = document.getElementById("timeBody").innerHTML + `
                    <tr ${disable} style="cursor:pointer; ${bgcolor} ${pointerEvents}" class="${className}" onclick="selectReservationTime(this)">
                    <td >${keyH}</td>
                    <td style="padding:0px;">${valueH}</td>
                </tr>`
                }
            }
        }

        let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/getMenu?email=${restaurantEmail}`;
        let response = await fetch(url, {
            credentials: 'include'
        });
        let data = await response.json();
        for (const [key, value] of Object.entries(data)) {
            document.getElementById("menuBody").innerHTML = document.getElementById("menuBody").innerHTML + `
                <tr>
                <td>${value["FOOD_NAME"]}</td>
                <td>${value["FOOT_TYPE"]}</td>
                <td>${value["COOKING_TIME"]}</td>
                <td>${value["DESCRIPTION"]}</td>
                <td>${value["PRICE"]}₺</td>
                <td style="width: 30px; ">
                    <button type="button"
                        class="btn btn-block btn-info btn-sm" onclick="addOrder(this)">Add</button>
                </td>
            </tr>
            `
        }
    }
}
var totalPrice = 0;

function addOrder(self) {
    price = self.parentNode.parentNode.children[4].innerHTML

    counter=false
    for (i = 0 ;i<document.getElementById("orderBody").childElementCount;i++){
        if (document.getElementById("orderBody").children[i].children[0].innerHTML.split("x ")[1]==self.parentNode.parentNode.children[0].innerHTML){
            count = parseInt(document.getElementById("orderBody").children[i].children[0].innerHTML.split("x ")[0])+1
            document.getElementById("orderBody").children[i].children[0].innerHTML= count+"x "+self.parentNode.parentNode.children[0].innerHTML
            document.getElementById("orderBody").children[i].children[1].innerHTML= (parseInt(price)+parseInt(document.getElementById("orderBody").children[i].children[1].innerHTML.split("₺")[0]))+"₺"
            counter=true
            break
        }
    }
    if (counter==false){
        document.getElementById("orderBody").innerHTML = document.getElementById("orderBody").innerHTML + `
        <tr>
        <td>1x ${self.parentNode.parentNode.children[0].innerHTML}</td>
        <td style="padding-right:5px; padding-left:5px;">${price}</td>
        <td style="padding-right:0px; padding-left:0px;"><button type="button" class="btn btn-block btn-danger btn-xs" onclick="deleteOrder(this)">Drop</button></td>
        </tr>
    `
    }
    totalPrice = parseInt(price.split("₺")[0]) + totalPrice
    document.getElementById("orderNextBtn").innerHTML = `${seats} Seats at ${reservationTime} - ${totalPrice}₺ <i class="fas fa-chevron-right"></i>`
    orderInfo["price"] = totalPrice


}

function deleteOrder(self) {
    price = 0

    for (i = 0 ;i<document.getElementById("menuBody").childElementCount;i++){
        if (document.getElementById("menuBody").children[i].children[0].innerHTML==self.parentNode.parentNode.children[0].innerHTML.split("x ")[1]){
            price = document.getElementById("menuBody").children[i].children[4].innerHTML.split("₺")[0]
            break
        }
    }

    counter=false
    for (i = 0 ;i<document.getElementById("orderBody").childElementCount;i++){
        if (document.getElementById("orderBody").children[i].children[0].innerHTML.split("x ")[1]==self.parentNode.parentNode.children[0].innerHTML.split("x ")[1]){
            if (parseInt(document.getElementById("orderBody").children[i].children[0].innerHTML.split("x ")[0])>1){
                count = parseInt(document.getElementById("orderBody").children[i].children[0].innerHTML.split("x ")[0])-1
                document.getElementById("orderBody").children[i].children[0].innerHTML= count+"x "+self.parentNode.parentNode.children[0].innerHTML.split("x ")[1]
                document.getElementById("orderBody").children[i].children[1].innerHTML= (parseInt(document.getElementById("orderBody").children[i].children[1].innerHTML.split("₺")[0])-parseInt(price))+"₺"
                counter=true
                break
            }
        }
    }
    if (counter==false){
        self.parentNode.parentNode.remove()
    }
    
    totalPrice = totalPrice - price
    document.getElementById("orderNextBtn").innerHTML = `${seats} Seats at ${reservationTime} - ${totalPrice}₺ <i class="fas fa-chevron-right"></i>`
    orderInfo["price"] = totalPrice
}

async function renderRestaurants() {
    try {
        let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/getRestaurants`;
        let response = await fetch(url, {
            credentials: 'include'
        });
        let data = await response.json();
        restaurants = data
        var i = 1
        for (const [key, value] of Object.entries(data)) {
            i = i + 2
            var description = value["DESCRIPTION"]
            if (!description) {
                description = ""
            }
            document.getElementById("restaurantSelect").innerHTML =
                document.getElementById("restaurantSelect").innerHTML +
                `
                <option data-select2-id="${i}">${value["NAME"].toUpperCase()} - ${description}</option>
                `
        }
    } catch (error) {
        
    }

}

function selectReservationTime(self) {
    reservationTime = self.children[0].innerHTML
    seats = document.getElementById("guestNumberSelect").value
    self.style.backgroundColor = "grey"
    document.getElementById("orderNextBtn").innerHTML = `${seats} Seats at ${reservationTime} - ${totalPrice}₺ <i class="fas fa-chevron-right"></i>`
    document.getElementById("reservation-card").style.pointerEvents = "none"
    document.getElementById("reservation-card").style.opacity = "50%"
    document.getElementById("guest-card").style.pointerEvents = "none"
    document.getElementById("guest-card").style.opacity = "50%"
    document.getElementById("menu-card").style.pointerEvents = "auto"
    document.getElementById("menu-card").style.opacity = "100%"
    document.getElementById("orders-card").style.pointerEvents = "auto"
    document.getElementById("orders-card").style.opacity = "100%"
    orderInfo["time"] = reservationTime
    orderInfo["seats"] = seats

}

function toPayment() {
    if (minAmount < totalPrice) {

        console.log("Open Payment")
        document.getElementById("reservation-card").style.pointerEvents = "none"
        document.getElementById("reservation-card").style.opacity = "50%"
        document.getElementById("guest-card").style.pointerEvents = "none"
        document.getElementById("guest-card").style.opacity = "50%"
        document.getElementById("menu-card").style.pointerEvents = "none"
        document.getElementById("menu-card").style.opacity = "50%"
        document.getElementById("orders-card").style.pointerEvents = "none"
        document.getElementById("orders-card").style.opacity = "50%"
        document.getElementById("orderNextBtn").style.opacity = "50%"
        document.getElementById("orderNextBtn").style.pointerEvents = "none"
        showPayment()
        document.getElementById("hesCode").innerHTML = `
        <tr>
        <td>HES Code</td>
        <td>${hes}</td>
        </tr>
        `
        document.getElementById("creditBody").innerHTML = `
        <tr>
        <td>Credit Card Number</td>
        <td>${cardInfo["NUM"]}</td>
        </tr>
        <tr>
        <td>Card Owner</td>
        <td>${cardInfo["OWN"]}</td>
        </tr>
        <tr>
        <td>CVC</td>
        <td>${cardInfo["CVC"]}</td>
        </tr>
        `
        document.getElementById("infoBody").innerHTML = `
        <tr>
        <td>Total Price</td>
        <td>${orderInfo["price"]}₺</td>
        </tr>
        <tr>
        <td>Number of Guests</td>
        <td>${orderInfo["seats"]}</td>
        </tr>
        <tr>
        <td>Reservation Time</td>
        <td>Today - ${orderInfo["time"]}</td>
        </tr>
        `
    } else {
        document.getElementById("orderNextBtn").innerHTML = `Please Add More Order to Reach Min Order`
    }
}

async function makePayment() {
    let orders = document.getElementById("orderBody").children
    for (var i = 0; i < orders.length; i++) {
        console.log(orders[i].children[0].innerHTML)
        items += orders[i].children[0].innerHTML + ", "
    }
    let note = document.getElementById("note").value
    console.log(restaurantEmail)
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/createReservation?note=${note}&phone=${customerPhone}&name=${customerName}&restaurantemail=${restaurantEmail}&owner=${userEmail}&cardnum=${cardInfo["NUM"]}&cardown=${cardInfo["OWN"]}&cvc=${cardInfo["CVC"]}&price=${orderInfo["price"]}&seat=${orderInfo["seats"]}&time=${orderInfo["time"]}&items=${items}`;
    console.log(url)
    let response = await fetch(url, {
        credentials: 'include'
    });
    localStorage.setItem("reservationStatus", "done")
    url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/sendReservationEmail?email=${userEmail}&name=${customerName.replace(" ", "%20")}&restaurant=${selectedRestaurant.replace(" ", "%20")}&time=${orderInfo["time"]}`;
    console.log(url)
    response = await fetch(url, {
        credentials: 'include'
    });
    location.reload();

}


function showModal() {
    document.getElementById("modal-success").style.visibility = "visible"
    document.getElementById("main-content").style.opacity = "50%"
}

function hideModal() {
    document.getElementById("modal-success").style.visibility = "hidden"
    document.getElementById("main-content").style.opacity = "100%"
}



if (localStorage.getItem("reservationStatus") == "done") {
    showModal()
    localStorage.setItem("reservationStatus", "")
}

// showModal()
async function start() {
    await userInfo();
    getSettings()
    renderRestaurants()
}
start()