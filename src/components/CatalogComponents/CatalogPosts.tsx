// NOTE they must be hardcoded because
// they are "Catalog" posted by the website owners

const CatalogPosts = () => {
  return (
    <div className="post">
      <div className="post-header">
        {/* <h2>{title}</h2> */}
        <h2>{"Mercedes Benz E63s AMG 4matic 2021"}</h2>

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
            src={"https://i.imgur.com/bc7IsSE.jpg"}
            alt={"2021 mercedes benz amg e63s 4matic 21"}
            className="post-image"
          />
        </div>
      </div>
      {/* <p>{description}</p> */}
      {/* <p>{"description ".repeat(100)}</p> */}
      <h5 className="mt-3 fw-bold">Description:</h5>
      <p>{"Year made 2021 Mercedes Benz AMG E63s 4matic"}</p>

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
        Posted by: <span className="fw-normal">Cars Club</span>
      </h5>
    </div>
  );
};

export default CatalogPosts;
