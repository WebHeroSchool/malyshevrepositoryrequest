let url = window.location.toString();

let getUserName = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if (userName == undefined){
        userName = 'malyshevmaxim';
    }
    return userName
}

let name = getUserName(url)

fetch('https://api.github.com/users/' + name)
  .then(res => res.json())
  .then(json => {
  	let avatar = json.avatar_url;
  	let name = json.login;
  	let bio = json.bio;
  	let profile = json.html_url;
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

    	createProfile();
    	createBio();
    	createAvatar();
        } else {
        	alert('Информация о пользователе не доступна.');
        	setTimeout(function() {
        		window.location.href = 'https://webheroschool.github.io/malyshevrepositoryrequest/';
        	}, 2000);
        }
    })
    .catch(err => alert(err + 'Информация о пользователе не доступна!'));