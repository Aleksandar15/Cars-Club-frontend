import { useState } from "react";
import { Button } from "react-bootstrap";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectVerifyUser } from "../../redux/slices/verifySlice";

const HomePage = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isUserAuthorized } = useSelectorTyped(selectVerifyUser);
  const navigatePage = useMyNavigate();

  return (
    <div>
      <h1 className="text-center text-info mb-5">
        Cars Club's Homepage - WELCOME!
      </h1>

      {isUserAuthorized ? (
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
      ) : (
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
      )}
    </div>
  );
};

export default HomePage;
