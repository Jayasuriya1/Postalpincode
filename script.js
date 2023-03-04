var bodyEle = document.querySelector("body");
//creating header-container
var headerContainerDivEle = document.createElement("div");
headerContainerDivEle.classList.add("container-fluid","text-center");
bodyEle.append(headerContainerDivEle);
headerContainerDivEle.innerHTML=`<h1>Locate Post Office</h1>`
// creating main-container div element
var mainContainerDivEle = document.createElement("div");
mainContainerDivEle.classList.add("container");
bodyEle.append(mainContainerDivEle);

//creating row div element for search
var searchRow1 = document.createElement("div");
searchRow1.classList.add("row");
mainContainerDivEle.append(searchRow1);

//creating col div element for search by pincode
var searchCol1 = document.createElement("div");
searchCol1.classList.add("col","col-12");
searchRow1.append(searchCol1);
searchCol1.innerHTML = `
<hr>
<h5>Search Post Office Details By PIN Code (6 Character)</h5>
<div class="input-group ">
<input type="number" class="form-control" placeholder="Enter PIN Code" aria-label="Recipient's username" aria-describedby="button-addon2">
<button class="btn btn-outline-secondary" onClick=pincode(this) type="button" id="button-addon2">Search</button>
</div>`;

//or
var orEle=document.createElement('h1');
mainContainerDivEle.append(orEle);
orEle.innerHTML=`<h1 style="text-align:center;">OR</h1>`


//creating row div element for search by postoffice name
var searchRow2 = document.createElement("div");
searchRow2.classList.add("row");
mainContainerDivEle.append(searchRow2);


//creating col div element for search by postoffice name
var searchCol2 = document.createElement("div");
searchCol2.classList.add("col","col-12");
searchRow2.append(searchCol2);
searchCol2.innerHTML = `
<h5>Search Post Office Details By Branch Name</h5>
<div class="input-group ">
<input type="text" class="form-control" placeholder="Enter Post Office Name" aria-label="Recipient's username" aria-describedby="button-addon2">
<button class="btn btn-outline-secondary" onClick=postOfficeName(this) type="button" id="button-addon2">Search</button>
</div>`;

  // creating table-container div element
  var tableContainerDiv = document.createElement("div");
  tableContainerDiv.classList.add("container");
  bodyEle.append(tableContainerDiv);
  //creating row div for table
  var tableRow = document.createElement("div");
  tableRow.classList.add("row",'justify-content-center');
  tableContainerDiv.append(tableRow);


var pincodeInput = document.querySelector('[placeholder="Enter PIN Code"]');

//---------------------------------------------------------------
async function pincode(event) {
    tableRow.innerHTML=''
    inputLength=pincodeInput.value
    if(inputLength.length !== 6){
        tableRow.innerHTML=`<h3 style="text-align:center;">6 number must</h3>`
        return false}
  console.log(event);
  
  console.log(pincodeInput.value);
  console.log(inputLength.length);
  

  tableRow.innerHTML=`<div class="spinner-border text-success"  role="status">
  <span class="visually-hidden">Loading...</span>
</div>`

  var responce = await fetch(
    `https://api.postalpincode.in/pincode/${pincodeInput.value}`
  );
  var data = await responce.json();
  console.log(data);
  console.log(data[0].Status);//Success
  tableRow.innerHTML=''
if(data[0].Status == 'Success'){
    //creating col div element for table
var tableCol = document.createElement("div");
tableCol.classList.add("col","col-12");
tableRow.append(tableCol);
tableCol.innerHTML = `
<hr>
<table class='tableContent'>
<thead>
<tr>
<th>Post Office Name</th>
<th>Pincode</th>
<th>Office Type</th>
<th>DeliveryStatus</th>
<th>Location</th>
<th>Division Location</th>
</tr>
</thead>
</table>
`;

var tableEle = document.querySelector(".tableContent");
tableEle.classList.add("table","table-secondary","table-striped");
  var tbodyEle = document.createElement("tbody");
  tableEle.append(tbodyEle);
//   tbodyEle.innerHTML = "";
  for (var datas of data[0].PostOffice) {
    //creating table body element
    var tableBodyRow = document.createElement("tr");
    tbodyEle.append(tableBodyRow);

    var nameTd = document.createElement("td");
    nameTd.innerText = datas.Name;
    tableBodyRow.append(nameTd);
    console.log(datas.Name);

    var pincodeTd = document.createElement("td");
    pincodeTd.innerText = datas.Pincode;
    tableBodyRow.append(pincodeTd);
    console.log(datas.Pincode);

    var officeTypeTd = document.createElement("td");
    officeTypeTd.innerText = datas.BranchType;
    tableBodyRow.append(officeTypeTd);
    console.log(datas.BranchType);

    var deliveryStatusTd = document.createElement("td");
    deliveryStatusTd.innerText = datas.DeliveryStatus;
    tableBodyRow.append(deliveryStatusTd);
    console.log(datas.DeliveryStatus);

    var locationTd = document.createElement("td");
    locationTd.innerText = `${datas.Division} Taluk of ${datas.District} District`;
    tableBodyRow.append(locationTd);
    console.log(datas.DeliveryStatus);

    var diviLocationTd = document.createElement("td");
    diviLocationTd.innerText = `${datas.Division} Division ${datas.Region} Region ${datas.Circle} Circle`;
    tableBodyRow.append(diviLocationTd);
    console.log(datas.DeliveryStatus);
  }
  pincodeInput.value = "";
}else{
    tableRow.innerHTML=`<h3 style="text-align:center;">${data[0].Message}</h3>`
}


}


