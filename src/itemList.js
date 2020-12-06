
const addItem = () => {
    const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'))
    let item = document.getElementById('item').value;
    if (!item) {
        alert('Please enter item')
    } else if (currentUserDetails.groceryList.length < 5) {
        let list = document.getElementById('list');
        currentUserDetails.groceryList.push(item)
        sessionStorage.setItem('currentUser', JSON.stringify(currentUserDetails))

        list.innerHTML += `<li id ="list${currentUserDetails.groceryList.length - 1}"> <span>${currentUserDetails.groceryList.length}</span> ${item}  <span class="update-btn"><button onclick="remove(${currentUserDetails.groceryList.length - 1})" class="remove-btn" >-</button> <button onclick = "showEdit(${currentUserDetails.groceryList.length - 1})" class="edit-btn"> edit </button></span></li>`;
        
    } else {
        let modal = document.getElementById("showError");
        let span = document.getElementsByClassName("close")[0];
        let item = document.getElementById('item');

        span.onclick = function () {
            modal.style.display = "none";
            item.value = ''
        }
        document.getElementById('showError').style.display = 'block';
    }
    document.getElementById('item').value = ''
}

function updateUserData() {
    const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'))

    let registeredUser = JSON.parse(localStorage.getItem('userData'));
    registeredUser.filter((element, index) => {
        if (element.name == currentUserDetails.name) {
            registeredUser.splice(index, 1);
        }
    });
    localStorage.setItem('userData', JSON.stringify(registeredUser));
    registeredUser = JSON.parse(localStorage.getItem('userData'));
    registeredUser.push(currentUserDetails);
    localStorage.setItem('userData', JSON.stringify(registeredUser))
}

function remove(index) {
    const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    currentUserDetails.groceryList.splice(index, 1);
    sessionStorage.setItem('currentUser', JSON.stringify(currentUserDetails));
    location.reload()
}

function getGroceryList() {
    const list = JSON.parse(sessionStorage.getItem('currentUser'));
    var node = document.createElement("label");
    node.setAttribute("id", "username-label")
    var textnode = document.createTextNode(`Hi, ${list.name}`);
    node.appendChild(textnode);
    document.getElementById("username").prepend(node);


    list.groceryList.forEach((element, index) => {
        document.getElementById('list').innerHTML += `<li id="list${index}"><span class="order-list">${index + 1}</span> ${element}  <span class="update-btn"><button onclick="remove(${index})" class="remove-btn" >-</button>  <button onclick = "showEdit(${index})" class="edit-btn"> edit </button></span></li>`
    });

}

function logout() {
    updateUserData();
    const baseUrl = localStorage.getItem('baseUrl')
    sessionStorage.clear();
    location.replace(baseUrl + '/login.html')
}

function showEdit(index) {
    var node = document.createElement("p");
    var textnode = document.createTextNode(`You're editing item ${index + 1}`);
    node.appendChild(textnode);
    // appending index of item at the beginning 
    document.getElementById("contentId").prepend(node);
    document.getElementById('divEdit').style.display = "block";
    document.getElementById('confirmEdit').setAttribute("onclick", `editList(${index})`)
    document.getElementById('editItem').value = '';
}

function editList(index) {
    var parent = document.getElementById("contentId");
    parent.removeChild(parent.childNodes[0]);

    const edit = document.getElementById('editItem').value;
    if (!edit) {
        alert('No item is given')
    } else {

        // current user is updated
        const currentUserDetails = JSON.parse(sessionStorage.getItem('currentUser'))
        currentUserDetails.groceryList[index] = edit
        sessionStorage.setItem('currentUser', JSON.stringify(currentUserDetails))
        // appending list with buttons and class
        document.getElementById(`list${index}`).innerHTML = `<span class="order-list">${index + 1}</span> ${edit}  <span class="update-btn"><button onclick="remove(${index})" class="remove-btn" >-</button>  <button onclick = "showEdit(${index})" class="edit-btn"> edit </button></span>`;
    }
    document.getElementById('divEdit').style.display = "none";
}