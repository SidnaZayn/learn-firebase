import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { appSettings } from "./db_key";

const app = initializeApp(appSettings);
const database = getDatabase(app);
const carts = ref(database, "shopping-cart");

const addButton = document.getElementById('add-cart');
const list_ul = document.getElementById('lists-ul');
const txt = document.getElementById('input')
const items = document.getElementsByClassName('item');

onValue(carts, (snapshot) => {
    let itemArray = Object.values(snapshot.val());
    let keyArray = Object.keys(snapshot.val());
    clearShoppingList()

    itemArray.forEach(item => {
        pushTextToList(item)
    });

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('dblclick', () => {
            removeItemFromList(keyArray[i]);
        })
    }
})

addButton.addEventListener('click', () => {
    push(carts, txt.value)
    clearInputVal()
});

function clearShoppingList() {
    list_ul.innerHTML = ""
}

function pushTextToList(param) {
    list_ul.innerHTML += `<li class="item">${param}</li>`
}

function clearInputVal() {
    txt.value = ""
}

function removeItemFromList(itemId) {
    let selectedItem = ref(database, `shopping-cart/${itemId}`);
    remove(selectedItem)
}