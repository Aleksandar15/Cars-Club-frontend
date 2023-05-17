import { useRef, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";

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
  const getImage = async () => {
    const { data } = await axiosCredentials.get(
      // `/api/v1/post/getimagebyid/${1}`
      `/api/v1/post/getimagebyid/${4}`
    );
    // console.log("getImage DATA::", data);
    // setDataImg(data);
    // // console.log("getImage DATA.DATA::", data.data); //undefined when sent without JSON
    // // but with JSON i see imageData: is an object of: type: 'Buffer', data: Array(250000)} // random number
    // IN JSON:
    // // // console.log("getImage DATA.imageData:::", data.imageData); //Now there's data:Array(250K), type: 'Buffer'
    // // // setDataImg(data.imageData); // still doesnt show image
    // console.log("getImage DATA.imageData.DATA:::", data.imageData.data);
    // // setDataImg(data.imageData.data); // still doesnt show image
    // // // ^ DOESNT Show img in SRC but at least array of readable number's
    // // // ChatGPT is wrong:
    // // // I must use some method instead of using his Kung-FU img src={`data:image/jpeg;base64,${dataImg}`}
    // // const base64Image = btoa(String.fromCharCode(...data.imageData.data)); //doesnt work
    // // const base64Image = Buffer.from(data.imageData).toString("base64"); //Buffer doesn't exists. only in NODE
    // // setDataImg(base64Image);
    // // Let's do it on Node side then and remove the KUNG-FU data below that wrongfully chatgpt gave to me.
    // WORKS:
    // console.log("getImage DATA.base64Image:::", data.base64Image);
    // setDataImg(data.base64Image); //works when i use Buffer on the backend & in here using the Kung-FU SRC value.
    // WORKS2:
    // Works2's: also on the backend i can move the KungFu SRC an that'd mean Backend returns direct SRC Value!:)
    console.log("getImage DATA.imageSrc:::", data.imageSrc);
    setDataImg(data.imageSrc); //works when i use Buffer on the backend & kungfu `data:image/jpeg;base64,${base64img}`
  };

  //
  // const imgRef = useRef(null);
  // const handleDownload = (e: any) => {
  //   // e.preventDefault(); // don't call this disallows right clicks
  //   //
  //   console.log("imgRef.current:", imgRef.current);
  //   // console.log("imgRef.current.download:", imgRef.current.download);
  //   // imgRef.current.download = "mercedes_hardcoded-name"; //danger: no .jpg
  //   //
  //   // const link = document.createElement("a");
  //   // link.href = imgRef.current !== null && imgRef.current.src;
  //   // link.download = "mercedes_hardcoded-name.png"; // Specify the desired filename
  //   // // link.click();
  // };
  return (
    <>
      <button onClick={getImage}>GET IMAGE</button>
      <img
        alt="image test"
        // src={`data:image/jpeg;base64,${dataImg}`} // ONLY when Buffer.from...toString("Base64") is Sent
        src={dataImg} // Only when the `data:image/jpeg;base64,${base64Image}` is added on top of the Buffer.from().
        //
        // onContextMenu={handleDownload}
        //
        // ref={imgRef}
        //
      />
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
