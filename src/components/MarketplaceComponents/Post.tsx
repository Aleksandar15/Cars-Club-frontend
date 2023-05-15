import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

function Post() {
  // const handleDelete = () => {
  //   onDelete();
  // };

  // const handleEdit = () => {
  //   onEdit();
  // };

  return (
    <>
      <div className="post">
        <div className="post-header">
          {/* <h2>{title}</h2> */}
          <h2>{"title"}</h2>
          <div className="post-actions">
            {/* <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button> */}
            <ButtonGroup>
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
            </ButtonGroup>
          </div>
        </div>
        <div className="post-image-wrapper-center">
          <div className="post-image-wrapper">
            {/* <img src={image} alt={title} /> */}
            <img
              src={
                "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/16q1/665058/2017-mercedes-benz-e-class-photos-and-info-news-car-and-driver-photo-665186-s-original.jpg"
              }
              alt={"title"}
              className="post-image"
            />
          </div>
        </div>
        {/* <p>{description}</p> */}
        <p>{"description ".repeat(100)}</p>
        <div className="post-comments">
          <h6>Comments:</h6>
          {/* <ul className="post-comments-ul">
          {comments.map((comment, index) => (
            <li key={index} className="post-comments-li">{comment}</li>
          ))}
        </ul> */}
        </div>
      </div>
      <div className="post">
        <div className="post-header">
          <h2>{"title"}</h2>
          <div className="post-actions">
            <ButtonGroup>
              <Button
                className="bg-warning btn-outline-warning text-light"
                style={{
                  maxWidth: "70px",
                  width: "70px",
                  zIndex: "0",
                  // marginLeft: "0px",
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
            </ButtonGroup>
          </div>
        </div>
        <div className="post-image-wrapper-center">
          <div className="post-image-wrapper">
            <img
              src={
                "https://images.unsplash.com/photo-1602596322568-33cca0e8b4ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVyY2VkZXMlMjBlJTIwY2xhc3N8ZW58MHx8MHx8"
              }
              alt={"title"}
              className="post-image"
            />
          </div>
        </div>
        <p>{"description ".repeat(100)}</p>
        <div className="post-comments">
          <h6>Comments:</h6>
        </div>
      </div>
    </>
  );
}

export default Post;
