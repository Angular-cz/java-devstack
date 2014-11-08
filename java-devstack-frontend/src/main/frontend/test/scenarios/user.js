'use strict';

describe('homepage', function () {

  beforeEach(function () {
    browser.get('index.html');
  });

  it('should have right title', function () {
    expect(browser.getTitle()).toEqual('Java devstack');
  });

  it('should have right header', function () {
    var elem = element(by.css('h3'));
    expect(elem.getText()).toEqual('Objednávky');
  });
});


