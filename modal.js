import {body} from "./boats.js";
export let overlay;

export function createModal(){
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    body.append(overlay);

    const modal = document.createElement("div");
    overlay.append(modal);
    modal.classList.add("modal");


    const closeButton = document.createElement("button");
    modal.append(closeButton);
    closeButton.innerText = "x"; // "&times;";
    closeButton.addEventListener("click", ()=> {
        modal.innerHTML = ""; //clear modal
        overlay.remove();
    });

    return modal;
}