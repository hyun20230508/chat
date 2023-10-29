document.addEventListener('DOMContentLoaded', function () {
  const requestButton = document.getElementById('request-button') as HTMLButtonElement;
  const friendListButton = document.getElementById('friendList-button') as HTMLButtonElement;

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  if (requestButton) {
    requestButton.addEventListener('click', () => {
      window.location.href = `./friendRequests.html?name=${name}`;
    });
  }

  if (friendListButton) {
    friendListButton.addEventListener('click', () => {
      window.location.href = `./friends.html?name=${name}`;
    });
  }
});
