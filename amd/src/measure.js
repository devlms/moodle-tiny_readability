// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Reading level measures for English text: Flesch reading ease and Flesch-Kincaid grade level.
 *
 * Syllables are counted with the usual vowel-group rules; like every automatic count, it is close, not exact.
 *
 * @module     tiny_readability/measure
 * @copyright  2026 DevLMS
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** Sentences longer than this are listed as long. */
export const LONG_SENTENCE = 25;

/**
 * Syllables in one word.
 *
 * @param {String} word
 * @returns {Number}
 */
export const syllables = (word) => {
    let w = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!w) {
        return 0;
    }
    if (w.length <= 3) {
        return 1;
    }
    // A final silent e (make, makes) and -ed (jumped) are not syllables; -ted and -ded (created, needed) are.
    w = w.replace(/(?:[^laeiouy]es|[^laeiouytd]ed|[^laeiouy]e)$/, (end) => end.charAt(0));
    w = w.replace(/^y/, '');
    const groups = w.match(/[aeiouy]+/g);
    return Math.max(1, groups ? groups.length : 0);
};

/**
 * Words of a piece of text: tokens with at least one letter or digit.
 *
 * @param {String} text
 * @returns {String[]}
 */
const wordsOf = (text) => text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token));

/**
 * Measure a text.
 *
 * @param {String} text plain text
 * @returns {Object} words, sentences, syllables, readingEase (0-100), grade (0 or more), averageSentence, longSentences
 */
export const measure = (text) => {
    const sentences = text.split(/(?<=[.!?…])\s+|\n+/u)
        .map((sentence) => sentence.trim())
        .filter((sentence) => wordsOf(sentence).length > 0);
    const words = wordsOf(text);
    const syllableCount = words.reduce((total, word) => total + syllables(word), 0);
    if (!words.length) {
        return {words: 0, sentences: 0, syllables: 0, readingEase: null, grade: null, averageSentence: 0, longSentences: []};
    }
    const wordsPerSentence = words.length / Math.max(1, sentences.length);
    const syllablesPerWord = syllableCount / words.length;
    const ease = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
    const grade = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;
    return {
        words: words.length,
        sentences: sentences.length,
        syllables: syllableCount,
        readingEase: Math.round(Math.min(100, Math.max(0, ease))),
        grade: Math.round(Math.max(0, grade) * 10) / 10,
        averageSentence: Math.round(wordsPerSentence * 10) / 10,
        longSentences: sentences.filter((sentence) => wordsOf(sentence).length > LONG_SENTENCE),
    };
};

/**
 * The band of a reading ease score, 0 (very difficult) to 6 (very easy).
 *
 * @param {Number} ease
 * @returns {Number}
 */
export const band = (ease) => {
    const limits = [30, 50, 60, 70, 80, 90];
    const index = limits.findIndex((limit) => ease < limit);
    return index === -1 ? 6 : index;
};
