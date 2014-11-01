'use strict';
describe('user detail', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should have right title', function() {
    expect(browser.getTitle()).toEqual('Java devstack');
  });

});