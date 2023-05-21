// NOTE I'll NOT use this component
// is here for reminder

import catalogArray from "../catalogArray"; //Modify accordingly

const CatalogPosts = () => {
  return (
    <>
      {catalogArray.map((post) => {
        return (
          <div className="post" key={post.post_id}>
            <div className="post-header">
              <h2>{post.post_car_title}</h2>
              {/* <h2>{"Mercedes Benz E63s AMG 4matic"}</h2> */}

              {/* NO NEED FOR BUTTONS ON CATALOG PAGE! */}
              <div className="post-actions">
                {/* NO NEED FOR BUTTONS ON CATALOG PAGE! */}
                {/* <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button> */}
                {/* <ButtonGroup>
            <Button
              className="bg-warning btn-outline-warning text-light"
              // variant="bg-warning btn-outline-warning text-light"
              style={{
                // transform: "scale(1)", // Enlarges the button if value is '2'+
                // transform: "scale(-1)", // Flips the button upside down
                maxWidth: "70px",
                width: "70px",

                // Styling issue was: react-bootstrap wise
                // left-button's border is hovering over its right-sibling, then
                // in DevTools I found out both of these styling below were causing
                // that issue and fix is: either zIndex to 0; on the left button or
                // marginLeft on the right (Delete) button would fix the issue.
                zIndex: "0",
                // marginLeft: "0px", // Can be used on the right ('delete') button
              }}
              onClick={() => console.log("Edit clicked")}
            >
              Edit
            </Button>
            <Button
              className="bg-danger btn-outline-danger text-light"
              style={{ maxWidth: "70px", width: "70px" }}
            >
              Delete
            </Button>
          </ButtonGroup> */}
              </div>
              {/*  */}
            </div>
            <div className="post-image-wrapper-center">
              <div className="post-image-wrapper">
                {/* <img src={image} alt={title} /> */}
                <img
                  src={post.post_image_src_Link}
                  alt={"2021 mercedes benz amg e63s 4matic 21"}
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
    </>
  );
};

export default CatalogPosts;
