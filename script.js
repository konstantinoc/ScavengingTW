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
table.style.width = "200px";
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
table.appendChild(tbody);
bor.appendChild(table);

//var spear = document.querySelector('[class = "units-entry-all squad-village-required"][data-unit = "spear"]');
//spear = spear.innerHTML;
//spear = spear.slice(1,spear.length-1);

//var current = spear;

btn.onclick= function(){
    var btns = document.getElementsByClassName("btn btn-default free_send_button");
    var current = parseInt(txtSpear.value,10);
    var ration = [1.602, 2.5, 2, 1.5];
    var i;
    for(i=0; i<btns.length; i++){
        current = Math.round(current / ration[i]);
        $("input.unitsInput[name=spear]").val(current).trigger("change");
        btns[i].click();

    }
}