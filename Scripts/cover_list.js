function sortTable(column, sorting) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("coverlist");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }

    // Set default class names for column sort icons
    document.getElementById('sort-artist').classList = 'fa fa-sort';
    document.getElementById('sort-songs').classList = 'fa fa-sort';
    document.getElementById('sort-year').classList = 'fa fa-sort';

    // get current sorting icon
    var $sorting = document.getElementById('sort-' + sorting);

    // apply sorting direction icon to current ( using reverse direction since we're detecting switching )
    if (dir === 'asc') {
      $sorting.classList = 'fa fa-sort-desc';
    } else {
      $sorting.classList = 'fa fa-sort-asc';
    }
  }
}

// Get objects from Document Object Model ( DOM ) outside of searchCoverlist function so we are not parsing the DOM for these same elements on every single key stroke
var $noResults = document.getElementById('no-results');
var $table = document.getElementById('coverlist');
var $tr = $table.getElementsByTagName('tr');
var $input = document.getElementById('keyword');

/*  Search Box */
function searchCoverlist(keyword) {

  // Set a default for number of matched search results
  var totalMatches = 0;

  // Check if there is a keyword set, and that it is not empty, otherwise don't bother doing a search
  if (!keyword || keyword.length === 0) {

    // Re-show previously hidden table rows
    for (i = 0; i < $tr.length; i++) {
      $tr[i].style.display = '';
    }

    // hide no results banner
    $noResults.style.display = 'none';

    // exit function as there is no need to continue
    return;
  }

  // Now that we've verfieid that we have a keyword, let's break up multiple words into an array
  var searchTerms = keyword.trim().split(' ');

  // Loop through Table Rows, starting at the second row ( skipping row zero as it is the hearder)
  for (i = 1; i < $tr.length; i++) {
    var $td = $tr[i].getElementsByTagName('td');
    var rowText = [];
    var match = false;

    // Loop through Table Cells within table row
    for (j = 0; j < $td.length; j++) {

      // Break up multiple words into array
      var cellText = $td[j].innerHTML.split(' ');

      // push individual words from table cell into array
      for (k = 0; k < cellText.length; k++) {
        rowText.push(cellText[k].toLowerCase());
      }
    }

    // Make sure we have text within the row
    if (rowText.length > 0) {
      // Loop through provided search terms from keword(s)
      for (l = 0; l < searchTerms.length; l++) {
        // Check if we have a match
        if (rowText.join(' ').indexOf(searchTerms[l].toLowerCase()) > -1) {
          // Update that we found a match in this row
          match = true;
        }
      }
    }

    // Check if we had any matches in the entire row
    if (match) {
      // Show table row
      $tr[i].style.display = '';

      // incriment total matches found
      totalMatches++;
    } else {
      // Hide table row
      $tr[i].style.display = 'none';
    }
  }

  // Decide whether to show No Results Banner
  $noResults.style.display = (totalMatches === 0) ? 'block': 'none';
}

// Hide Placeholder Text on Search Field when clicking inside
$input.onfocus = function() {
  $input.placeholder = '';
};

// Replace Placeholder Text on Search Field when leaving
$input.onblur = function() {
  $input.placeholder = 'Search Coverlist ...';
};
