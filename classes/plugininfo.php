<?php
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

namespace tiny_readability;

use context;
use editor_tiny\editor;
use editor_tiny\plugin;
use editor_tiny\plugin_with_buttons;
use editor_tiny\plugin_with_menuitems;

/**
 * Reading level check for the TinyMCE editor.
 *
 * @package    tiny_readability
 * @copyright  2026 DevLMS
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class plugininfo extends plugin implements plugin_with_buttons, plugin_with_menuitems {
    /**
     * Toolbar buttons.
     *
     * @return string[]
     */
    public static function get_available_buttons(): array {
        return ['tiny_readability/tiny_readability'];
    }

    /**
     * Menu items.
     *
     * @return string[]
     */
    public static function get_available_menuitems(): array {
        return ['tiny_readability/tiny_readability'];
    }

    /**
     * Anyone who can use the editor here can check their text.
     *
     * @param context $context
     * @param array $options
     * @param array $fpoptions
     * @param editor|null $editor
     * @return bool
     */
    public static function is_enabled(context $context, array $options, array $fpoptions, ?editor $editor = null): bool {
        return has_capability('tiny/readability:use', $context);
    }
}
