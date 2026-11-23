@editor @editor_tiny @tiny @tiny_readability
Feature: Check the reading level of text in the editor
  In order to write at the right level for my learners
  As a teacher
  I need to see how easy my text is to read

  @javascript
  Scenario: Easy and hard texts get different reading levels
    Given I log in as "admin"
    And I open my profile in edit mode
    When I set the field "Description" to "<p>The cat sat on the mat. The dog ran to the park. We had fun in the sun.</p>"
    And I click on the "Tools > Reading level" menu item for the "Description" TinyMCE editor
    Then I should see "Very easy" in the "Reading level" "dialogue"
    And I should see "No sentence is over 25 words." in the "Reading level" "dialogue"
    And I click on "Close" "button" in the "Reading level" "dialogue"
    And I set the field "Description" to "<p>Institutional accreditation frameworks necessitate comprehensive documentation of pedagogical methodologies, assessment instrumentation, and longitudinal evaluation of programmatic effectiveness across heterogeneous organisational contexts, departmental structures, administrative hierarchies and international regulatory environments.</p>"
    And I click on the "Tools > Reading level" menu item for the "Description" TinyMCE editor
    And I should see "Very difficult" in the "Reading level" "dialogue"
    And I should see "Long sentences (over 25 words)" in the "Reading level" "dialogue"

  @javascript
  Scenario: An empty editor has nothing to measure
    Given I log in as "admin"
    And I open my profile in edit mode
    And I set the field "Description" to ""
    When I click on the "Tools > Reading level" menu item for the "Description" TinyMCE editor
    Then I should see "There is no text to measure yet." in the "Reading level" "dialogue"
