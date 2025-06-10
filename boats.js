import {add, deleteEntity, getAll, getById, update} from './fetch.js';
const body = document.querySelector("body");
let boatList = [];

export function displayAllBoats(){

    //display with dom
    //create post button
    //create update and delete buttons.
    //extra: create view specific boat button.

    const boatCardContainer = document.createElement("div");
    body.append(boatCardContainer);
    boatCardContainer.classList.add("boat");
    boatCardContainer.classList.add("container");

    boatCardContainer.append(addButton());

    getAll("/boat/all")
        .then(data => {
        data.map(boats => {
            const boat = {
                id: boats.id,
                boatType: boats.boatType,
                participants: boats.participants
            }

            const boatCard = createBoatCard(boat);
            boatCardContainer.append(boatCard);

            boatCard.append(deleteButton());
            boatCard.append(updateButton());

        });
    });

   // getById("/boat", 1);

}

export function createNewBoat(){
    // create form.
    // construct object from form data.

    add("/boat", "response body boat");
}

export function updateBoat(){
    //create form.
    // insert boat current data.
    // construct object from updated data.

    update("/boat", 1, "response body boat");
}

export function deleteBoat(){
    //create modal/alert

    deleteEntity("/boat", 1);
}

function createBoatCard(boat){
    const boatCard = document.createElement("div");
    boatCard.classList.add("boat");
    boatCard.classList.add("card");

    boatCard.innerText = "id: " + boat.id + "\ntype: " + boat.boatType + "\nparticipants: " + boat.participants;

    return boatCard;
}

function deleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "slet";
    return deleteButton;
}

function updateButton(){
    const updateButton = document.createElement("button");
    updateButton.innerText = "opdater";

    return updateButton;
}

function addButton(){
    const addButton = document.createElement("button");
    addButton.innerText = "Tilføj";
    return addButton;
}

displayAllBoats();
