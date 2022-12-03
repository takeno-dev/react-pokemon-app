export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then((res) => res.json())
        .then((date) => resolve(date)); 
    })
};

export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then((res) => res.json())
        .then((data) => {
            resolve(data)
        });
    })
};