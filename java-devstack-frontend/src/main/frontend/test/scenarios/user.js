'use strict';
describe('user detail', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should have right title', function() {
    expect(browser.getTitle()).toEqual('Java devstack');
  });

  it('should have right name', function() {
    var elem = element(by.css('.page div div'));
    expect(elem.getText()).toEqual('Hello World');
  });


});