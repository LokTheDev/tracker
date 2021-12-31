//SumCard[0]
let compare0 = document.getElementById("compare-0").innerText
if(compare0 < 0){
    document.getElementById("compare-0").style.color = "red"
    document.getElementsByClassName("sumToal")[0].style.color = "red"
    document.getElementById("compare-0").innerText = "-" + "$" + compare0
}else if(compare0 > 0){
    document.getElementById("compare-0").style.color = "green"
    document.getElementsByClassName("sumToal")[0].style.color = "green"
    document.getElementById("compare-0").innerText = "+" + "$" + compare0
}else{
    console.log("same")
}

//sumCard[1]

let compare1 = document.getElementById("compare-1").innerText
if(compare1 < 0){
    document.getElementById("compare-1").style.color = "red"
    document.getElementsByClassName("savingSum")[0].style.color = "red"
    document.getElementById("compare-1").innerText = "-" + "$" + compare1
}else if(compare1 > 0){
    document.getElementById("compare-1").style.color = "green"
    document.getElementsByClassName("savingSum")[0].style.color = "green"
    document.getElementById("compare-1").innerText = "+" + "$" + compare1
}else{
    console.log("same")
}

//sumCard[2]

let compare2 = document.getElementById("compare-2").innerText
if(compare2 < 0){
    document.getElementById("compare-2").style.color = "red"
    document.getElementsByClassName("investSum")[0].style.color = "red"
    document.getElementById("compare-2").innerText = "-" + "$" + compare2
}else if(compare2 > 0){
    document.getElementById("compare-2").style.color = "green"
    document.getElementsByClassName("investSum")[0].style.color = "green"
    document.getElementById("compare-2").innerText = "+" + "$" + compare2
}else{
    console.log("same")
}

