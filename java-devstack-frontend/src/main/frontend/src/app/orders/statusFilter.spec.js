describe('statusFilter', function() {

  var filter;
  beforeEach(module('administration.orders.filter.statuses'));

  beforeEach(inject(function(statusTranslationFilter){
    filter = statusTranslationFilter;
  }));

  it('should be present', function() {
    expect(filter).toBeDefined();
  });

  describe('should return right translation', function() {
    it('for status NEW', function() {
      expect(filter("NEW")).toBe("Nová");
    });

    it('for status SENT', function() {
      expect(filter("SENT")).toBe("Odeslaná");
    });
  });

  it('should return undefined for wrong status', function() {
    expect(filter("WRONG")).not.toBeDefined();
  });
});