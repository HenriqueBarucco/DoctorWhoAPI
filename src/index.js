import path from 'path';
import fs from 'fs';

const dataPath = path.join('..', 'data');
const extension = '.json';

/**
 * @class Episodes - Return episodes information
 */
export default class Episodes {

    /**
     * Generator constructor
     * @param {Number|Array} [episode=all] - The episode number to get information, or 'all' for all episodes
     * @param {Number|Array} [season=all] - The season number to get information, or 'all' for all seasons
     * @param {String} [language=pt-br] - The language to look for
     */
    constructor(episode = 'all', season = 'all', language = 'pt-br') {
        this.names = [];

        const filePath = path.join(__dirname, dataPath, language + '-episodes' + extension);

        if (!fs.existsSync(filePath)) {
            throw new Error(`Language "${language}" is not available. You can contribute to add it.`);
        }

        const data = require(filePath);

        if (typeof episode === 'string' && episode === 'all') {
            for (const episode in data) {
                if (data.hasOwnProperty(episode)) {
                    this._appendUniques(data[episode]);
                }
            }
        } else if (Array.isArray(episode) && episode.length > 0) {
            for (const episode of episode) {
                if (data.hasOwnProperty(episode)) {
                    this._appendUniques(data[episode]);
                } else {
                    throw new Error(`Unknown episode number '${episode}'.`);
                }
            }
        } else {
            throw new Error(`Episode number must be either 'all' or an array of numbers. Received ${typeof episode} with value ${episode}.`);
        }
    }

    /**
     * Get one random value
     * @returns {String} - A random value
     */
    random() {
        return this._shuffle()[0];
    }

    /**
     * Get all values
     * @returns {String[]} - All random values
     */
    all() {
        return this.Episodes;
    }

    /**
     * Get several random values
     * @param {Number} [count=1] - The amount of values to retrieve
     * @returns {String []} - A list of random values of length count.
     */
    get(count = 1) {

        if (count > this.Episodes.length) {
            throw new Error(`Not enough values to retrieve ${count} unique items.`);
        } else if (count < 1) {
            throw new Error(`Count must be greater than 0. Received ${count}.`);
        }

        return this._shuffle().slice(0, count);
    }

    /**
     * Get a list of randomly shuffled values
     * @returns {String[]} - The list with randomly shuffled value
     * @private
     */
    _shuffle() {
        const tmp = Object.assign(this.Episodes);

        for (let i = tmp.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
        }

        return tmp;
    }

    /**
     * Append companions to the internal array
     * @param {Array} data - an array of companions
     * @private
     */
    _appendUniques(data) {
        data.forEach((name) => {
            if (this.names.indexOf(name) === -1) {
                this.names.push(name);
            }
        })
    }
}