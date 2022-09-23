// FETCH DATA from JSON
let products;

const url = "http://makeup-api.herokuapp.com/api/v1/products.json"; 
//const url = "response.json"; 

setTimeout(() => fetchData(), 3000);

function fetchData() {
  fetch(url)
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((result) => {
      products = result;
      console.log("all products", products);
      dataCleaning(products);
      //displayTable(cleanProducts);
      //displayCards(cleanProducts)
      funCombineFilters(cleanProducts)
      brandFilter();
      typeFilter();
      categoryFilter();
    });
}

// 1 fetch in async/await
/*const getDataAsync = async () => {
  const response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json")
  const data = await response.json()
  // console.log('data', data)
  // createHtmlTable(data)
  // createDropDown(data)
  return data
}*/

// DATA CLEANING FUNCTION
let cleanProducts;

function dataCleaning(products) {
  cleanProducts = products.filter(
    (product) => product.price >= 1.0 && product.description.length > 0
    && product.rating !== null && product.tag_list.length >0 && product.brand !== null 
  );
  console.log("cleanProducts", cleanProducts);
}


//Populate brand filter
function brandFilter() {
  // create list with unique values
  let lookup = {};
  let brand_list = [];

  cleanProducts.forEach((product, i) => {
    let brand = product.brand;

    //while (i<brand.length){
    if (!(brand in lookup)) {
      lookup[brand] = 1;
      brand_list.push(brand);
    }
    brand_list = brand_list.filter((n) => n); // remove empty entries from array
    //console.log(brand_list) // why does the output repeat itself?
    //}
  });

  // push unique values to select-form
  let select = document.getElementById("brandSelect");

  brand_list.forEach((options) => {
    let opt = options;
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  });
}

// Populate product type filter
function typeFilter() {
  // create list with unique values
  let lookup = {};
  let type_list = [];

  cleanProducts.forEach((product) => {
    let type = product.product_type;

    if (!(type in lookup)) {
      lookup[type] = 1;
      type_list.push(type);
    }
    type_list = type_list.filter((n) => n); // remove empty entries from array
    //console.log(type_list) // why does the output repeat it
  });

  // push unique values to select-form
  let select = document.getElementById("typeSelect");

  type_list.forEach((options) => {
    let opt = options;
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  });
}

// // Populate category filter
function categoryFilter() {
  // create list with unique values
  let lookup = {};
  let cat_list = [];

  cleanProducts.forEach((product) => {
    let cat = product.category;

    if (!(cat in lookup)) {
      lookup[cat] = 1;
      cat_list.push(cat);
    }
    cat_list = cat_list.filter((n) => n); // remove empty entries from array
    //console.log(cat_list) // why does the output repeat it
  });

  // push unique values to select-form
  let select = document.getElementById("catSelect");

  cat_list.forEach((options) => {
    let opt = options;
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  });
}

// Add event button to display more filters
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_hide_show
function showMore() {
  var x = document.getElementById("showMoreSection");
  var btnText = document.getElementById("myBtn");
  if (x.style.display === "none") {
    btnText.innerHTML = "Show less ↑ ";
    x.style.display = "block";
  } else {
    x.style.display = "none";
    btnText.innerHTML = "Show all filters ↓";
  }
}

///// Secondary filters -->
/// SORT BY FILTER

// Create a FUNCTION to filter based on SELECTED SORT OPTION

function funSort(x,products) {
  // Lowest price
  if (x === "ascPrice") {
    const productsByPriceASC = products.sort((a, b) => a.price - b.price);
    //console.log("productsByPriceASC", productsByPriceASC);
    return productsByPriceASC;
  }
  // Highest price
  else if (x === "descPrice") {
    const productsByPriceDESC = products.sort((a, b) => b.price - a.price);
    return productsByPriceDESC
  }

  // Highest rating
  else if (x === "descRating") {
    const productsByRatingDESC = products.sort(
      (a, b) => b.rating - a.rating
    );
    return productsByRatingDESC
  }
  else return products;
}

