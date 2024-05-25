import dico from '../assets/dico.json'

async function secretWords() {
    const words = [];
    for (let i = 0; i < 5; i++) {
        const random = Math.floor(Math.random() * dico.length);
        words.push(dico[random]);
    }
    return words;
}

export default secretWords;