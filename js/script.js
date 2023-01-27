var variant;
var counter = 1;

var cookiesData = [
  {
    product: [],
    address: "",
    total: 0,
    nama: "",
  },
];

// Clear cart every load
window.onload = function () {
  sessionStorage.clear();
};

// Change product image
function puddingVariant(variant) {
  if (variant == "cheese-churros") {
    this.style.zIndex = ++counter;
  }
  if (variant == "strawberry") {
    document.getElementById("strawberry-pudding").style.zIndex = ++counter;
  }
  if (variant == "chocolate") {
    document.getElementById("chocolate-pudding").style.zIndex = ++counter;
  }
  if (variant == "chococookies") {
    document.getElementById("chococookies-pudding").style.zIndex = ++counter;
  }
  if (variant == "greentea") {
    document.getElementById("greentea-pudding").style.zIndex = ++counter;
  }
  if (variant == "bubblegum") {
    document.getElementById("bubblegum-pudding").style.zIndex = ++counter;
  }
  if (variant == "biscuit") {
    document.getElementById("biscuit-pudding").style.zIndex = ++counter;
  }
}

function churrosVariant(variant) {
  if (variant == "cheese-churros") {
    document.getElementById("cheese-churros").style.zIndex = ++counter;
  }
  if (variant == "chocolate-churros") {
    document.getElementById("chocolate-churros").style.zIndex = ++counter;
  }
}

$('input[name="pudding-variant"]').on("change", function () {
  var puddingVariant = document.querySelector('input[name="pudding-variant"]:checked').value;

  document.getElementById("pudding-flavour").innerHTML = puddingVariant;
  document.getElementById("pudding-quantity").value = 1;
  document.getElementById("pudding-quantity").readOnly = false;
});

$('input[name="churros-variant"]').on("change", function () {
  var churrosVariant = document.querySelector('input[name="churros-variant"]:checked');
  var churrosTopping = document.querySelector('input[name="churros-topping"]:checked');

  if (churrosVariant && churrosTopping) {
    document.querySelector("#add-churros").disabled = false;
  }

  document.getElementById("churros-flavour").innerHTML = churrosVariant.value;
  document.getElementById("churros-quantity").value = 1;
  document.getElementById("churros-quantity").readOnly = false;
});

$('input[name="churros-topping"]').on("change", function () {
  var churrosVariant = document.querySelector('input[name="churros-variant"]:checked');
  var churrosTopping = document.querySelector('input[name="churros-topping"]:checked');

  if (churrosVariant && churrosTopping) {
    document.querySelector("#add-churros").disabled = false;
  }

  document.getElementById("churros-topping").innerHTML = "with " + churrosTopping.value;
});

// Cart script
function inputAddress() {
  cookiesData[0]["address"] = document.querySelector('input[name="address"]').value;
}

function inputName() {
  cookiesData[0]["nama"] = document.querySelector('input[name="name"]').value;
}

function addToCart(element) {
  var productParent = $(element).closest("div.product-text");

  var price = $(productParent).find(".price span").text();
  var productName = $(productParent).find('input[name="pudding-variant"]:checked').val();
  var quantity = $(productParent).find(".quantity").val();

  var cartItem = {
    productName: productName,
    price: price,
    quantity: quantity,
  };
  var cartItemJSON = JSON.stringify(cartItem);

  var cartArray = new Array();
  if (sessionStorage.getItem("shopping-cart")) {
    cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
  }
  cartArray.push(cartItemJSON);

  var cartJSON = JSON.stringify(cartArray);
  console.log(cartJSON);
  sessionStorage.setItem("shopping-cart", cartJSON);
  showCartTable();

  var i = cookiesData[0]["product"].length;
  cookiesData[0]["product"][i] = productName + " " + quantity;
  cookiesData[0]["total"] = cookiesData[0]["total"] + parseInt(price);
  console.log(cookiesData);
}

function addChurrosToCart(element) {
  var productParent = $(element).closest("div.churros-text");

  var price = $(productParent).find(".price span").text();
  var productName = $(productParent).find('input[name="churros-variant"]:checked').val();
  var topping = $(productParent).find('input[name="churros-topping"]:checked').val();
  var quantity = $(productParent).find(".quantity").val();

  var cartItem = {
    productName: productName + " with " + topping,
    price: price,
    quantity: quantity,
  };
  var cartItemJSON = JSON.stringify(cartItem);

  var cartArray = new Array();
  if (sessionStorage.getItem("shopping-cart")) {
    cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
  }
  cartArray.push(cartItemJSON);

  var cartJSON = JSON.stringify(cartArray);
  console.log(cartJSON);
  sessionStorage.setItem("shopping-cart", cartJSON);
  showCartTable();
  var i = cookiesData[0]["product"].length;
  cookiesData[0]["product"][i] = productName + " with " + topping + " " + quantity;
  cookiesData[0]["total"] = cookiesData[0]["total"] + parseInt(price);
  console.log(cookiesData);
}

function emptyCart() {
  if (sessionStorage.getItem("shopping-cart")) {
    sessionStorage.removeItem("shopping-cart");
    showCartTable();
  }
  document.getElementById("cart-counter").style.display = "none";
  cookiesData[0]["product"] = {};
  cookiesData[0]["total"] = 0;
}

function showCartTable() {
  var cartRowHTML = "";
  var itemCount = 0;
  var grandTotal = 0;

  var price = 0;
  var quantity = 0;
  var subTotal = 0;

  if (sessionStorage.getItem("shopping-cart")) {
    var shoppingCart = JSON.parse(sessionStorage.getItem("shopping-cart"));
    itemCount = shoppingCart.length;

    shoppingCart.forEach(function (item) {
      var cartItem = JSON.parse(item);
      price = parseFloat(cartItem.price);
      quantity = parseInt(cartItem.quantity);
      subTotal = price * quantity;

      cartRowHTML += "<tr>" + "<td>" + cartItem.productName + "</td>" + "<td>" + quantity + "</td>" + "<td>Rp. " + subTotal.toFixed(2) + "</td>" + "</tr>";

      grandTotal += subTotal;
    });
  }

  $("#cart-counter span").html(itemCount);
  document.getElementById("cart-counter").style.display = "flex";
  $("#cartTableBody").html(cartRowHTML);
  $("#itemCount").text(itemCount);
  $("#totalAmount").text("Rp. " + grandTotal.toFixed(2));
}

function showTables() {
  document.getElementById("shopping-cart").classList.toggle("show");
}

// Hamburger menu
const menuToggle = document.querySelector(".menu-toggle input");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
});
