
    async function send_credentials(e, host, port, username, password) {
        var res = false
        e.preventDefault()
        var data = {"username": username, "password": password, "host": host, "port": port}
        await fetch('http://127.0.0.1:5000/credentials', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((responsedata) => {
            if(responsedata['status'] === 200) {
                console.log("sendcredentials true")
                res = true;}}
        ).catch((err) => {console.log(err)})
        return res;
    };

export default send_credentials