const login = () =>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    const user = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    // console.log(userData[0])
    debugger
    const userInfo = userData.filter(element=> element.name == user && element.password== password)
    console.log(userInfo)
    
    if(userInfo.length>0){
        const baseUrl = localStorage.getItem('baseUrl')
        location.replace(baseUrl+'/userGroceryList.html')

        sessionStorage.setItem('currentUser',JSON.stringify(userInfo[0]))
    } else{
        let modal = document.getElementById("showError");
    let span = document.getElementsByClassName("close")[0];
    let name = document.getElementById('name');
    let password = document.getElementById('password');

    span.onclick = function () {
        modal.style.display = "none";
        name.value = '';
        password.value = '';
    }
    document.getElementById('showError').style.display = 'block';
    }
}