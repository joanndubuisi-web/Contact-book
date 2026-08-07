// Store all contacts
let contacts = [];

// Get items from HTML
let nameInput = document.getElementById("name");
let phoneInput = document.getElementById("phone");
let emailInput = document.getElementById("email");

let saveButton = document.getElementById("save");
let searchInput = document.getElementById("search");

let totalContacts = document.getElementById("totalContacts");
let message = document.getElementById("message");

// Create a place to display contacts
let contactList = document.createElement("div");
document.body.appendChild(contactList);

// Load saved contacts
loadContacts();

// Display contacts when page opens
displayContacts();

// Save button
saveButton.addEventListener("click", function (event) {
    event.preventDefault();

    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();
    let email = emailInput.value.trim();

    // Clear old errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("emailError").textContent = "";

    // Simple validation
    if (name === "") {
        document.getElementById("nameError").textContent = "Enter a name";
        return;
    }

    if (phone === "") {
        document.getElementById("phoneError").textContent = "Enter a phone number";
        return;
    }

    if (email === "") {
        document.getElementById("emailError").textContent = "Enter an email";
        return;
    }

    // Create contact object
    let contact = {
        id: Date.now(),
        name: name,
        phone: phone,
        email: email
    };

    // Add to array
    contacts.push(contact);

    // Save to browser
    saveContacts();

    // Show contacts
    displayContacts();

    // Clear form
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
});

// Display contacts
function displayContacts() {

    contactList.innerHTML = "";

    if (contacts.length === 0) {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }

    totalContacts.textContent = contacts.length;

    for (let i = 0; i < contacts.length; i++) {

        let card = document.createElement("div");
        card.className = "contact";

        let name = document.createElement("h3");
        name.textContent = contacts[i].name;

        let phone = document.createElement("p");
        phone.textContent = "Phone: " + contacts[i].phone;

        let email = document.createElement("p");
        email.textContent = "Email: " + contacts[i].email;

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(email);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        contactList.appendChild(card);
    }
}

// Save contacts
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Load contacts
function loadContacts() {

    let saved = localStorage.getItem("contacts");

    if (saved != null) {
        contacts = JSON.parse(saved);
    }
}

// Variable used when editing
let editId = null;


// Display Contacts
function displayContacts() {

    contactList.innerHTML = "";

    if (contacts.length == 0) {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }

    totalContacts.textContent = contacts.length;

    let searchText = searchInput.value.toLowerCase();

    for (let i = 0; i < contacts.length; i++) {

        if (!contacts[i].name.toLowerCase().includes(searchText)) {
            continue;
        }

        let card = document.createElement("div");
        card.className = "contact";

        let name = document.createElement("h3");
        name.textContent = contacts[i].name;

        let phone = document.createElement("p");
        phone.textContent = "Phone: " + contacts[i].phone;

        let email = document.createElement("p");
        email.textContent = "Email: " + contacts[i].email;

        // Edit Button
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function () {

            nameInput.value = contacts[i].name;
            phoneInput.value = contacts[i].phone;
            emailInput.value = contacts[i].email;

            editId = contacts[i].id;

            saveButton.textContent = "Update";
        };

        // Delete Button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {

            if (confirm("Delete this contact?")) {

                contacts.splice(i, 1);

                saveContacts();

                displayContacts();
            }
        };

        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(email);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        contactList.appendChild(card);
    }
}


// Save / Update Contact
saveButton.onclick = function (event) {

    event.preventDefault();

    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();
    let email = emailInput.value.trim();

    document.getElementById("nameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("emailError").textContent = "";

    if (name == "") {
        document.getElementById("nameError").textContent = "Enter a name";
        return;
    }

    if (phone == "") {
        document.getElementById("phoneError").textContent = "Enter a phone number";
        return;
    }

    if (email == "") {
        document.getElementById("emailError").textContent = "Enter an email";
        return;
    }

    if (editId == null) {

        let contact = {
            id: Date.now(),
            name: name,
            phone: phone,
            email: email
        };

        contacts.push(contact);

    } else {

        for (let i = 0; i < contacts.length; i++) {

            if (contacts[i].id == editId) {

                contacts[i].name = name;
                contacts[i].phone = phone;
                contacts[i].email = email;

                break;
            }
        }

        editId = null;

        saveButton.textContent = "Save";
    }

    saveContacts();

    displayContacts();

    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
};


// Search Contacts
searchInput.addEventListener("keyup", function () {

    displayContacts();

});


// Cancel Button
document.getElementById("cancel").onclick = function () {

    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";

    editId = null;

    saveButton.textContent = "Save";
};