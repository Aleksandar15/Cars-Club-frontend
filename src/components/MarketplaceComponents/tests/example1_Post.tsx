// I keep this example here for different ways
// to show Post's buttons and comments sections
// for future feature plans.

// START

// // ALL IMPORTs would need to be modified accordingly.
// import { useEffect } from "react";
// import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
// import useModalPost_formatNum from "../../hooks/ModalPostHooks/useModalPost_formatNum";
// import {
//   getAllPosts,
//   selectorPostsData,
//   selectorPostsError,
//   selectorPostsStatus,
// } from "../../redux/createAsyncThunk/getAllPosts";
// import {
//   useDispatchAsyncThunk,
//   useSelectorTyped,
// } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
// import { selectVerifyUser } from "../../redux/slices/verifySlice";
// import { Currency, PostType } from "../../utilities/Types/postsTypes";
// import Loading from "../Loading/Loading";

// function Post() {
//   // const handleDelete = () => {
//   //   onDelete();
//   // };

//   // const handleEdit = () => {
//   //   onEdit();
//   // };

//   //
//   // const [posts, setPosts] = useState<PostType[]>([]);
//   // // Posts empty data so that I can check copy & reset state if needed
//   // const postsInitial = [
//   //   {
//   //     post_title: "",
//   //     post_image_buffer: undefined,
//   //     post_description: "",
//   //     post_contact_number: "",
//   //     post_asking_price: "",
//   //     post_asking_price_currency: "",
//   //     post_id: "",
//   //     user_id: "",
//   //     post_created_at: "",
//   //   },
//   // ];
//   // console.log('posts:",posts:', posts);

//   const convertBufferToImgSRC = (bufferData: ArrayBufferLike | undefined) => {
//     const buffer = new Uint8Array(bufferData as ArrayBufferLike).buffer;
//     const blob = new Blob([buffer], { type: "image/jpeg" });
//     const blobToURL = URL.createObjectURL(blob);
//     // console.log("blobToURL:", blobToURL);
//     return blobToURL;
//   };

//   const dispatchAsyncThunk = useDispatchAsyncThunk();
//   const posts = useSelectorTyped(selectorPostsData);
//   const postsStatus = useSelectorTyped(selectorPostsStatus);
//   const postsError = useSelectorTyped(selectorPostsError);
//   useEffect(() => {
//     dispatchAsyncThunk(getAllPosts());
//   }, []);
//   // console.log("posts:", posts);
//   // console.log("postsStatus:", postsStatus);
//   // console.log("postsError:", postsError);

//   const { formatNumber } = useModalPost_formatNum();

//   const { user_id } = useSelectorTyped(selectVerifyUser);

//   if (postsStatus === "idle" || postsStatus === "loading") {
//     // Might need to move these inside parent: MarketPlace.tsx
//     return <Loading />; // Looks good here as well
//   }

//   if (postsStatus === "failed") {
//     return <h1>Error: {postsError}. Please refresh or try again later.</h1>;
//   }

