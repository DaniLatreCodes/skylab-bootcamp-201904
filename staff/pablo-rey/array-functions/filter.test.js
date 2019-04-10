'use strict';

suite("filter", function () {
  function initialValue() {
    return ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']
  }

  test("should show only return elements that fulfill condition", function() {
    var words = initialValue();
    var expected = ["exuberant", "destruction", "present"];
    expect(filter(words, function (word) { return word.length > 6; }), expected);
    expect(words, initialValue());
  })

  common_throwError_array(filter);
})
