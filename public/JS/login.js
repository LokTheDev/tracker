
const loginBtn = document.getElementById("loginBtn");
const loginCard = document.getElementById("loginCard");
let toggle = 0

loginBtn.addEventListener("click", function(){
    if(toggle==0){
        loginCard.style.display = "block"
        toggle = 1
    }else{
        loginCard.style.display = "none"
        toggle = 0
    }("hi")
})


//logic

let login = false
let menuBar = document.getElementsByClassName("menuBar")
menuBar[0].style.display = "none"


//function
let submitPw = document.getElementById("loginSub")
let pwcode = "lokthedev"
let goalBtn = document.getElementById("goalBtn")

submitPw.addEventListener("click", function(){
    let pwInput = document.getElementById("pwInput").value
    if(pwcode == pwInput){
        login=true
        loginCard.style.display = "none"
        toggle = 0
        menuBar[0].style.display = "flex"
        goalBtn.style.visibility ="visible"
    }else{
        alert("wrong password")
    }
})