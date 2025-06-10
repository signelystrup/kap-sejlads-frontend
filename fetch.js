const url = "http://localhost:8080"

export function getAll(endpoint){
    return fetch(url + endpoint)
        .then(response => {
            console.log("GET: " + url + endpoint + " : " + response.status);
            return response.json();

        }).catch(error => console.error(error));
}

export function getById(endpoint, id){
    return getAll(endpoint + "/" + id);
}

export function add (endpoint, responseBody){

    return fetch(url + endpoint, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(responseBody) //send entity to backend

        }).then(response => {
            console.log("POST: " + url + endpoint + " : " + response.status);
            return response.json();

    }).catch(error => console.error(error));
}

export function update (endpoint, id, responseBody){
    return fetch(url + endpoint + "/" + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(responseBody) //send entity to backend

    }).then(response => {
        console.log("PUT: " + url + endpoint + + "/" + id + " : " + response.status);
        return response.json();
    }).catch(error => console.error(error));
}

export function deleteEntity (endpoint, id){
    return fetch(url + endpoint + "/" + id, {
        method: 'DELETE'
    }).then(response => console.log("DELETE: " + url + endpoint + "/" + id + " : " + response.status))
        .catch(error => console.error(error));
}

/*

//test POST:
getById("/boat", 1).then(boat => { //get boat object.
    delete boat.id; //remove id from boat object.
    add("/boat", boat).then(boat => console.log(boat)); //post boat
});

//test PUT:
getById("/boat", 1).then(boat => {
    boat.boatType = 2;
    update("/boat", 42, boat).then(boat =>console.log(boat));
})

//test DELETE:
deleteEntity("/boat", 4);


*/
