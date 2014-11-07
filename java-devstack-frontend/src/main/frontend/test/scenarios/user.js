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
    expect(elem.getText()).toEqual('Ahoj - Světe');
  });


  it('should have right codding', function() {
    var elem = element(by.css('.page div p'));
    expect(elem.getText()).toEqual('Dobrý den');
  });

});