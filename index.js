function login() {
    const discordAuthButton = document.getElementById("discord-auth-button");
        
        discordAuthButton.addEventListener("click", function() {
          const discordAuthUrl = "https://discord.com/api/oauth2/authorize?client_id=1072173525659562065&redirect_uri=http://77.207.0.239:5678/User/user.html&response_type=token&scope=identify";
          window.location.replace(discordAuthUrl);
        });
}
