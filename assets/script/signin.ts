document.addEventListener('DOMContentLoaded', function () {
  const loginIdInput = document.getElementById('username') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const signInButton = document.getElementById('signin-button') as HTMLButtonElement;

  //페이지 접근 시 로그인 여부 확인
  function checkLoginStatus() {
    const cookies: string = document.cookie;
    if (cookies.includes('Authorization=Bearer%20')) {
      fetch('/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.result !== undefined) {
            window.location.href = `./main.html?name=${data.result}`;
          }
        })
        .catch(error => {
          alert('반복하여 오류 발생시 문의 바랍니다. abc@abc.com' + error);
        });
    }
  }

  checkLoginStatus();

  //로그인
  signInButton.addEventListener('click', () => {
    const loginId: string = loginIdInput.value;
    const password: string = passwordInput.value;
    const userData = {
      loginId: loginId,
      password: password,
    };

    fetch('/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (response.status === 201) {
          window.location.href = `./main.html?name=${loginId}`;
          console.log('로그인이 성공했습니다.');
        } else {
          alert('아이디와 비밀번호를 확인해주세요.');
        }
      })
      .catch(error => {
        alert('반복하여 오류 발생시 문의 바랍니다. abc@abc.com' + error);
      });
  });
});
