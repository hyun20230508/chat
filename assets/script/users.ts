document.addEventListener('DOMContentLoaded', function () {
  const mainContent = document.querySelector('.main-content');
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  fetch('/users/list', {
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
          if (userList[i].loginId === name) {
            continue;
          }
          const userListBox = document.createElement('div');
          userListBox.classList.add('user-list-box');

          const userListInfo = document.createElement('div');
          userListInfo.classList.add('user-list-info');
          userListInfo.innerText = `ID: ${userList[i].loginId}  가입날짜: ${convertTime(
            userList[i].createdAt
          )}  친구수: ${userList[i].friends}`;

          const addButton = document.createElement('button');
          addButton.classList.add('add-button');
          addButton.innerText = '친구 요청';

          addButton.addEventListener('click', () => {
            fetch('/friendRequests', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ friendId: userList[i].id }),
            })
              .then(response => {
                if (response.status === 201) {
                  alert('친구요청 완료');
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

          userListBox.appendChild(userListInfo);
          userListBox.appendChild(addButton);
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
