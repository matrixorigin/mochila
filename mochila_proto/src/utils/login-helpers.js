const backend = process.env.REACT_APP_BACKEND

async function send_credentials(e, host, port, username, password) {
    e.preventDefault()
    var data = {"username": username, "password": password, "host": host, "port": port}
    const res = await fetch(`${backend}:5000/auth/credentials`, {
        method: "POST",
        body: JSON.stringify(data),
    }).then(response => response.json())
    .then((responsedata) => {
        if(responsedata["valid"]) {
            return true;} else {console.log("send_cred false"); return false;}}
    ).catch((err) => {console.log(`send_credentials ERROR: ${err}`)})
    return res;
};

async function fetch_login_status() {
    const loginstatus = await fetch(`${backend}:5000/auth/credentials`, {method: "GET"})
    .then((response) => response.json()).then((response) => {
        if(response["loggedin"]) {return true;}
        return false;
    }).catch((err) => {console.log(`IsloggedIn ERROR: ${err}`)})
    return loginstatus;
}
export {send_credentials, fetch_login_status}