// COMBINE FILTERS

function funCombineFilters() {
  
  // SEARCH BAR
  let searchVal = document.querySelector('input[type="search"]').value;
  //let searchVal = searchTerm // ok

  console.log('test',searchVal) //ok

  // Drop Down Filters for brand, product type and category
   let brandVal = document.getElementById("brandSelect").value;
   let typeVal = document.getElementById("typeSelect").value;
   let catVal = document.getElementById("catSelect").value;

   // SORT FILTER
   let sortVal = document.getElementById("sortBySelect").value;
   
   // CHECKBOXES
   let checkedBoxes = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((checked) => checked.value)


 

  // COMBINE FUNCTION
    const combinedFilters = cleanProducts.filter((product) => {

          return (
            (product.brand === brandVal || brandVal === 'all') 
            && (product.product_type === typeVal || typeVal === 'all') 
            && (product.category === catVal || catVal === 'all')
            && (isInTaglist(product.tag_list, checkedBoxes) || checkedBoxes.length === 0)
            && (product.brand.toLowerCase().includes(searchVal.toLowerCase())) 
          )
        })
       
            console.log("combinedFilters", combinedFilters);
  

   // SortBy Filter
  const sortedProducts = funSort(sortVal, combinedFilters) 
  console.log("sorted", sortedProducts);
  displayCards(sortedProducts);
}

// Helper Function
function isInTaglist(tag_list, checkedBoxes){
    for (let j = 0; j < tag_list.length; j++) {
      if (checkedBoxes.includes(tag_list[j])){
        return true
      }
      else false
}}



// SEARCH BAR
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_trigger_button_enter

// let input = document.getElementById("searchInput");
let input = document.querySelector('input[type="search"]');
let searchTerm = ""

input.addEventListener("change", (event) => {
  searchTerm = event.target.value;
  //console.log("searchTerm", searchTerm); //ok
  
});

// search button
let search = document.getElementById("searchBtn");
search.addEventListener("click", handleSearch);

function handleSearch() {
  //let input = document.querySelector('input[type="search"]');
  //let search = input.value;
  //console.log('handleSearch',search); // ok
  funCombineFilters()
  funSearch(searchTerm);
}

// on enter
input.addEventListener("keypress", checkIfEnter);

function checkIfEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    handleSearch();
  }
}

// Create a FUNCTION to filter based on Search Term
function funSearch(x) {
  console.log("x", x);
  let filteredBySearchTerm = [];

  for (let i = 0; i < cleanProducts.length; i++) {
    if (x.includes(cleanProducts[i].product_type)) {
      filteredBySearchTerm.push(cleanProducts[i]);
    } else if (x.includes(cleanProducts[i].category)) {
      filteredBySearchTerm.push(cleanProducts[i]);
    } else if (x.includes(cleanProducts[i].brand)) {
      filteredBySearchTerm.push(cleanProducts[i]);
    } else if (x.includes(cleanProducts[i].name)) {
      filteredBySearchTerm.push(cleanProducts[i]);
    } else if (x.length > 3 && funSearchTags(cleanProducts[i], x)) {
      filteredBySearchTerm.push(cleanProducts[i]);
    } 
  }
  if(filteredBySearchTerm.length ===0) {
    document.getElementById("alert").style.display="inline-flex";
    
  }
  console.log("filteredBySearchTerm", filteredBySearchTerm);
  // call again the function that creates the table/list and send the filtered data
  displayCards(filteredBySearchTerm);
}


function funSearchTags(cleanProduct, x) { 
  const tags = cleanProduct.tag_list.filter((item) =>
    item.toLowerCase().includes(x.toLowerCase())
  );
  console.log("tags", tags);
  if (tags.length > 0) {
    return true;
  } else {
    return false;
  }
}
