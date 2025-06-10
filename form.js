export const form = document.createElement("form");

export function createLabel(labelFor, innerText){
    const label = document.createElement("label");
    form.append(label);
    label.for = labelFor;
    label.innerText = innerText;

    return label;
}

export function createInput(type, label, name){
    const input = document.createElement("input");
    form.append(input);
    input.type = type;
    input.id = label.for;
    input.name = name;

    const br = document.createElement("br"); //create break
    form.append(br);

    return input;
}

export function clearForm(){
    form.replaceWith(form.cloneNode(true));
    form.innerHTML = "";
    //form.remove();
    //
    /*
    form.removeEventListener("submit", SubmitEvent);*/
}

