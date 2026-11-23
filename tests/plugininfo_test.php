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

/**
 * Tests for the reading level plugin's PHP side.
 *
 * @package    tiny_readability
 * @copyright  2026 DevLMS
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers     \tiny_readability\plugininfo
 */
final class plugininfo_test extends \advanced_testcase {
    public function test_offered_to_people_who_can_use_it(): void {
        global $DB;
        $this->resetAfterTest();
        $course = $this->getDataGenerator()->create_course();
        $teacher = $this->getDataGenerator()->create_and_enrol($course, 'editingteacher');
        $context = \context_course::instance($course->id);

        $this->setUser($teacher);
        $this->assertTrue(plugininfo::is_enabled($context, [], []));

        $userrole = $DB->get_field('role', 'id', ['shortname' => 'user']);
        assign_capability('tiny/readability:use', CAP_PROHIBIT, $userrole, \context_system::instance(), true);
        accesslib_clear_all_caches_for_unit_testing();
        $this->assertFalse(plugininfo::is_enabled($context, [], []));
    }

    public function test_button_and_menu_item(): void {
        $this->assertSame(['tiny_readability/tiny_readability'], plugininfo::get_available_buttons());
        $this->assertSame(['tiny_readability/tiny_readability'], plugininfo::get_available_menuitems());
    }
}
