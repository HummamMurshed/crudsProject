let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let adds = document.getElementById("ads");
let discount = document.getElementById("discount");

let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let temp_index = -1;
//Get Total
function isem(val) {
  return val === " ";
}

function getTotal() {
  let result = 0;
  if (!isem(price.value)) {
    result = +price.value + +taxes.value + +adds.value - +discount.value;
    console.log(result);
    total.innerHTML = result;
    total.style.backgroundColor = "#ffed4e";
    total.style.color = "#1787e0";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
    total.style.color = "white";
  }

  return total.innerHTML;
}

let datpro;
if (localStorage.product != null) {
  datpro = JSON.parse(localStorage.product);
} else {
  datpro = [];
}

function clearall() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  adds.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
let text = document.getElementById("search");

function searshByCt(categ = text.value) {
  if (categ === "") {
    showdata();
    return;
  }
  let table = "";

  for (let i = 0; i < datpro.length; i++) {
    if (categ.includes(datpro[i]._title[0])) {
      table += `
    
      <tr>
        <td>${i}</td>
        <td>${datpro[i]._title}</td>
        <td>${datpro[i]._price}</td>
        <td id="taxeC">${datpro[i]._taxes}</td>
        <td id="count">${datpro[i]._count}</td>
        <td id="ads">${datpro[i]._adds}</td>
        <td id="disC">${datpro[i]._discount}</td>
        <td id="totaC">${datpro[i]._total}</td>
        <td id="category">${datpro[i]._category}</td>
        <td class= "${i}" id="tdupdateC"><button onclick="update(${i})" id="update">Update</button></td>
        <td id="deleteC"><button onclick="deleteitem(${i})" id="delete">Delete</button></td>
    </tr>
        `;
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

function searshByTitle(tit = text.value) {
  if (tit === "") {
    showdata();
    return;
  }
  let table = "";

  for (let i = 0; i < datpro.length; i++) {
    if (tit.includes(datpro[i]._title[0])) {
      table += `
    
      <tr>
        <td>${i}</td>
        <td>${datpro[i]._title}</td>
        <td>${datpro[i]._price}</td>
        <td id="taxeC">${datpro[i]._taxes}</td>
        <td id="count">${datpro[i]._count}</td>
        <td id="ads">${datpro[i]._adds}</td>
        <td id="disC">${datpro[i]._discount}</td>
        <td id="totaC">${datpro[i]._total}</td>
        <td id="category">${datpro[i]._category}</td>
        <td class= "${i}" id="tdupdateC"><button onclick="update(${i})" id="update">Update</button></td>
        <td id="deleteC"><button onclick="deleteitem(${i})" id="delete">Delete</button></td>
    </tr>
        `;
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
function searchAll(key) {
  if (key === "") {
    showdata();
    return;
  }
  let table = "";
  table.s;

  for (let i = 0; i < datpro.length; i++) {
    if (JSON.stringify(datpro[i]).toLowerCase().includes(key.toLowerCase())) {
      table += `
    
      <tr>
        <td>${i}</td>
        <td>${datpro[i]._title}</td>
        <td>${datpro[i]._price}</td>
        <td id="taxeC">${datpro[i]._taxes}</td>
        <td id="count">${datpro[i]._count}</td>
        <td id="ads">${datpro[i]._adds}</td>
        <td id="disC">${datpro[i]._discount}</td>
        <td id="totaC">${datpro[i]._total}</td>
        <td id="category">${datpro[i]._category}</td>
        <td class= "${i}" id="tdupdateC"><button onclick="update(${i})" id="update">Update</button></td>
        <td id="deleteC"><button onclick="deleteitem(${i})" id="delete">Delete</button></td>
    </tr>
        `;
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

function showdata() {
  let table = "";

  for (let i = 0; i < datpro.length; i++) {
    table += `
    
            <tr>
              <td>${i}</td>
              <td>${datpro[i]._title}</td>
              <td>${datpro[i]._price}</td>
              <td id="taxeC">${datpro[i]._taxes}</td>
              <td id="count">${datpro[i]._count}</td>
              <td id="ads">${datpro[i]._adds}</td>
              <td id="disC">${datpro[i]._discount}</td>
              <td id="totaC">${datpro[i]._total}</td>
              <td id="category">${datpro[i]._category}</td>
              <td class= "${i}" id="tdupdateC"><button onclick="update(${i})" id="update">Update</button></td>
              <td id="deleteC"><button onclick="deleteitem(${i})" id="delete">Delete</button></td>
          </tr>
              `;
  }

  //Show DaleteAll Button
  let btndelete = document.getElementById("delete-all");
  if (datpro.length > 0) {
    btndelete.innerHTML = `<button onclick="deleteall()">Delete All(${
      datpro.length - 1
    })</button>`;
  } else {
    btndelete.innerHTML = "";
  }
  document.getElementById("tbody").innerHTML = table;
}

submit.onclick = function () {
  if (submit.innerHTML == "Update") {
    save(temp_index);
    clearall();
    return;
  }
  let newPro = {
    _title: title.value,
    _price: price.value,
    _taxes: taxes.value,
    _adds: adds.value,
    _discount: discount.value,
    _total: total.innerHTML,
    _count: count.value,
    _category: category.value,
  };
  datpro.push(newPro);
  localStorage.setItem("product", JSON.stringify(datpro));

  clearall();
};
showdata();

//delete

function deleteitem(i) {
  datpro.splice(i, 1);
  localStorage.product = JSON.stringify(datpro);
  showdata();
}

function delteall() {
  localStorage.clear();
  datpro.splice(0);
  showdata();
}

function fillProducInForm(product) {
  title.value = product._title;
  price.value = product._price;
  taxes.value = product._taxes;
  adds.value = product._adds;
  discount.value = product._discount;
  total.innerHTML = product._total;
  count.value = product._count;
  category.value = product._category;
}
function save(index) {
  let btnUpd = document.getElementsByClassName(index);
  datpro[index]._title = title.value;
  datpro[index]._price = price.value;
  datpro[index]._taxes = taxes.value;
  datpro[index]._adds = adds.value;
  datpro[index]._discount = discount.value;
  datpro[index]._total = total.innerHTML;
  datpro[index]._count = count.value;
  datpro[index]._category = category.value;

  btnUpd[0].setAttribute("id", "tdupdateC");

  btnUpd[0].innerHTML = `<button  onclick="update(${index})" id="update">Update</button></td>`;

  localStorage.setItem("product", JSON.stringify(datpro));
  submit.innerHTML = "Create";

  submit.style.backgroundColor = "#ffed4e";
  submit.style.color = "#1787e0";
  temp_index = -1;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  showdata();
  clearall();
}

let prev = -1;
function update(index) {
  let btnOld = document.getElementsByClassName(prev);
  if (btnOld.length > 0) {
    btnOld[0].setAttribute("id", "tdupdateC");

    btnOld[0].innerHTML = `<button  onclick="update(${index})" id="update">Update</button></td>`;
    localStorage.setItem("product", JSON.stringify(datpro));
    showdata();
  }

  let btnUpd = document.getElementsByClassName(index);
  btnUpd[0].setAttribute("id", "save");
  fillProducInForm(datpro[index]);
  btnUpd[0].innerHTML = `<button   onclick="save(${index})" id="update">Save</button></td>`;
  submit.innerHTML = "Update";
  submit.style.backgroundColor = "green";
  submit.style.color = "white";
  temp_index = index;
  prev = index;
}
