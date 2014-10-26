'use strict';
describe('flicker feed', function() {

  beforeEach(function() {
    browser.get('index.html#/feed?tags=test');
  });

  it('should have right title', function() {
    expect(browser.getTitle()).toEqual('Flicker Feed Example');
  });

  function checkTagTest() {
    expect(element(by.model('list.tags')).getAttribute('value')).
      toMatch('test');
  }

  it('should display tag in input', function() {
    checkTagTest();
  });

  function goToDetail() {
    return element.all(by.css('.link-to-detail'))
      .first()
      .click();
  }

  it('should have tag in detail', function() {
    goToDetail()
      .then(function() {
        return element.all(by.css('.tag')).map(function(el) {
          return el.getText();
        });
      })
      .then(function(texts) {
        expect(texts).toContain('test');
      });
  });

  it('should keep tag between detail and link', function() {
    goToDetail()
      .then(function() {
        return element(by.css('.btn-back')).click();
      })
      .then(function() {
        checkTagTest();
      });
  });
});