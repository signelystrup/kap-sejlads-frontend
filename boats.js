import {add, deleteEntity, getAll, getById, update} from './fetch.js';
import {createModal} from "./modal.js";

export const body = document.querySelector("body");

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


}

export function createNewBoat(){
    // create form.
    // construct object from form data.
    console.log("add");
    getById("/boat", 1).then(boat => {
        delete boat.id;
        add("/boat", boat);
    });
}

export function updateBoat(){
    //create form.
    // insert boat current data.
    // construct object from updated data.
    console.log("update");
    getById("/boat", 1).then(boat => update("/boat", 1, boat));
}

export function deleteBoat(){
    //create modal/alert

    console.log("delete");
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

    deleteButton.addEventListener("click", ()=> {
        createModal();
        deleteBoat();
    });
    return deleteButton;
}

function updateButton(){
    const updateButton = document.createElement("button");
    updateButton.innerText = "opdater";

    updateButton.addEventListener("click", ()=> {
        createModal();
        updateBoat();
    });
    return updateButton;
}

function addButton(){
    const addButton = document.createElement("button");
    addButton.innerText = "Tilføj";

    addButton.addEventListener("click", ()=> {
        createModal();
        createNewBoat();
    });

    return addButton;
}

displayAllBoats();
