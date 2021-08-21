let app = angular.module('CurrencyManager', []);

app.controller('MainController', function ($scope) {
  $scope.formatTable = [];
  $scope.country = '';
  $scope.price = '';
  $scope.currency = '';
  $scope.symbol = '';
  $scope.useSymbol = '';
  $scope.currencyFirst = '';
  $scope.cents = '';
  $scope.commaDelimiter = '';

  // Submit price button click
  $scope.submitPrice = function () {
    // Alert if empty fields
    if (
      $scope.country.length === 0 ||
      $scope.price.length === 0 ||
      $scope.currency.length === 0 ||
      $scope.symbol.length === 0 ||
      $scope.useSymbol.length === 0 ||
      $scope.currencyFirst.length === 0 ||
      $scope.cents.length === 0 ||
      $scope.commaDelimiter.length === 0
    ) {
      alert('Must fill out all fields.');
      return;
    }

    // Declare new object
    $scope.newObj = {};

    // Round price to hundredths or ones
    $scope.newPrice =
      $scope.cents === 'true'
        ? (Math.round(100 * $scope.price) / 100).toString()
        : Math.round($scope.price).toString();

    // Change period to comma if necessary
    $scope.priceWithCentsDelimiter =
      $scope.commaDelimiter === 'false'
        ? $scope.newPrice.replace('.', ',')
        : $scope.newPrice;

    // Format price with delimiters
    $scope.priceWithDelimiter =
      $scope.commaDelimiter === 'true'
        ? $scope.priceWithCentsDelimiter.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : $scope.priceWithCentsDelimiter.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Store symbol or currency name
    $scope.newSymbol =
      $scope.useSymbol === 'true' ? $scope.symbol : $scope.currency;

    // Set order of final price format
    $scope.finalPriceFormat =
      $scope.currencyFirst === 'true'
        ? $scope.newSymbol + $scope.priceWithDelimiter
        : $scope.priceWithDelimiter + $scope.newSymbol;

    // Push new price object to format table array
    $scope.newObj.country = $scope.country;
    $scope.newObj.currency = $scope.currency;
    $scope.newObj.price = $scope.finalPriceFormat;
    $scope.formatTable.push($scope.newObj);
  };

  // Clear form button click
  $scope.clearForm = function () {
    $scope.country = '';
    $scope.price = '';
    $scope.currency = '';
    $scope.symbol = '';
    $scope.useSymbol = '';
    $scope.currencyFirst = '';
    $scope.cents = '';
    $scope.commaDelimiter = '';
  };

  // Delete row button click
  $scope.deleteRow = function (i) {
    console.log(i);
    $scope.formatTable.splice(i, 1);
  };

  // Sort table by Country
  $scope.sortOutputTablebyCountry = function () {
    let sortedTable;
    sortedTable = $scope.formatTable.sort((a, b) =>
      a.country > b.country ? 1 : -1
    );
    $scope.formatTable = sortedTable;
  };

  // Sort table by Currency
  $scope.sortOutputTablebyCurrency = function () {
    let sortedTable;
    sortedTable = $scope.formatTable.sort((a, b) =>
      a.currency > b.currency ? 1 : -1
    );
    $scope.formatTable = sortedTable;
  };
});
