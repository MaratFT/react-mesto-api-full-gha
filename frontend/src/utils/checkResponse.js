const checkResponse = res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));

export default checkResponse;
