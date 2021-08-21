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
      alert('All fields must be filled in.');
      return;
    }

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

    // Declar new object and push to formatTable array
    $scope.newObj = {};
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
    $scope.formatTable.splice(i, 1);
  };

  // Sort table by Country header click
  $scope.sortOutputTablebyCountry = function () {
    let sortedTable;
    sortedTable = $scope.formatTable.sort((a, b) =>
      a.country > b.country ? 1 : -1
    );
    $scope.formatTable = sortedTable;
  };

  // Sort table by Currency header Click
  $scope.sortOutputTablebyCurrency = function () {
    let sortedTable;
    sortedTable = $scope.formatTable.sort((a, b) =>
      a.currency > b.currency ? 1 : -1
    );
    $scope.formatTable = sortedTable;
  };

  // Make CSV file with data on download data click
  $scope.downloadData = function () {
    const data = $scope.formatTable;
    let csvContent = 'data:text/csv;charset=utf-8,';
    let headers = 'Country,Currency,Price,';
    let allEntryStrings = '';

    // Loop through data array
    for (let i = 0; i < data.length; i++) {
      let entryString = '';
      let csvPrice = '';

      // Wrap commas in quotes
      for (let j = 0; j < data[i].price.length; j++) {
        if (data[i].price[j] === ',') {
          csvPrice += '","';
        } else {
          csvPrice += data[i].price[j];
        }
      }

      // Make object entry a string separated by commas
      entryString +=
        data[i].country + ',' + data[i].currency + ',' + csvPrice + ',';

      // Combine new entry with previous entries
      allEntryStrings += entryString + '\r\n';
    }

    // Combine headers and entries, download to local file
    csvContent += headers + '\r\n' + allEntryStrings;
    let encodeUri = encodeURI(csvContent);
    window.open(encodeUri);
  };
});
