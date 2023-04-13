async function addItem(params) {
    userEmail = localStorage.getItem("email")
    if(document.getElementById("foodName").value!=""&&document.getElementById("foodType").value!=""&&document.getElementById("cookingTime").value!=""&&document.getElementById("price").value!=""&&document.getElementById("description").value!=""){
        let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/addMenuItem?email=${userEmail}&name=${document.getElementById("foodName").value}&type=${document.getElementById("foodType").value}&time=${document.getElementById("cookingTime").value}&price=${document.getElementById("price").value}&description=${document.getElementById("description").value}`;
        let response = await fetch(url, {
            credentials: 'include'
        });
        let data = await response.json();
    }
    location.reload()
}

async function getMenu(params) {
    userEmail = localStorage.getItem("email")
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/getMenu?email=${userEmail}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json();
    console.log(data)
    for (const [key, value] of Object.entries(data)) {
        console.log(value)
        document.getElementById("menuBody").innerHTML = document.getElementById("menuBody").innerHTML + `
            <tr>
            <td>${value["FOOD_NAME"]}</td>
            <td>${value["FOOT_TYPE"]}</td>
            <td>${value["COOKING_TIME"]} Minute</td>
            <td>${value["PRICE"]} ₺</td>
            <td>${value["DESCRIPTION"]}</td>
            <td style="width: 30px; ">
                <button type="button"
                    class="btn btn-block btn-danger btn-sm" onclick="deleteItem(this)">DELETE</button>
            </td>
        </tr>
        `
    }
}

async function deleteItem(self) {
    userEmail = localStorage.getItem("email")
    self = self.parentNode.parentNode
    console.log(self.children[0].innerHTML)
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/deleteMenuItem?email=${userEmail}&name=${self.children[0].innerHTML}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json();
    location.reload()
}
getMenu()