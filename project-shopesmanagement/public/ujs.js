var token;
window.onload = function () {
  token = localStorage.getItem("token");
  console.log(token);
  if (!token) {

    window.location.href = "index.html";
    console.log(token)
  }
  else {

    getuserlocation();

  }
}

function userlocation() {
  const location = document.getElementById("enter-location").value;
  console.log(location);
  getAllShopsloc(location);
}


function getAllShopsloc(location) {

  // console.log(location);

const token =localStorage.getItem("token");
  fetch(`http://localhost:3330/shops/${location}`,{
    method:'GET',
    headers:{
    'Authorization': 'Bearer ' + token
    }
  })
    .then(response => response.json())
    .then(data => { displayShopsloc(data) })
    .catch(error => console.error('Error:', error));
}


function displayShopsloc(shops) {
  console.log(shops);
  var container=document.getElementById("container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
}
  shops.forEach(shop => {
    console.log(shop);
    const box = document.getElementById("container");
    const div = document.createElement("div");
    div.id = shop.id;
    div.className = "box"
    const name = document.createElement("H3");
    const address = document.createElement("p");
    name.innerHTML = `<u>${shop.name}</u>`;
    address.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${shop.location}`;
    const rating = document.createElement("p");
    rating.innerHTML = `<i class="fa-solid fa-star"></i>   ${shop.rating}`
    const contact = document.createElement("p");
    contact.innerHTML = `<i class="fa-solid fa-phone-volume"></i>  ${shop.contact_number}`
    const website = document.createElement("p");
    website.innerHTML = `<i class="fa-solid fa-earth-americas"></i>  ${shop.website}`
    const openinghrs = document.createElement("p");
    openinghrs.innerHTML = `<i class="fa-solid fa-door-open"></i>  ${shop.opening_hours}`
    const link = document.createElement("a");
    link.href = shop.on_maps;
    link.target = "_blank";
    link.innerHTML = `<i class="fa-solid fa-link"></i> see on maps `
    link.style.color = "sky blue";
    div.appendChild(name);
    div.appendChild(address);
    div.appendChild(rating);
    div.appendChild(contact);
    div.appendChild(website);
    div.appendChild(openinghrs);
    div.appendChild(link);
    box.appendChild(div);
  })
}


function logout() {
  window.localStorage.removeItem("token");

  location.reload();

}


function getuserlocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        console.log(data.address.state);
        getAllShopsloc(data.address.state);

      }).catch(() => {
        console.log("error fetching data");
      });

    }, (error) => {
      console.error(error);
    });
  }
};


