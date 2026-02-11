let profileBtn=document.getElementById(`profile-btn`);
let dropDown=document.getElementById(`dropdown`);

// 1. Get the current user from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// 2. Security Check: If no user data found, kick them back to login
if (!currentUser) {
    window.location.href = "../index.html"; 
} else {
    // 3. Update the button text with the logged-in user's name
    // We use innerHTML to keep the Font Awesome icon intact
    profileBtn.innerHTML = `<i class="fa-solid fa-user"></i> ${currentUser.registerName}`;
}

// Your existing dropdown logic
profileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropDown.style.display = dropDown.style.display === "flex" ? "none" : "flex";
});

window.addEventListener('click', () => {
    dropDown.style.display = "none";
});

// 4. Logout Logic
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser"); // Clear the session
    window.location.href = "../index.html"; // Go back to login
});
