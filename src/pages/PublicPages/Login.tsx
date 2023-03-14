import { Button, Form } from "react-bootstrap";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";

const Login = () => {
  const navigatePage = useMyNavigate();

  return (
    <>
      <h1 className="text-info text-center mb-5">LOGIN</h1>
      <div className="d-flex flex-column align-items-center ">
        <Form
          //  onSubmit={}
          className="pb-4 mb-4 d-flex flex-column w-25 align-items-center "
        >
          <Form.Label id="username" className="text-primary mb-0 ">
            Username:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            aria-describedby="username"
            // onChange={}
            // value={}
            className="mb-2"
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
          />
          <Form.Label id="password" className="text-primary mb-0 ">
            Password:
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            aria-describedby="password"
            // onChange={}
            // value={}
            className="mb-4"
          />
          <Button
            variant=" btn bg-light btn-outline-info text-info  "
            type="submit"
          >
            LOGIN
          </Button>
        </Form>
        <div className="mt-1 ms-1 mb-2 d-flex  align-items-center justify-content-space-between">
          <p className="text-danger pt-2 me-3">Already have an account?</p>
          <Button
            variant="btn bg-light btn-outline-success pb-1 mb-1  text-success btn-sm "
            type="button"
            onClick={() => navigatePage("/register")}
          >
            REGISTER
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
