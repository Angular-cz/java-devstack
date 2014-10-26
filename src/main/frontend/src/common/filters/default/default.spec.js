describe('defaultFilter', function() {

  beforeEach(module('common.filters.default'));

  it('should return defaultValue when value is empty', function() {
    inject(function(defaultFilter) {
      expect(defaultFilter('', 'defaultValue')).toEqual('defaultValue');
      expect(defaultFilter(null, 'defaultValue')).toEqual('defaultValue');
      expect(defaultFilter(undefined, "defaultValue")).toEqual('defaultValue');
      expect(defaultFilter(' ', "defaultValue")).toEqual('defaultValue');
      expect(defaultFilter('   ', "defaultValue")).toEqual('defaultValue');
    });
  });

  it('should return value when value is not empty', function() {
    inject(function(defaultFilter) {
      expect(defaultFilter('value', 'defaultValue')).toEqual('value');
      expect(defaultFilter(0, "defaultValue")).toEqual(0);
      expect(defaultFilter(1, "defaultValue")).toEqual(1);
    });
  });

});