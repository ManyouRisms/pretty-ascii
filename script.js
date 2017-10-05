(function() {
  renderTables();
  setupCellBehavior();
})();


function renderTables() {
  var numTables = Math.trunc(window.innerWidth/343,10);
  var tableContainer = document.querySelector('.table-container');    
  var tables = createTables(characters, numTables);
  tables.forEach(function(table) { tableContainer.appendChild(table)});
}

function setupCellBehavior() {
  var cells = document.getElementsByTagName("td");
  for (var i = 0; i < cells.length; i++ ) {
    cells[i].title = "Click to copy";
    cells[i].addEventListener("click", function(event) {
      var text = document.getElementsByTagName("textarea")[0];
      text.innerHTML = event.target.innerHTML;
      text.select();
      document.execCommand('copy');
    });
  };
}

function createTables(data, numTables) {
  var tables = [];
  var totalRowIndex = 0;
  for (var tableIndex = 0; tableIndex < numTables; tableIndex++) {
    var j = 0;
    var table = document.createElement('table');
    var header = table.createTHead();
    var columnHeadings = Object.keys(data[0]);
    var numColumns = columnHeadings.length;
    var numRows = data.length;
    var numRowsPerTable = Math.trunc(numRows/numTables);
    var row = header.insertRow();

    for (colIndex = 0; colIndex < numColumns; colIndex++) {
      var headerCell = document.createElement('th');
      headerCell.innerText = columnHeadings[colIndex];
      row.appendChild(headerCell);
    }
    var tBody = document.createElement('tbody');
    table.appendChild(tBody);

    for (var i = 0; i < numRowsPerTable; i++, totalRowIndex++) {
      row = tBody.insertRow(-1);
      for (var j = 0; j < numColumns; j++) {
        var cell = row.insertCell(-1);
        cell.setAttribute('data-label', columnHeadings[j]);
        var obj = data[totalRowIndex];
        cell.innerText = obj[columnHeadings[j]];
        row.appendChild(cell);
      }
    }
    tables.push(table);
  }
  
  return Array.from(tables);
}