function Loading() {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "blue",
          borderRadius: "22px",
          marginTop: "20px",
          fontFamily: "Fantasy, Arial, Helvetica, sans-serif",
          fontSize: "44px",
        }}
      >
        LOADING . . .
      </h1>
      <h6
        style={{
          textAlign: "center",
          color: "#0DCAF0",
          // fontFamily: "Fantasy, Arial, Helvetica, sans-serif",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: "bold",
          marginTop: "20px",
          // textTransform: "uppercase",
          fontSize: "18px",
        }}
      >
        Kindly await my Server deployed on Render to 'wake up' 😊
      </h6>
      <h6
        style={{
          textAlign: "center",
          color: "#1BBF00",
          fontFamily: "Arial, Helvetica, sans-serif",
          marginTop: "22px",
          fontSize: "15px",
          // fontWeight: "bold",
        }}
      >
        (Developer's notice: do not refresh; status 500 will re-call the server
        after 30s)
      </h6>
    </>
  );
}

export default Loading;
