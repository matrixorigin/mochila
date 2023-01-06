const backend = process.env.REACT_APP_BACKEND;

async function verify_db() {
    const status = await fetch(`${backend}:5000/main/history/verify`, {method: "GET"})
    .then((response) => response.json()).then((response) => {
        if(response["valid"]) {return true;}
        return false;
    }).catch((err) => {console.log(`IsloggedIn ERROR: ${err}`)})
    return status;
}

async function get_list(e, filter) {
    e.preventDefault()
    var data = {"filterstr": filter}
    const res = await fetch(`${backend}:5000/main/history/filter`, {
        method: "POST",
        body: JSON.stringify(data),
    }).then(response => response.json())
    .catch((err) => {console.log(`send_credentials ERROR: ${err}`)})
    return res;
}

export {verify_db, get_list};