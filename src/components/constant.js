function getHeader() {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
    return headers;
}

function getBaseUrl() {
    return "http://localhost:8081/";
}