const url = "http://localhost:8080"

export function getAll(endpoint){
    return fetch(url + endpoint)
        .then(response => {
            if (!response.ok){
                console.log("error fetching: " + url + endpoint);
            }

            return response.json();
        }).catch(error => console.error(error));
}

/*
export function getById(endpoint, id){
    return getAll(endpoint + "/" + id);
}

const id = 1;

getAll("/ware/all");
getAll("/ware/" + id);

 */

