function switchButton(button){
   let content = button.nextElementSibling;
   if(content.style.display == "none"){
      button.lastElementChild.innerHTML = "▲";
      content.style.display = "block";
      setTimeout(() => {
         content.style.opacity = "1";
      }, 0);
   }
   else{
      button.lastElementChild.innerHTML = "▼";
      content.style.opacity = "0";
      setTimeout(() => {
         content.style.display = "none";
      }, 200);
   }
}

function repaint(box){
   let placeTitle = box.closest(".country-content-place").firstElementChild;
   if(box.checked){
      placeTitle.style.backgroundColor = "rgb(132,185,148)";
   }
   else{
      placeTitle.style.backgroundColor = "rgb(210,210,210)";
   }

   let country = box.closest(".country");
   let countryTitle = country.firstElementChild;
   let boxes = Array.from(country.getElementsByClassName("place-checkbox"));
   let count = 0;
   boxes.forEach((currBox) => {
      if(currBox.checked)
         count++;
   })
   if(count == boxes.length)
      countryTitle.style.backgroundColor = "rgb(132,185,148)";
   else if(count == 0)
      countryTitle.style.backgroundColor = "rgb(210,210,210)";
   else
      countryTitle.style.backgroundColor = "rgb(252,225,73)";
}

let buttons = Array.from(document.getElementsByClassName("button"));
buttons.forEach((button) => {
   let arrow = document.createElement("span");
   arrow.innerHTML = "▼";
   button.appendChild(arrow);
   let content = button.nextElementSibling;
   content.style.display = "none";
   content.style.opacity = "0";
   content.style.transition = "0.2s opacity ease-in-out";

   button.onclick = function(){
      switchButton(button);
   }
})

let boxes = Array.from(document.getElementsByClassName("place-checkbox"));
boxes.forEach((box) => {
   box.onchange = function(){
      let price = box.closest(".country-content-place-data-price").getElementsByClassName("place-price")[0];
      price = Number(price.innerHTML);
      let totalPriceElem = document.getElementById("total-price");
      if(box.checked){
         totalPriceElem.innerHTML = Number(totalPriceElem.innerHTML)+price;
      }
      else{
         totalPriceElem.innerHTML = Number(totalPriceElem.innerHTML)-price;
      }
      repaint(box);
   }
})