const logout = document.querySelector('.lg-btn');
logout.addEventListener('click',logoutUser)
async function logoutUser(e) {
  e.preventDefault();
    const result = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        if (res.ok) {
          window.location.href = "/";
        }
      });
      console.log(result);

}

async function displayUsername () {
  await fetch('/api/user', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(res => res.json())
  .then(data => {
    console.log('data',data)
    const displayUsername = document.querySelector('.nav-username');
    displayUsername.innerHTML += `<p>Hi,${data.username}</p>`

  })
    .catch(error => {
      console.log(error)
    });
}
displayUsername()