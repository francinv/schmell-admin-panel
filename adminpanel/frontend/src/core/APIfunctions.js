import axios from "axios";

const headers = {
    'Content-Type': 'application/json'
}

export const fetchGamesFromServer = async () => {
    const axe = axios.get('/api/game');
    const response = axe.then(res => 
        res.data
    );
    return response;
}

export const fetchGame = (name) => {
    const url = `api/game/?name=${name}`
    const axe = axios.get(url)
    const response = axe.then(response => response.data);
    return response;
}

export const postGame = (data) => {
    const axe = axios.post('/api/game/', data, {headers});
    const response = axe.then(res => 
        res.data
    );
    return response;
}

export const postImage = (id, data) => {
    const url = `api/game/${id}/`
    axios.put(url, data, {headers})
    .then (res => console.log(res.data))
    .catch(res => console.log(res));
}

export const fetchWeeks = (gameID) => {
    const url = `api/week?game=${gameID}`;
    const axe = axios.get(url);
    const response = axe.then(res => res.data);
    return response;
}

export const postWeek = (data) => {
    const url = "api/week/";
    const axe = axios.post(url, data, {headers})
    const response = axe.then(res => res.data);
}

export const fetchWeek = (idWeek) => {
    const url = `api/week/${idWeek}/`;
    const axe = axios.get(url);
    const response = axe.then(res => res.data);
    return response;
}

export const postQuestion = (data) => {
    const url = 'api/question/';
    axios.post(url, data, {headers})
    .catch(res => console.log(res));
}

export const fetchQuestions = (idWeek) => {
    const url = `api/question?related_week=${idWeek}`
    const axe = axios.get(url);
    const response = axe.then(res => res.data);
    return response;
}

export const putNewStatus = (data, idGame) => {
    const url = `api/game/${idGame}/`;
    const axe = axios.put(url, data, {headers})
    const response = axe.then(res => res.data);
}

export const putNewDescription = (data, idGame) => {
    const url = `api/game/${idGame}/`;
    const axe = axios.put(url, data, {headers})
    const response = axe.then(res => res.data);
}

export const changeQuestion = (data, idQuestion) => {
    const url = `api/question/${idQuestion}/`;
    axios.put(url, data, {headers})
    .catch(res => console.log(res));
}

export const deleteQuestion = (idQuestion) => {
    const url = `api/question/${idQuestion}/`;
    axios.delete(url)
    .catch(res => console.log(res));
}

export const deleteGame = (idGame) => {
    const url = `api/game/${idGame}/`;
    axios.delete(url)
    .catch(res => console.log(res));
}

export const deleteWeek = (idWeek) => {
    const url = `api/week/${idWeek}/`;
    axios.delete(url)
    .catch(res => console.log(res));
}

export const updateGame = (data, idGame) => {
    const url = `api/game/${idGame}/`;
    axios.put(url, data, {headers})
    .catch(res => console.log(res))
}