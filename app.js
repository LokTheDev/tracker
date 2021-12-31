const express = require("express");
const app = express();
const ejs = require("ejs")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const { render } = require("express/lib/response");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/trackerDB", {useNewUrlParser: true});




//DB
const incomeSchema = {
    date: String,
    salary: Number,
    saving: Number,
    invest: Number,
};

const Income = mongoose.model("Income", incomeSchema);

const goalSchema = {
    savingGoal: Number,
    textGoal: String,
};

const Goal = mongoose.model("Goal", goalSchema);

//View
let goal = []
let data = []
let parseResult =[]


app.get("/", function(req, res) {
    Goal.find({}, function(err, foundGoal){
        goal = foundGoal
        parseResult = goal.map(obj => parseInt(obj.savingGoal));
    })

    Income.find({}, function(err, foundItems){
        data = foundItems
        let getSalary = data.map(obj => parseInt(obj.salary));
        let getSaving = data.map(obj => parseInt(obj.saving));
        let getInvest = data.map(obj => parseInt(obj.invest));
        let sumInvest = getInvest.reduce(function(pv, cv) { return pv + cv; }, 0);
        let sumSaving = getSaving.reduce(function(pv, cv) { return pv + cv; }, 0);
        let sumSalary = getSalary.reduce(function(pv, cv) { return pv + cv; }, 0);  
        let sumHolding = [[sumSaving+sumInvest],[sumSalary],[sumSaving],[sumInvest]]
        let compare = [[getSalary[getSalary.length-1] - getSalary[getSalary.length-2]],
                       [getSaving[getSaving.length-1] - getSaving[getSaving.length-2]],
                       [getInvest[getInvest.length-1] - getInvest[getInvest.length-2]]]
        console.log(data)
        let width =  ((sumHolding[0]/parseResult[0]) * 100).toFixed(2) + '%'
        res.render("index", {incomeItems: foundItems, goalItems:goal,width: width, sumInfo: sumHolding, compare:compare});
    })

});

app.get("/goal", function(req, res) {
    Goal.find({}, function(err, foundItems){
        goal = foundItems
        res.render("goal")
    })
});


app.post("/", function(req, res) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date().toLocaleDateString()

    const inputSalary = req.body.newSalary
    const inputSaving = req.body.newSaving
    const inputInvest = req.body.newInvest

    const newIncome = new Income({
        date: today,
        salary: inputSalary,
        saving: inputSaving,
        invest: inputInvest,
    });

    newIncome.save().then(() => console.log('newIncome Added!'));
    res.redirect("/")
});

app.post("/goal", function(req, res) {

    const inputSavingGoal = req.body.newSavingGoal
    const inputTextGoal = req.body.newTextGoal

    Goal.findOneAndUpdate({},{textGoal: inputTextGoal, savingGoal: inputSavingGoal},{useFindAndModify: false},(err) =>{
        if(err){
            console.log(err)
        }else(console.log("goalUpdated"))
    })
 
     res.redirect("/")

});

app.get("/item/:objectid", function(req,res){
    let requestId = req.params.objectid
    console.log(requestId)
    Income.findOne({id:requestId},function(err,founds){
        let item = founds
        res.render("item",{item:item})
    })
})



app.listen(3000, function(){
    console.log("Tracker Server Running On Port:3000")
});
