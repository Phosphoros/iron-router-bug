function makePage(number, text, isActive, oldParams, oldPath) {
  return {
    number: number,
    text: text,
    active: isActive ? 'active' : '',
    path: oldPath + "?" + buildQuery(oldParams, {
      page: number
    })
  };
}


function serialize(obj, prefix) {
  var str = [];
  for (var property in obj) {
    var key = prefix ? prefix + "[" + property + "]" : property,
      value = obj[property];
    if (typeof value !== 'undefined') {
      str.push(typeof value == "object" ?
        serialize(value, key) :
        encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
  }
  return str.join("&");
}

function buildQuery(_oldParams, newParams) {
  var resultParams = _.extend(_oldParams, newParams);
  return serialize(resultParams);
}

getPages = function(currentPage, totalDocuments, oldParams, oldPath) {
  var totalPages = Session.get("documentsPerPage") < 1 ? 1 : Math.ceil(totalDocuments / Session.get("documentsPerPage"));
  totalPages = Math.max(totalPages || 0, 1);
  if (totalPages <= 1) {
    return [];
  }

  // Setup configuration parameters
  var maxSize = Session.get("maxSize") ? Session.get("maxSize") : 7,
    currentPage = parseInt(currentPage, 10) ? parseInt(currentPage, 10) : 1,
    rotate = false;

  var pages = [];

  // Default page limits
  var startPage = 1,
    endPage = totalPages;
  var isMaxSized = (maxSize && maxSize < totalPages);

  // recompute if maxSize
  if (isMaxSized) {
    if (rotate) {
      // Current page is displayed in the middle of the visible ones
      startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
      endPage = startPage + maxSize - 1;

      // Adjust if limit is exceeded
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxSize + 1;
      }
    } else {
      // Visible pages are paginated with maxSize
      startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

      // Adjust last page if limit is exceeded
      endPage = Math.min(startPage + maxSize - 1, totalPages);
    }
  }

  // Add page number links
  for (var number = startPage; number <= endPage; number++) {
    var page = makePage(number, number, number === currentPage, oldParams, oldPath);
    pages.push(page);
  }

  // Add links to move between page sets
  if (isMaxSized && !rotate) {
    if (startPage > 1) {
      var previousPageSet = makePage(startPage - 1, '&hellip;', false, oldParams, oldPath);
      pages.unshift(previousPageSet);
    }

    if (endPage < totalPages) {
      var nextPageSet = makePage(endPage + 1, '&hellip;', false, oldParams, oldPath);
      pages.push(nextPageSet);
    }
  }

  if (currentPage > maxSize) {
    var firstPage = makePage(1, 1, false, oldParams, oldPath);
    pages.unshift(firstPage);
  }

  if (currentPage < totalPages - (maxSize - 2)) {
    var lastPage = makePage(totalPages, totalPages, currentPage === totalPages, oldParams, oldPath);
    pages.push(lastPage);
  }

  var previousPage = makePage(currentPage - 1 > 1 ? currentPage - 1 : 1, "&laquo;", false, oldParams, oldPath);
  pages.unshift(previousPage);

  var nextPage = makePage(currentPage + 1 < totalPages ? currentPage + 1 : totalPages, "&raquo;", false, oldParams, oldPath);
  pages.push(nextPage);

  return pages;
}