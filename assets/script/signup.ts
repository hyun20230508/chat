document.addEventListener('DOMContentLoaded', function () {
  const loginIdInput = document.getElementById('username') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const signUpButton = document.getElementById('signup-button') as HTMLButtonElement;

  //회원가입
  signUpButton.addEventListener('click', () => {
    const loginId: string = loginIdInput.value;
    const password: string = passwordInput.value;
    const userData = {
      loginId: loginId,
      password: password,
    };

    fetch('/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (response.status === 201) {
          alert('회원가입에 성공했습니다. 로그인 후 이용해주세요.');
          window.location.href = './index.html';
        } else if (response.status === 412) {
          alert('이미 가입된 id입니다.');
        } else {
          alert('비밀번호는 영어, 특수문자, 숫자를 포함한 8자리 이상이어야합니다.');
        }
      })
      .catch(error => {
        alert('반복하여 오류 발생시 문의 바랍니다. abc@abc.com' + error);
      });
  });
});
