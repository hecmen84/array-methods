const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWhealthBtn = document.getElementById('calculate-wealth');

let data =[];
getRamdonUser();
getRamdonUser();
getRamdonUser();

//Fetch random user and add money
addUserBtn.addEventListener('click', getRamdonUser);

async function getRamdonUser(){
 const res = await fetch('https://randomuser.me/api');
 const data = await res.json();

 const user = data.results[0];
 console.log(user);
 console.log(data);
 const newUser ={
     name:`${user.name.title} ${user.name.first} ${user.name.last}`,
     money: Math.floor(Math.random() * 1000000)
 };
 addData(newUser);
}
//double money
function doubleMoney(){
    data = data.map(user =>{
        return {...user, money: user.money * 2}
    })

    updateDOM();
}
function addData(obj){
    data.push(obj);
    updateDOM();
}

// show millionaires
function showMillionaire(){
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

//calculare wealth
function calculateWhealth(){
    const wealth = data.reduce((acc, user) => (acc += user.money),0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth: ${formatMoney(wealth)}</h3>`;
    main.appendChild(wealthEl);
}
//sort by richest
function sortByRichest(){
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

//update DOM
function updateDOM(providedData = data){
    main.innerHTML = ' <h2><strong>person</strong>wealth</h2>';
    providedData.forEach(person =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<srtong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element);
    })
}

//format money
function formatMoney(money){

   return '$'+ money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaire);
calculateWhealthBtn.addEventListener('click', calculateWhealth);