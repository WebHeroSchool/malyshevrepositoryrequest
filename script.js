let url = window.location.toString();
let preloader = document.getElementById('preloader');

let getUserName = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if (userName == undefined){
        userName = 'malyshevmaxim';
    }
    return userName
}

let name = getUserName(url)


let getNowDate = new Promise((resolve, reject) => {
    let nowDate = new Date();
    setTimeout(() => nowDate ? resolve(nowDate) : reject ('Ошибка вычисления'), 3000)
  });


let getUserData = fetch('https://api.github.com/users/' + name);


Promise.all([getUserData, getNowDate])
    .then(([ourUserData, ourNowDate]) => {
        userData = ourUserData;
        currentDate = ourNowDate;
    })

  .then(res => userData.json())
  .then(userInfo => {
      let avatar = userInfo.avatar_url;
      let name = userInfo.login;
      let bio = userInfo.bio;
      let profile =userInfo.html_url;
      if (name) {

       let createAvatar = () => {
          let newAvatar = document.createElement('img');
          newAvatar.src = avatar;
          let addString = document.createElement('br');
          document.body.appendChild(newAvatar);
          document.body.appendChild(addString);
          }

           let createBio = () => {
              let newBio = document.createElement('p');
              newBio.innerHTML = bio;
              document.body.appendChild(newBio);
              }

            let createProfile = () => {
                let elementForLink = document.createElement('a');
                let elementForHeader = document.createElement('h2');
                elementForHeader.innerText = name;
                elementForLink.href = profile;
                document.body.appendChild(elementForLink);
                elementForLink.appendChild(elementForHeader);
                }

                let createDate = () => {
                let newCurrentDate = document.createElement('p');
                newCurrentDate.innerHTML = currentDate;
                document.body.appendChild(newCurrentDate);
            }

            preloader.style.display = 'none';
            createProfile();
            createBio();
            createAvatar();
            createDate();
        }
        else {
            alert('Информация о пользователе не доступна.');
        	setTimeout(function() {
        		window.location.href = 'https://webheroschool.github.io/malyshevrepositoryrequest/';
        	}, 2000);
        }
    })

    .catch(err => alert(err + 'Информация о пользователе не доступна'));