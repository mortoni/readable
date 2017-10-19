import * as moment from "moment";

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {float} a random floating point number
 */
export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function getTime(timestamp) {
    return moment(timestamp).fromNow();
}
