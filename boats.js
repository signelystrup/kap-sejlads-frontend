import {add, deleteEntity, getAll, getById, update} from './fetch.js';
import {createModal, overlay} from "./modal.js";
import {clearForm, createInput, createLabel, form} from "./form.js";

export const body = document.querySelector("body");

export function displayAllBoats(){

    //holds cards.
    const boatCardContainer = document.createElement("div");
    body.append(boatCardContainer);
    boatCardContainer.classList.add("boat");
    boatCardContainer.classList.add("container");

    //create add button.
    const addButton = document.createElement("button");
    addButton.innerText = "Tilføj";
    addButton.addEventListener("click", ()=> addBoat());
    boatCardContainer.append(addButton);

    //fetch all boats. Create boat cards, so we can display them on html.
    getAll("/boat/all")
        .then(data => {
        data.map(boats => {
            const boat = {
                id: boats.id,
                boatType: boats.boatType,
                participants: boats.participants
            }

            //boat cards:
            const boatCard = createBoatCard(boat);
            boatCardContainer.append(boatCard);

            //delete button
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Slet";
            deleteButton.addEventListener("click", ()=> deleteBoat(boat));
            boatCard.append(deleteButton);

            //update button
            const updateButton = document.createElement("button");
            updateButton.innerText = "opdater";
            updateButton.addEventListener("click", ()=> updateBoat(boat));
            boatCard.append(updateButton);

        });//end of data.map
    }); //end of .then(data)
}

function addBoat(){
    const modal = createModal();

    const header = document.createElement("h2");
    header.innerText = "Opret ny båd";
    modal.append(header);

    //CREATE FORM:
    createBoatForm();
    modal.append(form);

    const button = document.createElement("button");
    button.innerText = "Opret";
    button.type = "submit";
    form.append(button);

    //GET USER INPUT
    form.addEventListener("submit", eventListener);

    function eventListener (event) {
        event.preventDefault();

        //construct boat object from user input.
        const boat = {
            boatType: parseInt(event.target.boatType.value), //get user input from radio buttons as int (enum)
            participant: null //change later
        };

        console.log(boat); //remove

        add("/boat", boat).then(()=> { //Save new boat.
            body.innerHTML = "";
            displayAllBoats(); //update all boats page.
        });

        overlay.remove(); //close modal.
        form.removeEventListener("submit", eventListener);
    }

}

function updateBoat(oldBoat){
    // insert boat current data.

    const modal = createModal();

    const header = document.createElement("h2");
    header.innerText = "Rediger båd";
    modal.append(header);

    //FORM:
    createBoatForm();
    modal.append(form);

    //set default values from oldBoat.
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        if (parseInt(input.value) === oldBoat.boatType && input.name === "boatType"){ //if input boat type and value are the same, check box.
            input.checked = true;
        }
    });

    /*
    //one for participants, also:
    inputs.forEach(input => {
        if (input.value === 0 && input.name === "boatType"){ //if input boat type and value are the same, check box.
            input.checked = true;

            console.log("input found");
        }
    });
*/

    const button = document.createElement("button");
    button.innerText = "Opdater";
    button.type = "submit";
    form.append(button);

    //GET USER INPUT
    form.addEventListener("submit", eventListener);

    function eventListener (event){
        event.preventDefault();

        //construct new boat object from user input.
        const newBoat = {
            id: oldBoat.id, //same id.
            boatType: parseInt(event.target.boatType.value), //get user input from radio buttons as int (enum)
            participant: null //change later
        };

        update("/boat", oldBoat.id, newBoat).then(()=> { //Save new boat.
            body.innerHTML = "";
            displayAllBoats(); //update all boats page.
        });

        overlay.remove(); //close modal.

        form.removeEventListener("submit", eventListener);
    }



}

function deleteBoat(boat){

    const modal = createModal();
    modal.classList.add("small"); //make smaller than normal

    //header
    const confirmHeader = document.createElement("h2");
    modal.append(confirmHeader);
    confirmHeader.innerText = "Er du sikker på, at du vil slette båden?"

    //show boat
    const boatCard = createBoatCard(boat);
    modal.append(boatCard);

    //confirm button
    const confirmButton = document.createElement("button");
    modal.append(confirmButton);
    confirmButton.innerText = "Bekræft";

    confirmButton.addEventListener("click", ()=> {
        deleteEntity("/boat", boat.id)
            .then(() => {
                body.innerHTML = "";
                displayAllBoats(); //update all boats page.
            });
    });

}

function createBoatCard(boat){
    const boatCard = document.createElement("div");
    boatCard.classList.add("boat");
    boatCard.classList.add("card");

    boatCard.innerText = "id: " + boat.id + "\ntype: " + boat.boatType + "\nparticipants: " + boat.participants;

    return boatCard;
}

function createBoatForm(){
    clearForm();

    //Create radio buttons for boat sizes (enum):
    const moreThan40Label = createLabel("more-than-40-feet", ">40 fod");
    const moreThan40Input = createInput("radio", moreThan40Label, "boatType");
    moreThan40Input.value = 2; //set enum value

    const between25And40Label = createLabel("between-25-and-40-feet", "25-40 fod");
    const between25And40Input = createInput("radio", between25And40Label, "boatType");
    between25And40Input.value = 1;

    const lessThan25Label = createLabel ("less-than-25-feet", "<25 fod");
    const lessThan25Input = createInput("radio", lessThan25Label, "boatType");
    lessThan25Input.value = 0;

    //participants. Should be dropdown or checkboxes . maybe with search.
    const participantLabel = createLabel("participant", "deltager");
    const participantInput = createInput("text", participantLabel, "participant");
}

displayAllBoats();


