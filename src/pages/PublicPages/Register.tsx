import { FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";
import useShowHideInput from "../../hooks/useShowHideInput/useShowHideInput";
const Register = () => {
  const navigatePage = useMyNavigate();
  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { showHideState, setShowHideState } = useShowHideInput();
  return (
    <>
      <h1 className="text-info text-center  mb-5 ">REGISTER</h1>
      <div className="d-flex flex-column align-items-center ">
        <Form
          onSubmit={loginSubmit}
          className="pb-4 mb-4 d-flex flex-column w-25 align-items-center form-login "
        >
          <Form.Label id="username" className="text-primary mb-0 ">
            Username:
          </Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            name="username"
            id="username"
            aria-describedby="username"
            // onChange={}
            // value={}
            className="mb-2"
            autoComplete="off"
          />
          <Form.Label id="email" className="text-primary mb-0 ">
            E-mail:
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            name="email"
            id="email"
            aria-describedby="email"
            // onChange={}
            // value={}
            className="mb-2"
            autoComplete="off"
          />
          <Form.Label id="password" className="text-primary mb-0 ">
            Password:
          </Form.Label>
          <div className="input-group">
            <Form.Control
              type={showHideState.inputTypeProp}
              placeholder="Password"
              name="password"
              id="password"
              aria-describedby="password"
              // onChange={}
              // value={}
              className="mb-4"
            />
            <Button
              type="button"
              className={showHideState.btnClassName}
              style={showHideState.btnStyleProp}
              onClick={() => setShowHideState()}
            >
              {showHideState.btnTextSVG}
            </Button>
          </div>
          <Button
            variant=" btn bg-light btn-outline-info text-info  "
            type="submit"
          >
            REGISTER
          </Button>
          <div className="mt-5 ms-1 mb- d-flex  align-items-center justify-content-space-between">
            <p className="text-danger pt-2 me-3">Already have an account?</p>
            <Button
              variant="btn bg-light btn-outline-success pb-1 mb-1  text-success btn-sm "
              type="button"
              onClick={() => navigatePage("/login")}
            >
              LOGIN
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default Register;
