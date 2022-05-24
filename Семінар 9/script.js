function TableData(){
   let book_select = document.getElementById("book-select").value.split(" - ");
   this.book_name = book_select[0];
   this.book_price = book_select[1];
   this.book_count = document.getElementById("book-count").value;
   this.book_total_price = document.getElementById("book-total-price").value;
   if(document.getElementById("delivery-method-1").checked)
      this.delivery_method = 1;
   else
      this.delivery_method = 2;
   this.holiday_packaging = document.getElementById("holiday-packaging").checked;
   this.final_total_price = document.getElementById("final-total-price").value;
   this.customer_name = document.getElementById("customer-name").value;
   this.customer_address = document.getElementById("customer-address").value;
}

function getValidPrice(price){
   price = Math.round(price*100)/100;
   let res = price.toString().replace(/,/g,'.');
   return price;
}


function bookTotalPriceUpdate(){
   let tableData = new TableData();
   tableData.book_count = Math.round(tableData.book_count);
   if(tableData.book_count < 0)
      tableData.book_count = 0;
   if(tableData.book_count > 1000)
      tableData.book_count = 1000;
   document.getElementById("book-count").value = tableData.book_count;
   document.getElementById("book-total-price").value = getValidPrice(tableData.book_price*tableData.book_count);
}
document.getElementById("book-select").onchange = () =>{
   bookTotalPriceUpdate();
}
document.getElementById("book-count").oninput = () =>{
   document.getElementById("book-count").className = "";
   bookTotalPriceUpdate();
}


function finalTotalPriceUpdate(){
   bookTotalPriceUpdate();
   let tableData = new TableData();
   tableData.final_total_price = tableData.book_total_price;
   if(tableData.delivery_method == 1)
      tableData.final_total_price *= 1.05;
   else
      tableData.final_total_price *= 1.15;
   if(tableData.holiday_packaging)
      tableData.final_total_price *= 1.1;
   document.getElementById("final-total-price").value = getValidPrice(tableData.final_total_price);
}
document.getElementById("final-total-price-button").onclick = (event) => {
   event.preventDefault();
   finalTotalPriceUpdate();
}


document.getElementById("customer-name").oninput = () =>{
   document.getElementById("customer-name").className = "";
}
document.getElementById("customer-address").oninput = () =>{
   document.getElementById("customer-address").className = "";
}


document.getElementById("input-form").onsubmit = (event) => {
   event.preventDefault();
   finalTotalPriceUpdate();
   let tableData = new TableData();

   let correct = true;
   if(tableData.book_count == 0){
      correct = false;
      document.getElementById("book-count").className = "input-invalid";
   }
   if(tableData.customer_name == ""){
      correct = false;
      document.getElementById("customer-name").className = "input-invalid";
   }
   if(tableData.customer_address == ""){
      correct = false;
      document.getElementById("customer-address").className = "input-invalid";
   }
   if(!correct){
      return;
   }

   document.getElementById("output").style.display = "block";
   let output_table = document.getElementById("output-table");
   let tr = document.createElement("tr");
   let td;

   td = document.createElement("td");
   td.innerHTML = tableData.book_name;
   tr.appendChild(td);

   td = document.createElement("td");
   td.innerHTML = tableData.book_count;
   tr.appendChild(td);

   td = document.createElement("td");
   td.innerHTML = tableData.book_total_price;
   tr.appendChild(td);

   td = document.createElement("td");
   td.innerHTML = tableData.delivery_method == 1 ? "Поштою" : "Доставка до дому";
   tr.appendChild(td);

   td = document.createElement("td");
   td.innerHTML = tableData.holiday_packaging ? "Так" : "Ні";
   tr.appendChild(td);

   td = document.createElement("td");
   td.innerHTML = tableData.final_total_price;
   tr.appendChild(td);

   td = document.createElement("td");
   td.innerHTML = tableData.customer_name;
   tr.appendChild(td);

   td = document.createElement("td");
   td.innerHTML = tableData.customer_address;
   tr.appendChild(td);

   output_table.insertBefore(tr, output_table.children[1]);
}