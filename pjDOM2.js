/**
    Senario: Backend Developer has the data, and he send you the data and you request this data by AJAX for example and manipulate this datate
*/

let input = document.getElementById("input_text");
let button = document.querySelector("#btn_add");
let added_content = document.querySelector(".products_container");

const data = [
    { id: 1, title: "product 1", desc: "this is keyboard" },
    { id: 2, title: "product 2", desc: "this is mouse" },
    { id: 3, title: "product 3", desc: "this is monitor" },
    { id: 4, title: "product 4", desc: "this is bundle" },
];
// ADD, MODIFY, DELETE
function add_element() {
    if (input.value === "") {
        return;
    }
    const dataAdded = {
        id: data.length + 1,
        title: input.value,
        desc: "this is bla bla bla",
    };
    // add data in array(database)
    data.push(dataAdded);
    // draw data in webpage
    drawdom(dataAdded);
    // clear input value
    input.value = "";
}
// modify function
function modify_element(ev) {
    // Select target which need modify
    let parent = ev.target.parentElement.parentElement;
    let content = parent.children[0].innerText;
    input.value = content; // #TEXT
    input.focus();

    // console.log(parent.childNodes[0].nodeValue);
    button.childNodes[0].nodeValue = "Modify";
    button.children[0].style.visibility = "visible";
    // remove "modification Mode"
    let xmark = button.children[0];
    xmark.onclick = () => {
        xmark.style.visibility = "hidden";
        button.childNodes[0].nodeValue = "Add Product";
    };
    button.onclick = function (ev) {
        console.log(ev);
        if (ev.target == button) {
            // i need this function isolated it
            const indx = parent.parentElement.getAttribute("data-curr") - 1;
            data[indx].title = input.value;
            parent.children[0].innerText = data[indx]["title"];
        } else {
            button.onclick = add_element;
        }
    };
}
// Draw UI Functions

// for list of items
function drawdoms(items) {
    data.forEach(function (item) {
        drawdom(item);
    });
}
// for just one item
function drawdom(item) {
    let indx = data[item.id - 1]["id"];
    const dataItem = document.createElement("div");
    dataItem.setAttribute("data-curr", `${indx}`);
    dataItem.innerHTML = `
    <div class="item">
        <div class="name"> ${item.title} </div>
    </div>`;
    dataItem.children[0].appendChild(controller());
    // dataItem.children[0].appendChild(controller());
    added_content.appendChild(dataItem);
}

// add functions div (controller div)
function controller() {
    const contr = document.createElement("div");
    contr.setAttribute("id", "controller");
    let span_func = ["modify", "delete"];
    contr.innerHTML = `
    <span id="modify" > Modify </span>
    <span id="delete" > Delete </span>
    `;
    // add function modify to span#modify
    contr.children[0].addEventListener("click", modify_element);
    // add function delete to span#delete
    contr.children[1].addEventListener("click", del_element);
    return contr;
}

// CRUD Function

// delete function
function del_element(ev) {
    // console.log(ev.target);
    let parent = ev.target.parentElement.parentElement.parentElement;
    data.splice(parent.getAttribute("data-curr") - 1, 1);
    parent.remove();
    console.log(data);
}

window.onload = function () {
    drawdoms(data);
};
// add function to input:focus
// add function add_element
button.onclick = add_element;
