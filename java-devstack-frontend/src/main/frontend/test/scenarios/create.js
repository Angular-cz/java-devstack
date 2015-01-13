'use strict';

describe('create page', function() {

  beforeEach(function() {
    browser.get('#/create');
  });

  it('should have right header', function() {
    var elem = element(by.css('h1'));
    expect(elem.getText()).toEqual('Nový uživatel');
  });

  it('should create user', function() {
    element(by.model('create.order.name'))
        .clear()
        .sendKeys("Test name");
    element(by.model("create.order.email"))
        .clear()
        .sendKeys("email@test");

    element(by.css("button")).click();

    var ptor = protractor.getInstance();
    ptor.waitForAngular();
    expect(ptor.getCurrentUrl()).toContain('/detail/');

    var nameBinding = element(by.binding("detail.order.name"));
    expect(nameBinding.getText())
        .toMatch("Test name");
  });
})
;


