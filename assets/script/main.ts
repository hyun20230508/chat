document.addEventListener('DOMContentLoaded', function () {
  const mainContent = document.querySelector('.main-content');

  fetch('/chats', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.result !== undefined) {
        const chatRoomsData = data.result.sort(function (
          a: { participants: number; room: number },
          b: { participants: number; room: number }
        ) {
          return b.room === a.room ? a.room - b.room : a.room - b.room;
        });

        for (let i = 0; i < chatRoomsData.length; i++) {
          if (chatRoomsData[i].room === null) {
            continue;
          }
          const chatRoomBox = document.createElement('div');
          chatRoomBox.classList.add('chat-room-box');

          const chatRoomInfo = document.createElement('div');
          chatRoomInfo.classList.add('chat-room-info');
          chatRoomInfo.innerText = `참여인원 수: ${chatRoomsData[i].participants}  방 번호: ${chatRoomsData[i].room}`;

          const enterButton = document.createElement('button');
          enterButton.classList.add('enter-button');
          enterButton.innerText = '입장';

          enterButton.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get('name');
            window.location.href = `../chatRoom.html?name=${name}&roomNumber=${chatRoomsData[i].room}`;
          });

          chatRoomBox.appendChild(chatRoomInfo);
          chatRoomBox.appendChild(enterButton);
          mainContent?.appendChild(chatRoomBox);
        }
      }
    })
    .catch(error => {
      alert('반복하여 오류 발생시 문의 바랍니다. abc@abc.com' + error);
    });
});
