import {body} from "./boats.js";

export function createModal(){
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    body.append(overlay);

    const modal = document.createElement("div");
    overlay.append(modal);
    modal.classList.add("modal");
    modal.innerText = "This is a modal";

    const closeButton = document.createElement("button");
    modal.append(closeButton);
    closeButton.innerText = "x"; // "&times;";
    closeButton.addEventListener("click", ()=> {
        overlay.remove();
    });


}