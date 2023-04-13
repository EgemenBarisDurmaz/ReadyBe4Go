async function login() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/login?password=${password}&email=${email}`;
    let response = await fetch(url, {
        credentials: 'include'
    });
    let data = await response.json()
    // console.log(data)

    if (data["status"] == "Wrong Mail or Password") {
        document.getElementById("login-box-top").style.top = "260px"
        document.getElementById("login-box-msg").innerHTML = "Wrong User Name or Password<br> Please Try Again!"
        document.getElementById("login-box-msg").style.color = "red"
    } else if (data[0]["ACCOUNT_TYPE"] == "Restaurant") {
        localStorage.setItem("email", email);
        window.location.replace("/restaurant.html");
    } else if (data[0]["ACCOUNT_TYPE"] == "User") {
        localStorage.setItem("email", email);
        window.location.replace("/user.html");
    }
}

// localStorage.setItem("email", "")

async function load() {
    if (localStorage.getItem("email") && validateEmail(localStorage.getItem("email"))) {
        let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/user?email=${localStorage.getItem("email")}`;
        let response = await fetch(url, {
            credentials: 'include'
        });
        let data = await response.json()
        console.log(data)
        if (data[0]["ACCOUNT_TYPE"] == "Restaurant") {
            window.location.replace("/restaurant.html");
        } else if (data[0]["ACCOUNT_TYPE"] == "User") {
            window.location.replace("/user.html");
        }
    }
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

load()