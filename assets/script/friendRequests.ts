document.addEventListener('DOMContentLoaded', function () {
  const mainContent = document.querySelector('.main-content');

  fetch('/friendRequests', {
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
          userListInfo.innerText = `ID: ${userList[i].user.loginId}  가입날짜: ${convertTime(userList[i].createdAt)}`;

          const acceptButton = document.createElement('button');
          acceptButton.classList.add('add-button');
          acceptButton.innerText = '수락';

          const refuseButton = document.createElement('button');
          refuseButton.classList.add('add-button');
          refuseButton.innerText = '거절';

          acceptButton.addEventListener('click', () => {
            fetch('/friends', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId: userList[i].userId }),
            })
              .then(response => {
                if (response.status === 201) {
                  alert('친구요청 수락 완료');
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

          refuseButton.addEventListener('click', () => {
            fetch('/friendRequests', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId: userList[i].userId }),
            })
              .then(response => {
                if (response.status === 201) {
                  alert('친구요청 거절 완료');
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

          userListBox.appendChild(userListInfo);
          userListBox.appendChild(acceptButton);
          userListBox.appendChild(refuseButton);
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
