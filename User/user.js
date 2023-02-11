
const userInfoDiv = document.getElementById("user-info");
const userAvatarImg = document.getElementById("user-avatar");
const userUsernameP = document.getElementById("user-username");
      
const accessToken = getAccessTokenFromUrl();
if (accessToken) {
  fetch("https://discord.com/api/users/@me", {
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  })
    .then(response => response.json())
    .then(user => {
      userAvatarImg.src = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "";
      userUsernameP.innerText = user.username;
      userInfoDiv.style.display = "block";
      discordAuthButton.style.display = "none";
    });
}

function getAccessTokenFromUrl() {
  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  return urlParams.get("access_token") || null;
}
