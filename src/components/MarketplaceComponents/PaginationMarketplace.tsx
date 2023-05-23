// NOTE they must be hardcoded because
// they are "Catalog" posted by the website owners

import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
// import catalogArray from "./catalogArray";

const PaginationMarketplace = () => {
  // const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(sessionStorage.getItem("currentPage") || "1")
  );
  // const postPerPage = 2;
  const postPerPage = 1; // Just to make it easier for showcase

  // Catalog the indexes of the current page
  const numberOfLastPost = currentPage * postPerPage;
  const numberOfFirstPost = numberOfLastPost - postPerPage;

  // // Updates
  let totalPostsLengthSession = parseInt(
    sessionStorage.getItem("total_posts") || "0"
  );
  console.log("totalPostsLength SESSION::", totalPostsLengthSession);
  const totalPages = Math.ceil(totalPostsLengthSession / postPerPage);
  console.log("totalPages PaginationMarketplace:", totalPages);
  const [totalPostsLengthSTATE, setTotalPostsLengthSTATE] = useState<number>(0);
  console.log("totalPostsLengthSTATE:", totalPostsLengthSTATE);
  useEffect(() => {
    setTotalPostsLengthSTATE(totalPostsLengthSession);
  }, [totalPostsLengthSession]);
  // const totalPages = 20; // for Tests
  const disableNextButton = currentPage === totalPages;
  const disablePreviousButton = currentPage === 1;
  const disableFirstButton = currentPage === 1;
  const disableLastButton = currentPage === totalPages;
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo(0, 0); // Scroll to top
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    window.scrollTo(0, 0); // Scroll to top
  };

  const pageItems = [];
  if (totalPages <= 3) {
    // Show all page numbers
    for (let index = 1; index <= totalPages; index++) {
      pageItems.push(
        <Pagination.Item
          key={index}
          active={index === currentPage}
          onClick={() => {
            setCurrentPage(index);
            window.scrollTo(0, 0); // Scroll to top
          }}
        >
          {index}
        </Pagination.Item>
      );
    }
  } else {
    // Show limited page numbers with ellipsis
    const firstPage = Math.max(currentPage - 1, 1);
    const lastPage = Math.min(currentPage + 1, totalPages);

    for (let index = firstPage; index <= lastPage; index++) {
      pageItems.push(
        <Pagination.Item
          key={index}
          active={index === currentPage}
          onClick={() => {
            setCurrentPage(index);
            window.scrollTo(0, 0); // Scroll to top
          }}
        >
          {index}
        </Pagination.Item>
      );
    }
    // UI/UX add those '3 dots' from Bootstrap Pagination styling
    if (firstPage > 1) {
      // Add ellipsis before first page
      pageItems.unshift(
        <Pagination.Ellipsis key="ellipsis-start" disabled={true} />
      );
      pageItems.unshift(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => {
            setCurrentPage(1); // "firstPage"-Number clicks
            window.scrollTo(0, 0); // Scroll to top
          }}
        >
          1
        </Pagination.Item>
      );
    }
    if (lastPage < totalPages) {
      // Add ellipsis after last page
      pageItems.push(
        <Pagination.Ellipsis key="ellipsis-end" disabled={true} />
      );
      pageItems.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => {
            setCurrentPage(totalPages); // "lastPage"-Number clicks
            window.scrollTo(0, 0); // Scroll to top
          }}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
  }
  // UPDATE 3#
  const handleFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo(0, 0); // Scroll to top
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
    window.scrollTo(0, 0); // Scroll to top
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          size="lg"
          // size="sm"
          // default is Medium
        >
          <Pagination.First
            onClick={handleFirstPage}
            disabled={disableFirstButton}
          />
          <Pagination.Prev
            onClick={handlePreviousPage}
            disabled={disablePreviousButton}
          />
          {pageItems}
          <Pagination.Next
            onClick={handleNextPage}
            disabled={disableNextButton}
          />
          <Pagination.Last
            onClick={handleLastPage}
            disabled={disableLastButton}
          />
        </Pagination>
      </div>
    </>
  );
};

export default PaginationMarketplace;
