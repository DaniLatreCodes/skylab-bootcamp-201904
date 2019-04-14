'use strict';

describe('hooray', function () {

    describe('constructor', function () {
        true && it('should construct an empty hooray when no arguments', function () {
            var hooray = new Hooray;

            expect(hooray.length).toBe(0);
            expect(Object.keys(hooray).length).toBe(1);
        });

        true && it('should construct a non-empty hooray when existing arguments', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(hooray.length).toBe(3);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 }));
            expect(Object.keys(hooray).length).toBe(4);
        });

        true && it('should construct an empty hooray with length equal to when only one numeric argument', function () {
            var hooray = new Hooray(1);

            expect(hooray.length).toBe(1);
            expect(Object.keys(hooray).length).toBe(1);
        });

        true && it('should construct a non-empty hooray with only one non-numeric argument', function () {
            var hooray = new Hooray('1');

            expect(hooray.length).toBe(1);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: '1', length: 1 }));
            expect(Object.keys(hooray).length).toBe(2);
        });
    });

    describe('push', function () {
        !true && it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);
            var length = hooray.push(4);

            expect(hooray.length, 4);
            expect(length, hooray.length);
            expect(hooray, { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }, true);
        });

        !true && it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4, 5);

            expect(hooray.length, 5);
            expect(length, hooray.length);
            expect(hooray, { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }, true);
        });

        !true && it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length, 3);
            expect(length, hooray.length);
            expect(hooray, { 0: 1, 1: 2, 2: 3, length: 3 }, true);
        });
    });

    describe('forEach', function () {
        !true && it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });
            // 0 1
            // 1 2
            // 2 3

            expect(result, hooray, true);

            var expected = { 0: 1, 1: 2, 2: 3, length: 3 };

            expect(hooray, expected, true);
        });

        !true && it('should do nothing if hooray has not content', function () {
            var hooray = new Hooray;

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(result.length, 0);
        });

        !true && it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.forEach();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message, 'undefined is not a function');
            }
        });
    });

    describe('concat', function() {
        true && it('should return a new hooray with all parameters passed within it', function(){
            var hooray1 = new Hooray(1, 2, 3);
            var hooray2 = new Hooray(4, 5, 6);
        
            var hoorayCheck = new Hooray(1, 2, 3, 4, 5, 6);
            // debugger
            var hoorayResult = hooray1.concat(hooray2);
            expect(hoorayResult).toEqual(jasmine.objectContaining(hoorayCheck));
        });

        true && it ('should return two arrays String hoorays combined in one', function() {
            var hooray1 = new Hooray('a', 'b', 'c');
            var hooray2 = new Hooray('d', 'e', 'f');
        
            var hoorayCheck = new Hooray('a', 'b', 'c', 'd', 'e', 'f');
            var hoorayResult = hooray1.concat(hooray2);
            expect(hoorayResult).toEqual(jasmine.objectContaining(hoorayCheck));
        });

        true && it ('should return when no parameters are passed one new array with the content was already within it', function() {
            var hoorayResult = new Hooray('a', 'b', 'c');
        
            var hoorayCheck = new Hooray('a', 'b', 'c');
            hoorayResult = hoorayResult.concat();
            expect(hoorayResult).toEqual(jasmine.objectContaining(hoorayCheck));
        });

        true && it ('should return an alphanumeric hooray when itself have alphabet chars and numbers are added by argumen alone or whithin an another hooray ', function() {
            var hoorayAlphaNumericResult = new Hooray('a', 'b', 'c');
        
            var hoorayCheck = new Hooray('a', 'b', 'c', 1, 2, 3);
            hoorayAlphaNumericResult = hoorayAlphaNumericResult.concat(1, new Hooray(2, 3));
            expect(hoorayAlphaNumericResult).toEqual(jasmine.objectContaining(hoorayCheck));
        });

        true && it ('should concat undefined value into hooray whet its passes by argument', function() {
            var hooray = new Hooray('a', 'b', 'c');
            var expectedHorray = new Hooray('a', 'b', 'c', undefined)
                hooray = hooray.concat(undefined);
 
                expect(hooray).toEqual(jasmine.objectContaining(expectedHorray));
            
        });

    });

    describe('every', function() {
        it('should return true once all hooray elements checked are equals.', function() {
            var booleanResult;
            var hooray = new Hooray(2, 2, 2);

            booleanResult = hooray.every(function(v) { return v === 2});
            expect(booleanResult).toBeTruthy();
        });

        it('should return false once all hooray elements checked are equals.', function() {
            var booleanResult;
            var hooray = new Hooray(2, 1, 2);

            booleanResult = hooray.every(function(v) { return v === 2});
            expect(booleanResult).toBeFalsy();
        });

        it('should break when no arguments are passed.', function() {
            
            var hooray = new Hooray(2, 1, 2);
            try{
                hooray.every();
                throw new Error(' should not get here.');
            }catch(error) {
                expect(error.message).toBe(' undefined is not a callback.');
            }
        });


        it('should break when not a callback is passed.', function() {
            
            var hooray = new Hooray(2, 1, 2);
            try{
                var num = 5;
                hooray.every(num);
                throw new Error(' should not get here.');
            }catch(error) {
                expect(error.message).toBe(num + ' is not a callback.');
            }
        });
    });

    describe('indexOf', function() {
        it('should return the index possition of a given element whithin a hooray.', function() {
            var hooray = new Hooray('a', 'b', 'c', 1, 2, 3);
            var indexCheck = hooray.indexOf('c');

            expect(indexCheck).toBe(2);
        });

        it('should return the index possition of a given element whithin a hooray strating from certain index.', function() {
            var hooray = new Hooray('a', 'b', 'c', 1, 2, 3);
            var indexCheck = hooray.indexOf(2, 1);

            expect(indexCheck).toBe(4);
        });
        it('should return -1 when no arguments are passed.', function() {
            var hooray = new Hooray('a', 'b', 'c', 1, 2, 3);
            var resultCheck = hooray.indexOf();

            expect(resultCheck).toBe(-1);
        });
        it('should return -1 when no arguments are passed.', function() {
            var hooray = new Hooray('a', 'b', 'c', 1, 2, 3);
            var resultCheck = hooray.indexOf();

            expect(resultCheck).toBe(-1);
        });
    });
 
    

});