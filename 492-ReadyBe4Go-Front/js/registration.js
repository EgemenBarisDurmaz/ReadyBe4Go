async function register() {
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var accountType = document.getElementById("user-type").value

    console.log(validateEmail(email))
    if(name==""||email==""||password==""||accountType=="Select your account type"||!validateEmail(email)){
        document.getElementById("top-text").innerHTML="Please Enter Valid Credentials"
        document.getElementById("top-text").style.color="red"
    }else{
        if (accountType=="User"){
            let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/register?name=${name}&accountType=${accountType}&password=${password}&email=${email}`;
            let response = await fetch(url, {
                credentials: 'include'
            });
            let data = await response.json()
            if (data == false || accountType == "User Type") {
                document.getElementById("top-text").innerHTML = "Please Try Different E-Mail"
            } else if (data == true) {
                window.location.replace("/login.html");
            }
        }
        else if(accountType=="Restaurant"){
            document.getElementById("report_container").style.visibility="visible"
        }
    }

}
function closePop() {
    document.getElementById("report_container").style.visibility="hidden"
}
async function sendRestaurant() {
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var accountType = document.getElementById("user-type").value
    if (document.getElementById("restaurant_code").value=="secret_key"){
        document.getElementById("report_container").style.visibility="hidden"
        let url = `http://492readybe4go-env.eba-bt2jpjzi.eu-central-1.elasticbeanstalk.com/register?name=${name}&accountType=${accountType}&password=${password}&email=${email}`;
        let response = await fetch(url, {
            credentials: 'include'
        });
        let data = await response.json()
        if (data == false || accountType == "User Type") {
            document.getElementById("top-text").innerHTML = "Please Try Different E-Mail"
        } else if (data == true) {
            window.location.replace("/login.html");
        }
        document.getElementById("wrong_key").style.visibility="hidden"
    }
    else{
        document.getElementById("wrong_key").style.visibility="visible"
    }
    
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  