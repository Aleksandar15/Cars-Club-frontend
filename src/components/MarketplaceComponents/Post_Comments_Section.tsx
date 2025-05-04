import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Post_Comments_Section: React.FC = ({ post }) => {
  // const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false);
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState<{
    [key: string]: boolean;
  }>({});
  // console.log("isCommentSectionVisible:", isCommentSectionVisible);

  return (
    <div
      // className="comments-section"
      className="post-comments-section"
    >
      <p
        // className="mt-1 fw-bold"
        className=" fw-bold"
        // className="fw-bold"
      >
        Comments:
        <Button
          // {/* <button */}
          // // Functionality to show/hide comments-per-post
          // onClick={
          //   // function to run it
          // }
          onClick={() => {
            // console.log("Test, & post.post_id:", post.post_id);
            // setIsCommentSectionVisible(!isCommentSectionVisible);
            setIsCommentSectionVisible((prevState) => {
              // console.log(
              //   'prevState inside "setIsCommentSectionVisible":',
              //   prevState
              // ); // "isCommentSectionVisible" gets filled up with as many post's ID's whenever SHOW-comment buttons are clicked -> as it stores them in a key-value pair => it still won't slow down even if there's 1000s
              return {
                ...prevState, // 'prevState' is an object containing key-value pairs.
                // This works since 'post.post_id' is typeof string,
                // so such object's property named "post.post_id" is created
                // & starts with 'undefined' value & !undefined -> becomes => true
                [post.post_id]: !prevState[post.post_id],
              };
            });
          }}
          // style={color="red"}
          // style={(color = "red")} //VScode wrong corrections
          // style={{ color: "red", cursor: "default" }}
          style={{
            color: "white",
            marginLeft: "5px",
            padding: "3px 4px",
          }}
          // className="fw-bold btn-primary"
          // className="mt-3"
          // className="fw-bold btn-danger btn mt-3"
          // className="fw-bold btn-danger btn mt-0"
          // className="btn-warning btn mt-0"
          // // "btn-sm" for small button:
          // className="btn-warning btn mt-0 btn-sm"
          // className="btn-warning btn mt-0 btn-sm ml-3"
          // // Since the button is added in the P tag, there's no longer need of "mt-0".
          className="btn-warning btn btn-sm"
          // // ></Button>
        >
          {/* SHOW/HIDE */}
          {/* {isCommentSectionVisible ? "HIDE" : "SHOW"} */}
          {isCommentSectionVisible[post.post_id] ? "HIDE" : "SHOW"}
          {/* </button> */}
        </Button>
      </p>
      {/* {isCommentSectionVisible && ( */}
      {isCommentSectionVisible[post.post_id] && (
        <h6 style={{ color: "red", fontStyle: "italic" }}>
          {/* Comment feature incoming. */}
          Comment feature coming soon.
        </h6>
        // <div
        // //   style={{
        // //     // padding: "10px",
        // //     padding: "3px",
        // //     // marginLeft: "10px",
        // //     // margin: "10px", // testing phase
        // //     // margin: "10px 5px", // testing phase
        // //     // margin: "10px 8px", // testing phase
        // //     // margin: "-8px -15px",
        // //     margin: "-12px -15px",
        // //     //
        // //     // backgroundColor: "#f8f9fa",
        // //     // backgroundColor: "magenta",
        // //     // backgroundColor: "smokewhite",
        // //     // backgroundColor: "darkblue",
        // //     // border: "3px dotted cyan",
        // //     // border: "3px dotted red", //modify it to fit the rest of the page
        // //     border: "3px dotted darkblue",
        // //     borderRadius: "15.5px",
        // //     listStyleType: "disc",
        // //     cursor: "default",
        // //   }}
        // >
        //   <ul
        //     // className="list-group"
        //     className="post-comments-ul"
        //   >
        //     {/* <li
        //       // // {/* {comments.map((comment, index) => (
        //       // // {/* @
        //       // // {/* Symbol `@` for UI can't be in here as it's started on a new line
        //       // // because it's considered a new item.
        //       // key={index}
        //       className="list-group-item"
        //       // Note: this className removes 'dot' sign prior to the listed items => NEEDS FIX
        //       style={{
        //         // padding: "10px",
        //         padding: "3px",
        //         // marginLeft: "10px",
        //         // margin: "10px", // testing phase
        //         // margin: "10px 5px", // testing phase
        //         // margin: "10px 8px", // testing phase
        //         // margin: "10px 18px", //
        //         // margin: "12px 18px",
        //         // margin: "-20px 18px",
        //         // margin: "-12px 18px",
        //         // margin: "-8px 18px",
        //         // margin: "-8px -22px",
        //         // margin: "-8px -2px",
        //         // margin: "-18px -2px",
        //         // margin: "-8px -15px",
        //         margin: "-12px -15px",
        //         //
        //         // backgroundColor: "#f8f9fa",
        //         // backgroundColor: "magenta",
        //         // backgroundColor: "smokewhite",
        //         // backgroundColor: "darkblue",
        //         // border: "1px solid #ddd",
        //         // border: "1px dotted cyan",
        //         // border: "2px dotted cyan",
        //         // border: "3px dotted cyan",
        //         // border: "3px dotted red", //modify it to fit the rest of the page
        //         border: "3px dotted darkblue",
        //         // borderRadius: "10px",
        //         // borderRadius: "10px 8px",
        //         // borderRadius: "10px 6px",
        //         // borderRadius: "12.5px",
        //         borderRadius: "15.5px",
        //         listStyleType: "disc",
        //         cursor: "default",
        //         //
        //         // color: "red",
        //         color: "darkblue",
        //       }}
        //       //
        //       // value={post.post_created_by_user_name}
        //     >
        //       @{post.post_created_by_user_name}
        //     </li> */}
        //     <li
        //     // {/* ))}  // - These braces are for closing the above comment.map method which is commented out for now since there is no full functionality yet.
        //     // Test2 - this second test user should be removed as comment.map method above should be used in the future.
        //     // className="list-group-item"
        //     // // With & without this className there is a visual difference
        //     // // where "dot" is not added if there's no  className so I should make a UI decision.
        //     >
        //       {/* @Test */}
        //       <span> @{post.post_created_by_user_name}: </span>Comment
        //       Example
        //     </li>
        //   </ul>
        //   <form
        //   // onSubmit={handleCommentSubmit}
        //   >
        //     <div className="form-group">
        //       <label htmlFor="comment">Add a comment:</label>
        //       <textarea
        //         id="comment"
        //         className="form-control"
        //         // rows="3" // Data type is supposed to be a number.
        //         rows={3}
        //         // value={newComment}
        //         // onChange={handleCommentChange}
        //         // >
        //         // // NOTE:
        //         // // DO NOT CLOSE IT LIKE BELOW, since this textarea tag above will be a self-closing tag.
        //         // // {/* Test text
        //         // // </textarea>
        //       />
        //     </div>
        //     <button type="submit" className="btn btn-primary">
        //       Submit
        //     </button>
        //   </form>
        // </div>
      )}
    </div>
  );
};

export default Post_Comments_Section;
