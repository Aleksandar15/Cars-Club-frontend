// NOTE this is a working example with 3 Updates
// but a mix of 90% Update 2 and 10% Update 3
// is the final result.

import { useState } from "react";
import { Pagination } from "react-bootstrap";
import catalogArray from "../catalogArray"; //Modify accordingly

const CatalogPosts = () => {
  // const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postPerPage = 2;

  // Catalog the indexes of the current page
  const numberOfLastPost = currentPage * postPerPage;
  const numberOfFirstPost = numberOfLastPost - postPerPage;

  // // React bootstrap tests
  // let active = 2;
  // let items = [];
  // // for (let number = 1; number <= 5; number++) {
  // for (let number = 1; number <= catalogArray.length; number++) {
  //   items.push(
  //     <Pagination.Item key={number} active={number === active}>
  //       {number}
  //     </Pagination.Item>
  //   );
  // }
  // // Modifications
  const totalPages = Math.ceil(catalogArray.length / postPerPage);
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
  // // // UPDATES: pageItems
  // // Include numbers in-between arrows of Pagination.Prev and Pagination.Next
  // // Otherwise #2 way is to use open an closing tags and include the numbers.
  // const pageItems = Array.from({ length: totalPages }, (_, index) => (
  //   <Pagination.Item
  //     key={index + 1}
  //     active={index + 1 === currentPage}
  //     onClick={() => setCurrentPage(index + 1)}
  //   >
  //     {index + 1}
  //   </Pagination.Item>
  // ));
  // // // Update 2 on pageItems
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
      pageItems.unshift(<Pagination.Ellipsis key="ellipsis-start" />);
      pageItems.unshift(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => {
            setCurrentPage(1); // it does nothing anyway
            window.scrollTo(0, 0); // Scroll to top // NOT Necessary
          }}
        >
          1
        </Pagination.Item>
      );
    }
    if (lastPage < totalPages) {
      // Add ellipsis after last page
      pageItems.push(<Pagination.Ellipsis key="ellipsis-end" />);
      pageItems.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => {
            setCurrentPage(totalPages); // it does nothing anyway
            window.scrollTo(0, 0); // Scroll to top // NOT Necessary
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
  // const pageItems = [];
  // if (totalPages <= 3) {
  //   // Show all page numbers
  //   for (let index = 1; index <= totalPages; index++) {
  //     pageItems.push(
  //       <Pagination.Item
  //         key={index}
  //         active={index === currentPage}
  //         onClick={() => setCurrentPage(index)}
  //       >
  //         {index}
  //       </Pagination.Item>
  //     );
  //   }
  // } else {
  //   // Show limited page numbers with ellipsis
  //   const firstPage = Math.max(currentPage - 1, 1);
  //   const lastPage = Math.min(currentPage + 1, totalPages);

  //   for (let index = firstPage; index <= lastPage; index++) {
  //     pageItems.push(
  //       <Pagination.Item
  //         key={index}
  //         active={index === currentPage}
  //         onClick={() => setCurrentPage(index)}
  //       >
  //         {index}
  //       </Pagination.Item>
  //     );
  //   }

  //   if (firstPage > 1) {
  //     // Add ellipsis before first page
  //     pageItems.unshift(<Pagination.Ellipsis key="ellipsis-start" />);
  //     pageItems.unshift(
  //       <Pagination.Item
  //         key={1}
  //         active={1 === currentPage}
  //         onClick={handleFirstPage}
  //       >
  //         1
  //       </Pagination.Item>
  //     );
  //   }

  //   if (lastPage < totalPages) {
  //     // Add ellipsis after last page
  //     pageItems.push(<Pagination.Ellipsis key="ellipsis-end" />);
  //     pageItems.push(
  //       <Pagination.Item
  //         key={totalPages}
  //         active={totalPages === currentPage}
  //         onClick={handleLastPage}
  //       >
  //         {totalPages}
  //       </Pagination.Item>
  //     );
  //   }
  // } // Update 3 ends but wasn't necessary except for handleLast and handleFirst

  return (
    <>
      {catalogArray.slice(numberOfFirstPost, numberOfLastPost).map((post) => {
        return (
          <div className="post" key={post.post_id}>
            <div className="post-header">
              <h2>{post.post_car_title}</h2>
            </div>
            <div className="post-image-wrapper-center">
              <div className="post-image-wrapper">
                <img
                  src={post.post_image_src_Link}
                  alt={post.post_image_alt}
                  className="post-image"
                />
              </div>
            </div>
            {/* <p>{description}</p> */}
            {/* <p>{"description ".repeat(100)}</p> */}
            <h5 className="mt-3 fw-bold">Description:</h5>
            <p>{post.post_description}</p>

            {/* NO COMMENTS ON CATALOG PAGE!:) */}
            {/* <div className="post-comments">
        <h6>Comments:</h6>
        <ul className="post-comments-ul">
          {comments.map((comment, index) => (
            <li key={index} className="post-comments-li">{comment}</li>
          ))}
        </ul>
      </div> */}

            {/* <h6>Posted by:</h6>
      <p>Cars Club</p> */}
            <h5 className="fw-bold">
              Posted by:{" "}
              <span className="fw-normal">{post.post_posted_by}</span>
            </h5>
            <h5 className="fw-bold">
              Price: <span className="fw-normal">{post.post_car_price}</span>
            </h5>

            {/* Comments Section #2 UI/UX tests */}
            {/* <div className="comments-section">
              <h3 className="comments-heading">Comments:</h3>
              <ul className="comments-list">
                {post.comments.map((comment, index) => (
                <li className="comment" key={"index"}>
                  <span className="commenter-name">{"comment.name"}: </span>
                  <span className="comment-content">{"comment.content"}</span>
                </li>
                ))}
              </ul>
            </div> */}
          </div>
        );
      })}
      {/* <button>NEXT</button> */}

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

export default CatalogPosts;
