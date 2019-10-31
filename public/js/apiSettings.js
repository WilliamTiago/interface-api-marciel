let token = localStorage.getItem('token');

if((!token) || (token === "undefined")){
    window.location.href = 'http://127.0.0.1:8088/auth/login';
}

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    //timeout: 1000,
    headers: {
        Authorization: `Bearer ${token}`, //Token de autenticação na API
        Accept: 'application/json'
    }
});