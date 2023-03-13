import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();
  const navigatePage = (route: string) => navigate(route);

  return (
    <div>
      <h1 className="text-center text-info mb-5">Cars Club's Home - ENJOY!</h1>

      {isAuthenticated ? (
        <>
          <h2 className="text-center text-danger text-uppercase pt-3 mb-4 pb-3">
            Join the club
          </h2>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              className="m-3 px-5 "
              variant="success"
              size="lg"
              onClick={() => navigatePage("/login")}
            >
              LOGIN
            </Button>
            <h5 className="text-danger pt-1 mx-1">OR</h5>
            <Button
              size="lg"
              className="m-3 px-5"
              variant="primary"
              onClick={() => navigatePage("/register")}
            >
              REGISTER
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center text-danger text-uppercase pt-3 mb-4 pb-3">
            Visit the club
          </h2>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              className="m-3 px-5 "
              variant="success"
              size="lg"
              onClick={() => navigatePage("/catalog")}
            >
              CATALOG
            </Button>
            {/* <h5 className="text-danger pt-1 mx-1">{"<-|->"}</h5> */}
            {/* <h5 className="text-danger pt-1 mx-1">{"<-->"}</h5> */}
            {/* <h5 className="text-danger pt-1 mx-1">{"<->"}</h5> */}
            <h5 className="text-danger pt-1 mx-1">|</h5>
            <Button
              size="lg"
              className="m-3 px-5"
              variant="primary"
              onClick={() => navigatePage("/marketplace")}
            >
              MARKETPLACE
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
