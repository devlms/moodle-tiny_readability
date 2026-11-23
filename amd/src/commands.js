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
 * Toolbar button and menu item.
 *
 * @module     tiny_readability/commands
 * @copyright  2026 DevLMS
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getString} from 'core/str';
import {component, buttonName, icon} from './common';
import {showReport} from './report';

export const getSetup = async() => {
    const title = await getString('buttontitle', component);
    return (editor) => {
        editor.ui.registry.addButton(buttonName, {
            icon,
            tooltip: title,
            onAction: () => showReport(editor),
        });
        editor.ui.registry.addMenuItem(buttonName, {
            icon,
            text: title,
            onAction: () => showReport(editor),
        });
    };
};
