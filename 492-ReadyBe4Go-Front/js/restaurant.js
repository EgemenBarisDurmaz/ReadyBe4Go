async function getReservations() {
    userEmail = localStorage.getItem("email")
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/getReservation?email=${userEmail}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json();

    
    document.getElementById("reservationsBody").innerHTML = ""
    for (const [key, value] of Object.entries(data)) {
        let phone = "("+value["PHONE"].substring(0, 3)+") "+value["PHONE"].substring(3, 6)+" "+value["PHONE"].substring(6, 8) +" "+value["PHONE"].substring(8, 10)
        document.getElementById("reservationsBody").innerHTML = `                                            
        <tr>
            <td>
                ${value["NAME"].toUpperCase()}
            </td>
            <td>
                ${phone}
            </td>
            <td>
                ${value["PRICE"]}₺
            </td>
            <td>
                ${value["SEAT"]}
            </td>
            <td>
                ${value["TIME"]}
            </td>
            <td>
                ${value["ITEMS"]}
            </td>
            <td>
            ${value["NOTE"]}
        </td>
        </tr>` + document.getElementById("reservationsBody").innerHTML
    }

}
getReservations()



async function showReport() {
    console.log("Show Report")
    document.getElementById("report_container").style.visibility="visible"
    userEmail = localStorage.getItem("email")
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/getRestaurantReport?restaurantemail=${userEmail}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json();
    console.log(data)
    var bestTimes={}
    var bestCustomers={}
    var bestFoods={}
    var avgAmount=0.0
    var avgTable=0.0
    console.log()
    for (const [key, value] of Object.entries(data)){
        if (value["PRICE"]!=""){avgAmount=(avgAmount+parseInt(value["PRICE"]))/2}
        if (value["SEAT"]!=""){avgTable=(avgTable+parseInt(value["SEAT"]))/2}
        if (value["TIME"] in bestTimes){ bestTimes[value["TIME"]]=bestTimes[value["TIME"]]+1 }
        else{bestTimes[value["TIME"]] = 1}
        if (value["NAME"] in bestCustomers){bestCustomers[value["NAME"]]=bestCustomers[value["NAME"]]+1}
        else{bestCustomers[value["NAME"]] = 1}

        itemSize = parseInt(value["ITEMS"].split("x")[0])
        if (value["ITEMS"].split("x ")[1] in bestFoods){
            bestFoods[value["ITEMS"].split("x ")[1]]=bestFoods[value["ITEMS"].split("x ")[1]]+itemSize
        }
        else{
            bestFoods[value["ITEMS"].split("x ")[1]] = itemSize
        }
        
    }
    url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/restaurantSettings?email=${userEmail}`;
    response = await fetch(url, {
        credentials: 'include'
    });
    let settings = await response.json();
    document.getElementById("rest-name").innerHTML=settings[0]["NAME"]
    document.getElementById("rest-desc").innerHTML=settings[0]["DESCRIPTION"]
    let phone = "("+settings[0]["PHONE"].substring(0, 3)+") "+settings[0]["PHONE"].substring(3, 6)+" "+settings[0]["PHONE"].substring(6, 8) +" "+settings[0]["PHONE"].substring(8, 10)
    document.getElementById("rest-phone").innerHTML=phone
    document.getElementById("best-time").innerHTML=""
    document.getElementById("best-customer").innerHTML=""
    document.getElementById("best-foods").innerHTML=""


    console.log(bestTimes)
    let allTimes=["10:00-11:00","11:00-12:00","12:00-13:00","13:00-14:00","14:00-15:00","15:00-16:00","16:00-17:00","17:00-18:00","18:00-19:00","19:00-20:00","20:00-21:00","21:00-22:00","22:00-23:00","23:00-24:00"]
    let timesNumber=[]
    allTimes.forEach((time) => {
        if (time in bestTimes){
            timesNumber.push(bestTimes[time])
        }
        else{
            timesNumber.push(0)
        }
    });

    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
          labels:allTimes,
          datasets: [
            {
              label: "Number of Tables",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: timesNumber
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Distribution of reservations by hours'
          },
          responsive:true,
          maintainAspectRatio: false
        }
    });



    for (const [key, value] of Object.entries(getBestThree(bestTimes))){
        document.getElementById("best-time").innerHTML=document.getElementById("best-time").innerHTML+value[0]+" x"+value[1]+"<br>"
    }
    for (const [key, value] of Object.entries(getBestThree(bestCustomers))){
        document.getElementById("best-customer").innerHTML=document.getElementById("best-customer").innerHTML+value[0]+" x"+value[1]+"<br>"
    }
    for (const [key, value] of Object.entries(getBestThree(bestFoods))){
        document.getElementById("best-foods").innerHTML=document.getElementById("best-foods").innerHTML+value[0]+" x"+value[1]+"<br>"
    }

    document.getElementById("total-resv").innerHTML=Object.keys(data).length + " Reservation"
    document.getElementById("average-amount").innerHTML=avgAmount.toFixed(2)+" ₺"
    document.getElementById("average-table").innerHTML=avgTable.toFixed(1)+" Person"

}
function closeReport() {
    console.log("Show Report")
    document.getElementById("report_container").style.visibility="hidden"
}


setInterval(() => {
    getReservations()
}, 10000);


function getBestThree(myDict){
    var items = Object.keys(myDict).map(function(key) {
        return [key, myDict[key]];
    });
    
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    return items.slice(0, 3)
}


