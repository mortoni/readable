import ember_img from '../assets/ember.png'
import angular_img from '../assets/angular.svg'
import react_img from '../assets/react.svg'
import laravel_img from '../assets/laravel.png'

import ember_icon from '../assets/ember_icon.png'
import angular_icon from '../assets/angular_icon.png'
import react_icon from '../assets/react_icon.png'
import laravel_icon from '../assets/laravel_icon.png'

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

export const images = [
    {   code: 'ember', image: ember_img, icon: ember_icon },
    {   code: 'angular', image: angular_img, icon: angular_icon },
    {   code: 'react', image: react_img, icon: react_icon },
    {   code: 'laravel', image: laravel_img, icon: laravel_icon }
]