//------------------------------------------------------------------

var postOfficeNameInput = document.querySelector('[placeholder="Enter Post Office Name"]');

async function postOfficeName(event) {
    tableRow.innerHTML=''
    inputLength=postOfficeNameInput.value
    if(inputLength.length == 0){
        // tableRow.innerHTML=`<h3 style="text-align:center;"></h3>`
        return false}
  console.log(event);
  

  console.log(postOfficeNameInput.value);
//   console.log(inputLength.length);
  

  tableRow.innerHTML=`<div class="spinner-border text-success"  role="status">
  <span class="visually-hidden">Loading...</span>
</div>`

  var responce = await fetch(
    `https://api.postalpincode.in/postoffice/${postOfficeNameInput.value}`
  );
  var data = await responce.json();
  console.log(data);
  console.log(data[0].Status);//Success
  tableRow.innerHTML=''
if(data[0].Status == 'Success'){
    //creating col div element for table
var tableCol = document.createElement("div");
tableCol.classList.add("col");
tableRow.append(tableCol);
tableCol.innerHTML = `
<hr>
<table class='tableContent'>
<thead>
<tr>
<th>Post Office Name</th>
<th>Pincode</th>
<th>Office Type</th>
<th>DeliveryStatus</th>
<th>Location</th>
<th>Division Location</th>
</tr>
</thead>
</table>
`;

var tableEle = document.querySelector(".tableContent");
tableEle.classList.add("table", "table-light", "table-striped");
  var tbodyEle = document.createElement("tbody");
  tableEle.append(tbodyEle);
//   tbodyEle.innerHTML = "";
  for (var datas of data[0].PostOffice) {
    //creating table body element
    var tableBodyRow = document.createElement("tr");
    tbodyEle.append(tableBodyRow);

    var nameTd = document.createElement("td");
    nameTd.innerText = datas.Name;
    tableBodyRow.append(nameTd);
    console.log(datas.Name);

    var pincodeTd = document.createElement("td");
    pincodeTd.innerText = datas.Pincode;
    tableBodyRow.append(pincodeTd);
    console.log(datas.Pincode);

    var officeTypeTd = document.createElement("td");
    officeTypeTd.innerText = datas.BranchType;
    tableBodyRow.append(officeTypeTd);
    console.log(datas.BranchType);

    var deliveryStatusTd = document.createElement("td");
    deliveryStatusTd.innerText = datas.DeliveryStatus;
    tableBodyRow.append(deliveryStatusTd);
    console.log(datas.DeliveryStatus);

    var locationTd = document.createElement("td");
    locationTd.innerText = `${datas.Division} Taluk of ${datas.District} District`;
    tableBodyRow.append(locationTd);
    console.log(datas.DeliveryStatus);

    var diviLocationTd = document.createElement("td");
    diviLocationTd.innerText = `${datas.Division} Division ${datas.Region} Region ${datas.Circle} Circle`;
    tableBodyRow.append(diviLocationTd);
    console.log(datas.DeliveryStatus);
  }
  postOfficeNameInput.value = "";
}else{
    tableRow.innerHTML=`<h3 style="text-align:center;">${data[0].Message}</h3>`
}


}
