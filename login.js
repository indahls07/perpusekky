const validUsername = "ekky";
const validPassword = "123";

function handleLogin() {
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const messageElement = document.getElementById("message");

  messageElement.textContent = "";

  if (usernameInput === validUsername && passwordInput === validPassword) {
    alert(
      "Login Berhasil! Haiiiii.....Selamat datang-from ekky " +
        validUsername +
        "."
    );

    window.location.href = "perpus.html";
  } else {
    messageElement.textContent = "Username atau Password salah. Coba lagi!";
  }
}
