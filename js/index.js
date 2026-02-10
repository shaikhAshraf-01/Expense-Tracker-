let login_form = document.getElementById("login-form");
let register_form = document.getElementById("register-form");
let show_login = document.getElementById("show-login");
let show_register = document.getElementById("show-register");

let login_btn = document.getElementById("login-btn");
let register_btn = document.getElementById("register-btn");

function hide(){
  login_form.classList.add("hidden");
  register_form.classList.add("hidden");
}
show_register.addEventListener("click", function(){
  hide();
  register_form.classList.remove("hidden");
});
show_login.addEventListener("click", function(){
  hide();
  login_form.classList.remove("hidden");
});

register_btn.addEventListener('click',()=>{
  let username=document.getElementById("registerUsername").value.trim();
  let password=document.getElementById("registerPassword").value.trim();
  let confirm_password=document.getElementById("registerConfirmPassword").value.trim();

  if(!username || !password ) return alert("Please fill in all fields");
  if(password !== confirm_password) return alert("Passwords do not match");
   // Get existing users or empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    if (users.find(u => u.username === username)) {
        return alert("Username already taken!");
    }
users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful! Please login.");
     window.location.href = "./html/dashboard.html";
});

login_btn.addEventListener('click',()=>{
  let username=document.getElementById("loginUsername").value.trim();
  let password=document.getElementById("loginPassword").value.trim();

  if(!username || !password ) return alert("Please fill in all fields");

    // Get existing users or empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists and password matches
    let user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert("Login Successful!");
        // Redirect to dashboard or home page
        window.location.href = "./html/dashboard.html"; 
    } else {
        alert("Invalid username or password!");
    }
})
