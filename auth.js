function login() {
  const username = document.getElementById("username").value.trim();

  if (username === "") {
    alert("Enter a username");
    return;
  }

  localStorage.setItem("finora_current_user", username);
  window.location.href = "dashboard.html";
}
