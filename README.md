# Reading level check for Moodle's editor (tiny_readability)

Shows how easy a text is to read while you write it in Moodle's TinyMCE editor: Flesch reading ease, a school grade level, average sentence length, and the sentences that are too long. For teachers writing for younger learners, language learners or anyone reading on a phone.

## Use it

In any editor, open **Tools > Reading level** (or add the button to the toolbar). A dialogue shows:

- **Reading ease**, 0 to 100, with a plain label from "Very difficult" to "Very easy". Most adults read 60 and above comfortably.
- **School grade level** (Flesch-Kincaid).
- **Average sentence length**, words and sentences.
- **Long sentences** (over 25 words), so you can split them.

## Good to know

- The measures were made for English; on other languages the numbers mean little, and the dialogue says so.
- Syllables are counted with the usual rules, so scores are close to other tools but not always identical.
- Headings and list items count as sentences of their own.
- Everything runs in the browser: the text is not stored or sent anywhere.
- Capability `tiny/readability:use` (all users by default) decides who sees it.

Moodle 4.5 to 5.3. Built by DevLMS: https://devlms.com
