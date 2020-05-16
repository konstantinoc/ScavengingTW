// ==UserScript==
// @name         ScavWithSpears
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       kotchios
// @match        https://*/game.php?village=*&screen=place&mode=scavenge
// @grant        none
// ==/UserScript==

var bor = document.getElementById("scavenge_screen");

var table = document.createElement("table");
table.setAttribute("class", "candidate-squad-widget vis");
table.style.width = "100px";
table.style.marginLeft = "5px";

var tbody = document.createElement("tbody");
var tr = document.createElement("tr");

var th = document.createElement("th");
var a = document.createElement("a");
a.setAttribute("class", "unit_link");
a.setAttribute("data-unit", "spear");
a.innerHTML = "<img src=https://dsgr.innogamescdn.com/asset/d25bbc6/graphic/unit/unit_spear.png>";
th.appendChild(a);
tr.appendChild(th);

th = document.createElement("th");
a = document.createElement("a");
th.appendChild(a);
tr.appendChild(th);
tbody.appendChild(tr);

tr = document.createElement("tr");
var td = document.createElement("td");
var txtSpear = document.createElement("input");
txtSpear.setAttribute("class", "unitInput input-nicer");
txtSpear.setAttribute("id", "txt-spear");
td.appendChild(txtSpear);
tr.appendChild(td);

td = document.createElement("td");
var btn = document.createElement('a');
btn.setAttribute("id", "btn_start");
btn.setAttribute("class", "btn btn-default");
//btn.style.marginLeft = "30px";
btn.style.width = "50px";
btn.innerHTML = "Send";
td.appendChild(btn);
tr.appendChild(td);

tbody.appendChild(tr);

tr = document.createElement("tr");
td = document.createElement("td");
var btnSendAll = document.createElement('a');
btnSendAll.setAttribute("id", "btn_start");
btnSendAll.setAttribute("class", "btn btn-default");
//btnSendAll.style.marginLeft = "30px";
btnSendAll.style.width = "70px";
btnSendAll.innerHTML = "Send all";
td.appendChild(btnSendAll);
tr.appendChild(td);

tbody.appendChild(tr);

tr = document.createElement("tr");
td = document.createElement("td");
var btnSendAllAuto = document.createElement('a');
btnSendAllAuto.setAttribute("id", "btn_start");
btnSendAllAuto.setAttribute("class", "btn btn-default");
//btnSendAllAuto.style.marginLeft = "30px";
btnSendAllAuto.style.width = "90px";
btnSendAllAuto.innerHTML = "Start auto";
td.appendChild(btnSendAllAuto);
tr.appendChild(td);

tbody.appendChild(tr);
table.appendChild(tbody);
bor.appendChild(table);

var current;
btnSendAll.onclick = function(){
    var spear = document.querySelector('[class = "units-entry-all squad-village-required"][data-unit = "spear"]');
    spear = spear.innerHTML;
    spear = spear.slice(1,spear.length-1);
    current = spear;
    sendTroops();
}

btn.onclick= function(){
    current = parseInt(txtSpear.value,10);
    sendTroops();
}

var interval;

btnSendAllAuto.onclick = function(){
//REMEMBER TO CHANGE 3!!!!!!!!!!!

    if (btnSendAllAuto.innerHTML == "Start auto"){
        btnSendAllAuto.innerHTML = "Stop auto";
        interval = setInterval(function(){
             if(txtSpear.value == ""){
                   btnSendAll.click();
                }
                else{
                    btn.click();
                }
            if(document.getElementsByClassName("btn btn-default free_send_button").length == 3){

            }
        }, 1000);
    }
    else{
        btnSendAllAuto.innerHTML = "Start auto";
        clearInterval(interval);
    }
}

function sendTroops(){
    var btns = document.getElementsByClassName("btn btn-default free_send_button");
    var ration = [1.602, 2.5, 2, 1.5];
    var i;
    for(i=0; i<btns.length; i++){
        current = Math.round(current / ration[i]);
        $("input.unitsInput[name=spear]").val(current).trigger("change");
        btns[i].click();
    }
}
