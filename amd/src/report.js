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
 * The reading level dialogue.
 *
 * @module     tiny_readability/report
 * @copyright  2026 DevLMS
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Modal from 'core/modal';
import Templates from 'core/templates';
import {getString} from 'core/str';
import {component} from './common';
import {measure, band, LONG_SENTENCE} from './measure';

/**
 * The editor's text, one line per block, so headings and list items count as sentences of their own.
 *
 * @param {TinyMCE} editor
 * @returns {String}
 */
const textOf = (editor) => {
    const body = editor.getBody().cloneNode(true);
    body.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, td, th, div, br, blockquote').forEach((node) => {
        node.insertAdjacentText('afterend', '\n');
    });
    return body.textContent || '';
};

/**
 * Show the dialogue for the editor's current text.
 *
 * @param {TinyMCE} editor
 */
export const showReport = async(editor) => {
    const result = measure(textOf(editor));
    const context = {
        hastext: result.words > 0,
        words: result.words,
        sentences: result.sentences,
        readingease: result.readingEase,
        band: result.words > 0 ? await getString(`band${band(result.readingEase)}`, component) : '',
        grade: result.grade,
        average: result.averageSentence,
        longlimit: LONG_SENTENCE,
        haslong: result.longSentences.length > 0,
        longsentences: result.longSentences.slice(0, 5).map((text) => ({text})),
    };
    await Modal.create({
        title: getString('pluginname', component),
        body: Templates.render('tiny_readability/report', context),
        show: true,
        removeOnClose: true,
    });
};
