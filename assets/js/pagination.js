function getPageList(totalPages, page, maxLength) {
  function range(start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }

  var sideWidth = maxLength < 9 ? 1 : 2;
  var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;

  if (totalPages <= maxLength) {
    // no breaks in list
    return range(1, totalPages);
  }

  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    // no break on left of page
    return range(1, maxLength - sideWidth - 1)
      .concat([0])
      .concat(range(totalPages - sideWidth + 1, totalPages));
  }

  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    // no break on right of page
    return range(1, sideWidth)
      .concat([0])
      .concat(
        range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
      );
  }

  // Breaks on both sides
  return range(1, sideWidth)
    .concat([0])
    .concat(range(page - leftWidth, page + rightWidth))
    .concat([0])
    .concat(range(totalPages - sideWidth + 1, totalPages));
}

$(function () {
  var numbersOfItems = $(".akbar-anime-grid .akbar-anime-card").length;
  var limitPerPage = 10;
  var totalPages = Math.ceil(numbersOfItems / limitPerPage);
  var paginationSize = 2;
  var currentPage;

  function showPage(whichPage) {
    if (whichPage < 1 || whichPage > totalPages) return false;
    currentPage = whichPage;
    $(".akbar-anime-grid .akbar-anime-card")
      .hide()
      .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
      .show();
    // Replace the navigation items (not prev/next):
    $(".akbar-pagination li").slice(1, -1).remove();
    getPageList(totalPages, currentPage, paginationSize).forEach((item) => {
      $("<li>")
        .addClass(
          "akbar-page-item " +
            (item ? "current-page " : "") +
            (item === currentPage ? "pagination-active " : "")
        )
        .append(
          $("<a>")
            .addClass("page-link")
            .attr({
              href: "javascript:void(0)",
            })
            .text(item || "...")
        )
        .insertBefore(".next-page");
    });
    $(".previous-page").toggleClass("disable", currentPage === 1);
    $(".next-page").toggleClass("disable", currentPage === totalPages);
    return true;
  }

  // Include the prev/next buttons:
  $(".akbar-pagination").append(
    $("<li>")
      .addClass("akbar-page-item previous-page disable")
      .append(
        $("<a>")
          .addClass("page-link")
          .attr({
            href: "javascript:void(0)",
          })
          .text("Prev")
      ),
    $("<li>")
      .addClass("akbar-page-item next-page")
      .append(
        $("<a>")
          .addClass("page-link")
          .attr({
            href: "javascript:void(0)",
          })
          .text("Next")
      )
  );
  // Show the page links
  $(".akbar-anime-grid").show();
  showPage(1);

  // Use event delegation, as these items are recreated later
  $(document).on("click", ".next-page", () => showPage(currentPage + 1));

  $(document).on("click", ".previous-page", () => showPage(currentPage - 1));

  $(document).on(
    "click",
    ".akbar-page-item.current-page:not(.pagination-active)",
    function () {
      return showPage(+$(this).text());
    }
  );
});
