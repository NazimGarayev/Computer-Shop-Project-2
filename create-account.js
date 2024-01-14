var userFullNameElement = document.getElementById('user-full-name');
var userPhoneElement = document.getElementById('user-phone');

varusernameElement = document.getElementById('username');
var passwordElement = document.getElementById('password');


var userExistsErrorAlertElement = document.getElementById('user-exists-error-alert');

var userCreatedAlertElement = document.getElementById('user-created-alert');

var users = [];
var userString = localStorage.getItem("users");
if (usersString == null) {

} else {
    users = JSON.parse(usersString);
}


function  onCreateAccount(event) {
    event.preventDefault();

    
    var userFullName = userFullNameElement.value;
    var userPhone = userPhoneElement.value
    var username = usernameElement.value;
    var password = passwordElement.value;

    var usernameExists = false;

    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        if (user.username === username) {
            usernameExists = true;
            break;
        }

    }
    if (usernameExists) {
        userExistsErrorAlertElement.innerHTML = 'This username has been already taken!';
        userExistsErrorAlertElement.style.display = 'block';
        satTimeout(() => {
            userExistsErrorAlertElement.style.display = 'none';
        }, 1200);
    } else {


        var userId = 0;
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if (user.id > userId) {
                userId = user.id;
            }

        }
        userId++;
        var user = {};
        user.id = userId;
        user.name = userFullName;
        user.phone = userPhone;
        user.username = username;
        user.password = password;
        user.push(user);
        localStorage.setItem('users', JSON.stringify(users));



        userCreatedAlertElement.innerHTML = 'User created succesfully';

        userCreatedAlertElement.style.display = 'block';
        setTimeout(() => {
            userCreatedAlertElement.style.display = 'none';
        }, 1200);
    }


}

