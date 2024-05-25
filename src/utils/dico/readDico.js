import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { writeFileSync } from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const parseTxtToJson = () => {
    const data = readFileSync(resolve(__dirname, './dico_fr.txt'), 'utf8');
    const lines = data.split('\n');
    return lines;
}

const jsonArray = parseTxtToJson();
const jsonString = JSON.stringify(jsonArray, null, 2);

writeFileSync(resolve(__dirname, '../../assets/dico.json'), jsonString);