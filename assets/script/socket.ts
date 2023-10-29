const io = require('socket.io-client');

document.addEventListener('DOMContentLoaded', function () {
  const chatMessages = document.getElementById('chat-messages') as HTMLDivElement;
  const messgeInput = document.getElementById('messge-input') as HTMLInputElement;
  const userList = document.getElementById('user-list') as HTMLDivElement;
  const currentUsers = document.getElementById('current-users') as HTMLDivElement;
  const roomInfo = document.getElementById('room-info') as HTMLDivElement;
  const dmRoomInfo = document.getElementById('dm-room-info') as HTMLDivElement;
  const exitButton = document.getElementById('exit-button') as HTMLButtonElement;
  const roomsButton = document.getElementById('room-button') as HTMLButtonElement;
  const sendButton = document.getElementById('send-button') as HTMLButtonElement;
  const usersButton = document.getElementById('user-button') as HTMLButtonElement;
  const logoutButton = document.getElementById('logout-button') as HTMLButtonElement;
  const friendsButton = document.getElementById('friend-button') as HTMLButtonElement;

  const urlParams = new URLSearchParams(window.location.search);

  const roomNumber = urlParams.get('roomNumber');
  const dmNumber = urlParams.get('dmNumber');
  const friendName = urlParams.get('friendName');
  const name = urlParams.get('name');
  interface ChatData {
    name: string;
    room: string;
    message: string;
  }

  fetch('/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.status === 401) {
        window.location.href = `./index.html`;
      }
    })
    .catch(error => {
      alert('반복하여 오류 발생시 문의 바랍니다. abc@abc.com' + error);
    });

  if (roomNumber !== null || dmNumber !== null) {
    const socket = io();
    joinRoom();
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        fetch('/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            leaveRoom();
            window.location.href = `./index.html`;
          })
          .catch(error => {
            alert('반복하여 오류 발생시 문의 바랍니다. abc@abc.com' + error);
          });
      });
    }

    if (friendsButton) {
      friendsButton.addEventListener('click', () => {
        leaveRoom();
        window.location.href = `./friendRequests.html?name=${name}`;
      });
    }

    if (usersButton) {
      usersButton.addEventListener('click', () => {
        leaveRoom();
        window.location.href = `./users.html?name=${name}`;
      });
    }

    if (exitButton) {
      exitButton.addEventListener('click', () => {
        leaveRoom();
        backRooms();
      });
    }

    if (roomsButton) {
      roomsButton.addEventListener('click', () => {
        leaveRoom();
        backRooms();
      });
    }

    if (sendButton && messgeInput) {
      sendButton.addEventListener('click', () => {
        sendMessage();
      });
    }

    async function joinRoom() {
      if (roomInfo) {
        roomInfo.textContent = `방 번호: ${roomNumber}`;

        const data = {
          name,
          room: `room:${roomNumber}`,
        };

        await socket.emit('joinRoom', data);
      } else if (dmRoomInfo) {
        dmRoomInfo.textContent = `${friendName}님과의 채팅`;

        const data = {
          name,
          room: `dm:${dmNumber}`,
        };

        await socket.emit('joinRoom', data);
      }
    }

    async function sendMessage() {
      const message = messgeInput.value;

      if (name !== null && roomNumber !== null) {
        const data: ChatData = {
          name,
          room: `room:${roomNumber}`,
          message,
        };

        await socket.emit('sendMessage', data);
        messgeInput.value = '';
      } else if (name !== null && dmNumber !== null) {
        const data: ChatData = {
          name,
          room: `dm:${dmNumber}`,
          message,
        };

        await socket.emit('sendMessage', data);
        messgeInput.value = '';
      }
    }

    async function leaveRoom() {
      if (roomNumber) {
        const data = {
          name,
          room: `room:${roomNumber}`,
        };
        await socket.emit('leaveRoom', data);
      } else if (dmNumber) {
        const data = {
          name,
          room: `dm:${dmNumber}`,
        };
        await socket.emit('leaveRoom', data);
      }
    }

    socket.on('userJoined', (name: string) => {
      const joinMessage = document.createElement('div') as HTMLDivElement;
      joinMessage.textContent = `${name}님이 입장했습니다.`;
      chatMessages.appendChild(joinMessage);
    });

    socket.on('changeUserList', (data: string) => {
      if (currentUsers) {
        const userArr = data.split(',').sort();

        currentUsers.textContent = `현재 인원: ${userArr.length - 1}`;
        while (userList.firstChild) {
          userList.removeChild(userList.firstChild);
        }

        userArr.forEach(item => {
          if (item != '') {
            const userName = document.createElement('div') as HTMLDivElement;
            userName.textContent = item;
            userList.appendChild(userName);
          }
        });
      }
    });

    socket.on('receiveMessage', (data: ChatData) => {
      const userName = document.createElement('div') as HTMLDivElement;
      userName.textContent = data.name;
      chatMessages.appendChild(userName);

      const message = document.createElement('div') as HTMLDivElement;
      message.textContent = data.message;
      chatMessages.appendChild(message);
    });

    socket.on('leaveMessage', (leaveName: string) => {
      const message = document.createElement('div') as HTMLDivElement;
      message.textContent = `${leaveName}님이 퇴장하셨습니다.`;
      chatMessages.appendChild(message);
    });
  } else {
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        fetch('/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            window.location.href = `./index.html`;
          })
          .catch(error => {
            alert('반복하여 오류 발생시 문의 바랍니다. abc@abc.com' + error);
          });
      });
    }

    if (friendsButton) {
      friendsButton.addEventListener('click', () => {
        window.location.href = `./friendRequests.html?name=${name}`;
      });
    }

    if (usersButton) {
      usersButton.addEventListener('click', () => {
        window.location.href = `./users.html?name=${name}`;
      });
    }

    if (roomsButton) {
      roomsButton.addEventListener('click', () => {
        backRooms();
      });
    }
  }

  function backRooms() {
    window.location.href = `../main.html?name=${name}`;
  }
});
