'use strict';

suite("find", function () {
  function initialArray() {
    return [5, 12, 8, 130, 44];
  }

  test("should return first element that fulfill condition", function () {
    var array = initialArray();
    var expected = 130;
    expect(find(array, function (element) { return element > 13; }), expected);
    expect(array, initialArray());
  })

  common_throwError_array(find);
  common_throwError_callback(find, initialArray())

})
