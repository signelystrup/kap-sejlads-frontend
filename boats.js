import {add, deleteEntity, getAll, getById, update} from './fetch.js';
import {createModal, overlay} from "./modal.js";

export const body = document.querySelector("body");

export function displayAllBoats(){

    //holds cards.
    const boatCardContainer = document.createElement("div");
    body.append(boatCardContainer);
    boatCardContainer.classList.add("boat");
    boatCardContainer.classList.add("container");

    boatCardContainer.append(addButton()); //create add button.

    //fetch all boats. Create boat cards, so we can display them on html.
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

            //create buttons.
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Slet";
            deleteButton.addEventListener("click", ()=> deleteBoat(boat));
            boatCard.append(deleteButton);

            boatCard.append(updateButton(boat));

        });//end of data.map
    }); //end of .then(data)
}

function addBoat(){
    // create form.
    // construct object from form data.
    console.log("add");

    const modal = createModal();

    const header = document.createElement("h2");
    header.innerText = "Opret ny båd";
    modal.append(header);

    //CREATE FORM:
    const form = document.createElement("form");
    modal.append(form);

    function createLabel(labelFor, innerText){
        const label = document.createElement("label");
        form.append(label);
        label.for = labelFor;
        label.innerText = innerText;

        return label;
    }

    function createInput(type, label, name){
        const input = document.createElement("input");
        form.append(input);
        input.type = type;
        input.id = label.for;
        input.name = name;

        const br = document.createElement("br"); //create break
        form.append(br);

        return input;
    }

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

    const button = document.createElement("button");
    button.innerText = "Tilføj";
    button.type = "submit";
    form.append(button);

    //GET USER INPUT
    form.addEventListener("submit", event  => {
        event.preventDefault();

        //construct boat object from user input.
        const boat = {
            boatType: parseInt(event.target.boatType.value), //get user input from radio buttons as int (enum)
            participant: null //change later
        };

        add("/boat", boat).then(()=> { //Save new boat.
            body.innerHTML = "";
            displayAllBoats(); //update all boats page.
        });

        overlay.remove(); //close modal.
    });
}

function updateBoat(boat){
    //create form.
    // insert boat current data.
    // construct object from updated data.
    console.log("update");
    getById("/boat", 1).then(boat => update("/boat", 1, boat));
}

function deleteBoat(boat){
    //create modal/alert

    console.log("delete");
    const modal = createModal();
    modal.classList.add("small");

    const confirmHeader = document.createElement("h2");
    modal.append(confirmHeader);
    confirmHeader.innerText = "Er du sikker på, at du vil slette båden?"

    const boatCard = createBoatCard(boat)
    modal.append(boatCard);

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


function updateButton(boat){
    const updateButton = document.createElement("button");
    updateButton.innerText = "opdater";

    updateButton.addEventListener("click", ()=> {
        const modal = createModal();
        updateBoat();
    });
    return updateButton;
}

function addButton(){
    const addButton = document.createElement("button");
    addButton.innerText = "Tilføj";

    addButton.addEventListener("click", ()=> {
        addBoat();
    });

    return addButton;
}

displayAllBoats();


