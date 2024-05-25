import { readFile, writeFile } from 'fs/promises';

const WORD_LIST = 'fr.txt';

// read file
async function processFile(entryPath) {
    try {
        const data = await readFile(entryPath, 'utf8');
        const lines = data.split('\n');
        const newData = lines.map(line => line);
        console.log('## - Entry File processed');
        return newData;
    } catch (error) {
        console.error(error);
    }
}

// clean data by removing unwanted words
async function cleanData(data) {
    const cleanedData = [];
    const regEx = /^[a-zA-Z]*$/;
    data.forEach(line => {
        if (line.length > 3 && line.length < 11 && regEx.test(line) ) {
            cleanedData.push(line);
        }
    });
    console.log('## - Data cleaned');
    return cleanedData;
}
async function main() {
    const rawData = await processFile('fr.txt');
    const cleanedData = await cleanData(rawData);
    await writeFile('dico_fr.txt', cleanedData.join('\n'));
    console.log('## - New File created');
    return cleanedData;
}

main();