//   return (
//     <>
//       {posts.length > 0 &&
//         posts.map((post) => {
//           {
//             // console.log("post:", post);
//             // console.log("post.post_id:", post.post_id);
//           }
//           return (
//             <div className="post" key={post.post_id}>
//               <div className="post-header">
//                 <h2>{post.post_title}</h2>
//                 <div className="post-actions">
//                   {post.user_id === user_id ||
//                   // AT LEAST it's Post's owner, otherwise moderators:
//                   post.post_created_by_user_role === "owner" ||
//                   post.post_created_by_user_role === "super-admin" ? (
//                     <ButtonGroup>
//                       <Button
//                         className="bg-warning btn-outline-warning text-light"
//                         style={{
//                           maxWidth: "70px",
//                           width: "70px",
//                           zIndex: "0",
//                           // marginLeft: "0px",
//                         }}
//                         onClick={() => console.log("Edit clicked")}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         className="bg-danger btn-outline-danger text-light"
//                         style={{ maxWidth: "70px", width: "70px" }}
//                       >
//                         Delete
//                       </Button>
//                     </ButtonGroup>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="post-image-wrapper-center">
//                 <div className="post-image-wrapper">
//                   <img
//                     src={convertBufferToImgSRC(post.post_image_buffer?.data)}
//                     alt={"title"}
//                     className="post-image"
//                   />
//                 </div>
//               </div>
//               <h6 className="mt-3 fw-bold">Description:</h6>
//               <p>{post.post_description}</p>
//               <p>
//                 <span className="fw-bold">Asking price:</span>{" "}
//                 {post.post_asking_price_currency === "USD" ? "$" : null}
//                 {formatNumber(
//                   post.post_asking_price,
//                   post.post_asking_price_currency as Currency
//                 )}
//                 {post.post_asking_price_currency === "EUR" ? "€" : null}
//               </p>
//               <p>
//                 <span className="fw-bold">Contact number:</span>{" "}
//                 {post.post_contact_number}
//               </p>
//               <p>
//                 <span className="fw-bold">Posted by:</span>{" "}
//                 {post.post_created_by_user_name}
//               </p>
//               <p>
//                 <span className="fw-bold">Date posted:</span>{" "}
//                 {post.post_created_at.slice(0, 10)}
//                 {/* {console.log("new Date():", new Date(post.post_created_at))} */}
//                 {/* ^: Thu May 18 2023 10:05:02 GMT+0200 (Central European SUmmer TIme) */}
//               </p>
//               {/* <div className="post-comments">
//                 <h6>Comments:</h6>
//                 <ul className="post-comments-ul">
//                   {comments.map((comment, index) => (
//                     <li key={index} className="post-comments-li">
//                       {comment}
//                     </li>
//                   ))}
//                 </ul>
//               </div> */}
//             </div>
//           );
//         })}
//       {/*  */}
//       {/*  */}
//       {/*  */}
//       {/*  */}
//       {/*  */}
//       <div className="post">
//         <div className="post-header">
//           {/* <h2>{title}</h2> */}
//           <h2>{"title"}</h2>
//           <div className="post-actions">
//             {/* <button onClick={handleDelete}>Delete</button>
//           <button onClick={handleEdit}>Edit</button> */}
//             <ButtonGroup>
//               <Button
//                 className="bg-warning btn-outline-warning text-light"
//                 // variant="bg-warning btn-outline-warning text-light"
//                 style={{
//                   // transform: "scale(1)", // Enlarges the button if value is '2'+
//                   // transform: "scale(-1)", // Flips the button upside down
//                   maxWidth: "70px",
//                   width: "70px",

//                   // Styling issue was: react-bootstrap wise
//                   // left-button's border is hovering over its right-sibling, then
//                   // in DevTools I found out both of these styling below were causing
//                   // that issue and fix is: either zIndex to 0; on the left button or
//                   // marginLeft on the right (Delete) button would fix the issue.
//                   zIndex: "0",
//                   // marginLeft: "0px", // Can be used on the right ('delete') button
//                 }}
//                 onClick={() => console.log("Edit clicked")}
//               >
//                 Edit
//               </Button>
//               <Button
//                 className="bg-danger btn-outline-danger text-light"
//                 style={{ maxWidth: "70px", width: "70px" }}
//               >
//                 Delete
//               </Button>
//             </ButtonGroup>
//           </div>
//         </div>
//         <div className="post-image-wrapper-center">
//           <div className="post-image-wrapper">
//             {/* <img src={image} alt={title} /> */}
//             <img
//               src={
//                 "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/16q1/665058/2017-mercedes-benz-e-class-photos-and-info-news-car-and-driver-photo-665186-s-original.jpg"
//               }
//               alt={"title"}
//               className="post-image"
//             />
//           </div>
//         </div>
//         {/* <p>{description}</p> */}
//         <p>{"description ".repeat(100)}</p>
//         <div className="post-comments">
//           <h6>Comments:</h6>
//           {/* <ul className="post-comments-ul">
//           {comments.map((comment, index) => (
//             <li key={index} className="post-comments-li">{comment}</li>
//           ))}
//         </ul> */}
//         </div>
//       </div>
//       <div className="post">
//         <div className="post-header">
//           <h2>{"title"}</h2>
//           <div className="post-actions">
//             <ButtonGroup>
//               <Button
//                 className="bg-warning btn-outline-warning text-light"
//                 style={{
//                   maxWidth: "70px",
//                   width: "70px",
//                   zIndex: "0",
//                   // marginLeft: "0px",
//                 }}
//                 onClick={() => console.log("Edit clicked")}
//               >
//                 Edit
//               </Button>
//               <Button
//                 className="bg-danger btn-outline-danger text-light"
//                 style={{ maxWidth: "70px", width: "70px" }}
//               >
//                 Delete
//               </Button>
//             </ButtonGroup>
//           </div>
//         </div>
//         <div className="post-image-wrapper-center">
//           <div className="post-image-wrapper">
//             <img
//               src={
//                 "https://images.unsplash.com/photo-1602596322568-33cca0e8b4ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVyY2VkZXMlMjBlJTIwY2xhc3N8ZW58MHx8MHx8"
//               }
//               alt={"title"}
//               className="post-image"
//             />
//           </div>
//         </div>
//         <p>{"description ".repeat(100)}</p>
//         <div className="post-comments">
//           <h6>Comments:</h6>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Post;
