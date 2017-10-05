(function() {
  var numTables = Math.trunc(window.innerWidth/343,10);

  var tableContainer = document.querySelector('.table-container');
  
  var tables = createTables(characters, numTables);
  tables.forEach(function(table) { console.log(table); tableContainer.appendChild(table)});

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
})();

function createTables(data, numTables) {
  
  var table = document.createElement('table');
  var header = table.createTHead();
  var columnHeadings = Object.keys(data[0]);
  var numColumns = columnHeadings.length;
  var numRows = data.length;

  var row = table.insertRow();

  for (var i = 0; i < numColumns; i++) {
    var headerCell = document.createElement('th');
    headerCell.innerText = columnHeadings[i].toUpperCase();
    row.appendChild(headerCell);
  }

  var tBody = document.createElement('tbody');
  table.appendChild(tBody);

  for (var i = 0; i < numRows; i++) {
    row = tBody.insertRow(-1);
    for (var j = 0; j < numColumns; j++) {
      var cell = row.insertCell(-1);
      cell.setAttribute('data-label', columnHeadings[j].toUpperCase());
      var obj = data[i];
      cell.innerText = obj[columnHeadings[j]];
      row.appendChild(cell);
    }
  }

  return Array.from([table]);
}