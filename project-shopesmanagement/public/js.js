

let reqs = document.getElementById("request");
reqs.onclick = function () {

  const role = document.getElementById('role');

  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  console.log(name);
  if(name==''||email==''){
    alert("please enter valid details");
  }

  if (role.value === "user") {

    checkUserStatus(name, email);
  }
  if (role.value === "admin") {
    checkAdmin(name, email);
  }
};
let register = document.getElementById("register");
register.onclick = function () {
  sendregister();
}
function sendregister() {
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if(name==''||email==""){
    alert("please enter valid details");
  }
  var data = {
    name: document.getElementById("username").value,
    email: document.getElementById("email").value
  }
  console.log(data);
  fetch("http://localhost:3330/user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status >= 400) {
        console.log(data);
        throw new Error("bad response from server");
      }
    }).then(data => {
      alert("waiting for admin to accept the request. for more info check the email");

      const form = document.getElementById("userloginform");
      form.reset();
    })
}

function checkUserStatus(uname, uemail) {
  var data = {

    name: uname,
    email: uemail
  }

  fetch(`http://localhost:3330/login`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }

    })
    .then(response => {

      return response.json();

    })

    .then(res => {
      console.log(res);


      let status = res.user.verified;
      console.log(status);
      if (status) {
        let token = res.token;
        console.log(token);

        localStorage.setItem("token", token);
        window.location.href = "user.html";
      }

    }
    )
}

function checkAdmin(name, email) {
  var data = {
    name: name,
    email: email
  }

  fetch(`http://localhost:3330/admin`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }

    })
    .then(response => {
      console.log(response);
      return response.json();

    })

    .then(res => {
      console.log(res);

      let status = res.user.verified;
      console.log(status);
      if (status) {
        let token = res.token;
        console.log(token);
        localStorage.setItem("tokenadmin", token);
        window.location.href = "admin.html";
      }

    }
    )
}


