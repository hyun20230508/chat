document.addEventListener('DOMContentLoaded', function () {
  const mainContent = document.querySelector('.main-content');
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  fetch('/friends', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.result !== undefined) {
        const userList = data.result;
        for (let i = 0; i < userList.length; i++) {
          const userListBox = document.createElement('div');
          userListBox.classList.add('user-list-box');

          const userListInfo = document.createElement('div');
          userListInfo.classList.add('user-list-info');
          userListInfo.innerText = `ID: ${userList[i].user.loginId}  친구수락날짜: ${convertTime(
            userList[i].createdAt
          )}`;

          const deleteButton = document.createElement('button');
          deleteButton.classList.add('add-button');
          deleteButton.innerText = '친구 삭제';

          const dmButton = document.createElement('button');
          dmButton.classList.add('add-button');
          dmButton.innerText = 'DM';

          deleteButton.addEventListener('click', () => {
            fetch('/friends', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ friendId: userList[i].userId }),
            })
              .then(response => {
                if (response.status === 201) {
                  alert('친구삭제 완료');
                  window.location.reload();
                } else if (response.status === 401) {
                  window.location.href = `./index.html`;
                } else {
                  response.json().then(data => {
                    alert(data.result);
                  });
                }
              })
              .catch(error => {
                alert('반복하여 오류 발생시 문의 바랍니다. abc@abc.com' + error);
              });
          });

          dmButton.addEventListener('click', () => {
            const roomNumberList = [userList[i].friendId, userList[i].userId].sort((a, b) => a - b);
            window.location.href = `./dm.html?name=${name}&dmNumber=${String(roomNumberList[0])}${String(
              roomNumberList[1]
            )}&friendName=${userList[i].user.loginId}`;
          });

          userListBox.appendChild(userListInfo);
          userListBox.appendChild(deleteButton);
          userListBox.appendChild(dmButton);
          mainContent?.appendChild(userListBox);
        }
      }
    })
    .catch(error => {
      alert('반복하여 오류 발생시 문의 바랍니다. abc@abc.com' + error);
    });

  const convertTime = (time: string) => {
    let date = new Date(time);
    return date.toLocaleString('ko-KR');
  };
});
