const url = "http://localhost:8080"

export function getAll(endpoint){
    return fetch(url + endpoint)
        .then(response => {
            if (!response.ok){
                console.log("error fetching: GET " + url + endpoint);
            }

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
            if (!response.ok){
                console.log("error fetching: POST " + url + endpoint)
            }

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
        if (!response.ok){
            console.log("error fetching: PUT " + url + endpoint)
        }

        return response.json();

    }).catch(error => console.error(error));
}

export function deleteEntity (endpoint, id){

}

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



