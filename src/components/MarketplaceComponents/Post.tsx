import { useRef, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import { GotThreePostsROWS } from "../../utilities/Types/postsTypes";

function Post() {
  // const handleDelete = () => {
  //   onDelete();
  // };

  // const handleEdit = () => {
  //   onEdit();
  // };

  //
  const [dataImg, setDataImg] = useState("");
  const axiosCredentials = useAxiosInterceptor();
  const [posts, setPosts] = useState<GotThreePostsROWS[]>([]);
  // // Posts empty data so that I can check copy & reset state if needed
  // const postsInitial = [
  //   {
  //     post_title: "",
  //     post_image_buffer: undefined,
  //     post_description: "",
  //     post_contact_number: "",
  //     post_asking_price: "",
  //     post_asking_price_currency: "",
  //     post_id: "",
  //     user_id: "",
  //     post_created_at: "",
  //   },
  // ];
  console.log('posts:",posts:', posts);
  const getImage = async () => {
    const { data } = await axiosCredentials.get(
      // `/api/v1/post/getimagebyid/${1}`
      // `/api/v1/post/getimagebyid/${4}` //this is the PNG
      // { responseType: "arraybuffer" }
      `/api/v1/post/getallposts`
    );
    console.log("getImage DATA.imageSrc:::", data?.imageSrc);
    console.log("getImage DATA.imageSrc.data:::", data?.imageSrc?.data);
    console.log("getImage DATA:::", data);
    console.log("getImage DATA?.gotThreePostsROWS:::", data?.gotThreePostsROWS);
    setPosts(data?.gotThreePostsROWS as GotThreePostsROWS[]);
    // setDataImg(data.imageSrc); //works when i use Buffer on the backend & kungfu `data:image/jpeg;base64,${base64img}`

    // Below is a new code by avoiding Base64

    // // const buffer = new Uint8Array(data?.imageSrc?.data).buffer;
    // const buffer = new Uint8Array(data?.imageSrc?.data).buffer;
    // setBufferDataState(data?.imageSrc?.data);
    // const blob = new Blob([buffer], { type: "image/jpeg" });

    // const reader = new FileReader();
    // reader.onload = function (e) {
    //   const binaryData = e?.target?.result;
    //   console.log("binaryData:::::", binaryData);
    //   console.log("URL.createObjectURL(blob):", URL.createObjectURL(blob));
    //   const blobUrl = URL.createObjectURL(blob);
    //   // setDataImg(URL.createObjectURL(blob));
    //   setDataImg(blobUrl);
    // };
    // // reader.readAsDataURL(blob); // this doesn't require blobUrl
    // // // ^-> BUT converts it to Base64 and adds 33% aprox. size.
    // // Alternative to avoid size increments:
    // reader.readAsArrayBuffer(blob);
  };

  const [bufferDataState, setBufferDataState] = useState();
  console.log("bufferDataState:", bufferDataState);
  // // const convertBufferToImgSRC = (bufferData: any) => {
  // const convertBufferToImgSRC = (bufferData: ArrayBufferLike | undefined) => {
  //   console.log("bufferDataState IN convertBufferToImgSRC:", bufferDataState);
  //   const buffer = new Uint8Array(bufferData as ArrayBufferLike).buffer;
  //   // const buffer = new Uint8Array(bufferDataState as ArrayBufferLike).buffer;
  //   const blob = new Blob([buffer], { type: "image/jpeg" });

  //   const reader = new FileReader();
  //   let blobUrl;
  //   reader.onload = function (e) {
  //     const binaryData = e?.target?.result;
  //     console.log("binaryData:::::", binaryData);
  //     console.log("URL.createObjectURL(blob):", URL.createObjectURL(blob));
  //     // const blobUrl = URL.createObjectURL(blob);
  //     blobUrl = URL.createObjectURL(blob);
  //     console.log("blobUrl convertBuffertoIMGsrc11111:", blobUrl);
  //     return blobUrl;
  //   };
  //   console.log("blobUrl convertBuffertoIMGsrc22222:", blobUrl);
  //   // reader.readAsDataURL(blob); // this doesn't require blobUrl
  //   // // ^-> BUT converts it to Base64 and adds 33% aprox. size.
  //   // Alternative to avoid size increments:
  //   reader.readAsArrayBuffer(blob);
  // };
  // // // console.log("convertBufferToImgSRC():", convertBufferToImgSRC());
  // 2:
  // const convertBufferToImgSRC = async (
  //   bufferData: ArrayBufferLike | undefined
  // ) => {
  //   console.log("bufferDataState IN convertBufferToImgSRC:", bufferDataState);
  //   const buffer = new Uint8Array(bufferData as ArrayBufferLike).buffer;
  //   const blob = new Blob([buffer], { type: "image/jpeg" });
  //   console.log(
  //     "~> IMPORTANT URL.createObjectURL(blob):",
  //     URL.createObjectURL(blob)
  //   );

  //   const reader = new FileReader();
  //   let blobUrl;

  //   await new Promise<void>((resolve, reject) => {
  //     reader.onload = function (e) {
  //       const binaryData = e?.target?.result;
  //       console.log("binaryData convertBufferToImgSRC11::", binaryData);
  //       blobUrl = URL.createObjectURL(blob);
  //       console.log("blobUrl convertBuffertoIMGsrc11111:", blobUrl);
  //       resolve();
  //     };

  //     reader.onerror = function (e) {
  //       reject(e);
  //     };

  //     reader.readAsArrayBuffer(blob);
  //   });

  //   console.log("blobUrl convertBuffertoIMGsrc22222:", blobUrl);
  //   return blobUrl;
  // };
  // 3:
  const convertBufferToImgSRC = (bufferData: ArrayBufferLike | undefined) => {
    console.log("bufferDataState IN convertBufferToImgSRC:", bufferDataState);
    const buffer = new Uint8Array(bufferData as ArrayBufferLike).buffer;
    // const buffer = new Uint8Array(bufferDataState as ArrayBufferLike).buffer;
    const blob = new Blob([buffer], { type: "image/jpeg" });
    const blobToURL = URL.createObjectURL(blob);
    console.log("blobToURL:", blobToURL);
    return blobToURL;

    // const reader = new FileReader();
    // let blobUrl;
    // reader.onload = function (e) {
    //   const binaryData = e?.target?.result;
    //   console.log("binaryData:::::", binaryData);
    //   console.log("URL.createObjectURL(blob):", URL.createObjectURL(blob));
    //   // const blobUrl = URL.createObjectURL(blob);
    //   blobUrl = URL.createObjectURL(blob);
    //   console.log("blobUrl convertBuffertoIMGsrc11111:", blobUrl);
    //   return blobUrl;
    // };
    // console.log("blobUrl convertBuffertoIMGsrc22222:", blobUrl);
    // // reader.readAsDataURL(blob); // this doesn't require blobUrl
    // // // ^-> BUT converts it to Base64 and adds 33% aprox. size.
    // // Alternative to avoid size increments:
    // reader.readAsArrayBuffer(blob);
  };

  return (
    <>
      <button
        onClick={() => {
          console.log(
            "convertBufferToImgSRC():",
            convertBufferToImgSRC(bufferDataState)
          );
        }}
      >
        CLICK
      </button>
      <button onClick={getImage}>GET IMAGE</button>
      <img
        id="img"
        alt="image test"
        // src={`data:image/jpeg;base64,${dataImg}`} // ONLY when Buffer.from...toString("Base64") is Sent
        src={dataImg} // Only when the `data:image/jpeg;base64,${base64Image}` is added on top of the Buffer.from().
        // src={"blob:http://localhost:5173/fccfd3c8-daf4-431e-9762-d1c7e8470007"}
      />
      {/*  */}
      {/*  */}
      {/*  */}
      {posts.length > 0 &&
        posts.map((post) => {
          {
            console.log("post:", post);
          }
          return (
            <div className="post" key={post.post_id}>
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
                    src={convertBufferToImgSRC(post.post_image_buffer?.data)}
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
          );
        })}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
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
