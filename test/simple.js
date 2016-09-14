'use strict';
const idify = require('../lib');
const assert = require('assert');

describe('HTML$ ID Creation', () => {
    it('should be able to handle falsey values and return an empty string', () => {
        assert.strictEqual(idify(), '');
        assert.strictEqual(idify(undefined), '');
        assert.strictEqual(idify(null), '');
        assert.strictEqual(idify(NaN), '');
        assert.strictEqual(idify(0), '');
        assert.strictEqual(idify(''), '');
        assert.strictEqual(idify(false), '');
    });
    it('should return an empty string when presented a string with only spaces', () => {
        assert.strictEqual(idify(' '), '');
        assert.strictEqual(idify('     '), '');
    });
    it('should remove invalid characters but keep valid characters', () => {
        // Build a set of ASCII characters from 0 (null) to 127 (delete)
        assert.strictEqual(idify(getASCIIString(0, 127)), '-.0123456789:abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz');
    });
    it('should convert invalid characters to valid ones where possible or otherwise remove them', () => {
        // Build a set of ASCII characters from 128 (euro symbol) to 255 (y with umlats)
        assert.strictEqual(idify(getASCIIString(128, 255)), 'clbyenanot-oaaaaaaaeceeeeiiiidnoooooxouuuuythssaaaaaaaeceeeeiiiidnooooo:ouuuuythy');
    });
    it('should collapse spaces and replace them with a dash and also trim the beginning and end', () => {
        // Build a set of ASCII characters from 128 (euro symbol) to 255 (y with umlats)
        assert.strictEqual(idify('     This has   many      spaces    '), 'this-has-many-spaces');
    });
});

function getASCIIString(start, end) {
    const charCodes = [];
    // Build a set of ASCII character codes from start to end (inclusive)
    for (var i = start; i <= end; i++) {
        charCodes.push(i);
    }

    // Convert the character codes to a string.
    return String.fromCharCode.apply(null, charCodes);
}