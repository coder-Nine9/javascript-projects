let titleInput = document.getElementById("title");
let priceInput = document.getElementById("price");
let taxesInput = document.getElementById("taxes");
let adsInput = document.getElementById("ads");
let discountInput = document.getElementById("discount");
let total = document.getElementById("total");
let categoryInput = document.getElementById("category");
let countInput = document.getElementById("count");
let inputs = document.querySelectorAll("input");
let btnDeleteAll = document.querySelector("#deleteAll");
let tbody = document.querySelector("table tbody");
let btnMultRole = document.getElementById("updateCreate");
let btnsSearch = document.querySelector(".search");

let Products;
let mode = "create";
let modeSearch = "title";
let indexOfUpdate;


function getArray() {
   if (localStorage.getItem('products') != null) {
      Products = JSON.parse(localStorage.getItem('products'));
   } else {
      Products = [];
   }
}

function getTotal() {
   if (priceInput.value != '' && taxesInput.value != '' && adsInput.value != '') {
      let result = (+priceInput.value + +taxesInput.value + +adsInput.value) - +discountInput.value;
      total.textContent = result;
   } else {
      total.textContent = "";
   }
}

function createPro(Product, index) {
   let tr = document.createElement("tr");
   let td1 = document.createElement("td");
   td1.textContent = index + 1;
   let td2 = document.createElement("td");
   td2.textContent = Product.title;
   let td3 = document.createElement("td");
   td3.textContent = Product.price;
   let td4 = document.createElement("td");
   td4.textContent = Product.taxes;
   let td5 = document.createElement("td");
   td5.textContent = Product.ads;
   let td6 = document.createElement("td");
   td6.textContent = Product.discount;
   let td7 = document.createElement("td");
   td7.textContent = Product.total;
   let td8 = document.createElement("td");
   td8.textContent = Product.category;
   let td9 = document.createElement("td");
   let updateBtn = document.createElement("button");
   updateBtn.textContent = 'Update';
   updateBtn.dataset.id = Product.id;
   td9.appendChild(updateBtn);
   let td10 = document.createElement("td");
   let deleteBtn = document.createElement("button");
   deleteBtn.textContent = 'Delete';
   deleteBtn.dataset.id = Product.id;
   td10.appendChild(deleteBtn);
   tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, td10);

   return tr;
}

function getProduct() {
   let isNempthy =
      total.textContent != ''
      && titleInput.value != ''
      && categoryInput.value != ''
      && discountInput.value != '';
   let count = (countInput.value != "") ? countInput.value : 1;

   if (isNempthy) {

      if (mode === "create") {
         for (let i = 0; i < count; i++) {
            let newPro = {
               id: Date.now() + i,
               title: titleInput.value,
               price: priceInput.value,
               taxes: taxesInput.value,
               ads: adsInput.value,
               discount: discountInput.value,
               total: total.textContent,
               category: categoryInput.value,
            }
            Products.push(newPro);
         }
      } else {
         Products[indexOfUpdate] = {
            id: Date.now(),
            title: titleInput.value,
            price: priceInput.value,
            taxes: taxesInput.value,
            ads: adsInput.value,
            discount: discountInput.value,
            total: total.textContent,
            category: categoryInput.value,
         }
         mode = "create";
         btnMultRole.textContent = "Create";
      }
      inputs.forEach(input => {
         input.value = '';
      })
      total.textContent = "";
   } else {
      alert("ERORRE! FULL THEY INPUTS");
   }


   localStorage.setItem("products", JSON.stringify(Products));
   displayProducts();
}

function displayProducts() {
   tbody.textContent = "";
   let fragment = document.createDocumentFragment();
   Products.forEach((Product, index) => {

      fragment.appendChild(createPro(Product, index))

   })
   tbody.appendChild(fragment);
   if (Products.length >= 1) {
      btnDeleteAll.textContent = `Delete All (${Products.length})`;
      btnDeleteAll.style.display = "block";
   } else {
      btnDeleteAll.style.display = "none";
   }
}

tbody.addEventListener("click", (e) => {

   if (e.target.textContent === "Delete") {
      deleteProduct(+e.target.dataset.id);
   } else if (e.target.textContent === "Update") {
      updateProduct(+e.target.dataset.id);
   }

})

function deleteProduct(id) {
   console.log(Products[0].id)
   console.log(id)
   Products = Products.filter(product => product.id != id);
   console.log(Products)
   localStorage.setItem("products", JSON.stringify(Products));
   displayProducts();
}

function deleteAll() {
   Products = [];
   localStorage.clear();
   tbody.textContent = "";
   btnDeleteAll.style.display = "none";
}

function updateProduct(id) {
   mode = "update";
   btnMultRole.textContent = "Update";
   for (let i = 0; i < Products.length; i++) {
      console.log(Products[i].id === id)
      console.log(Products[i].id)
      if (Products[i].id === id) {
         titleInput.value = Products[i].title;
         priceInput.value = Products[i].price;
         taxesInput.value = Products[i].taxes;
         adsInput.value = Products[i].ads;
         discountInput.value = Products[i].discount;
         total.textContent = Products[i].total;
         countInput.disabled = true;
         categoryInput.value = Products[i].category;
         indexOfUpdate = i;
      }
   }
   console.log(id)

}

btnsSearch.addEventListener("click", (e) => {
   let inputSearch = document.getElementById("inputSearch");
   console.log(inputSearch)
   if (e.target.textContent === 'Search By Title') {
      inputSearch.placeholder = 'Search By Title';
      modeSearch = 'title'
   } else if (e.target.textContent === 'Search By category') {
      inputSearch.placeholder = 'Search By category';
      modeSearch = 'category'
   }
})

function search(value) {
   console.log(value)
   tbody.textContent = "";
   if (modeSearch === "title") {
      let fragment = document.createDocumentFragment();
      Products.forEach((Product, index) => {
         if (Product.title.includes(value))
            fragment.appendChild(createPro(Product, index));
      })
      tbody.appendChild(fragment);

   } else {
      let fragment = document.createDocumentFragment();
      Products.forEach((Product, index) => {
         if (Product.category.includes(value))
            fragment.appendChild(createPro(Product, index));
      })
      tbody.appendChild(fragment);
   }
}

getArray()
displayProducts()