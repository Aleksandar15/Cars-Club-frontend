import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";
import useShowHideInput from "../../hooks/useShowHideInput/useShowHideInput";
import { authorize } from "../../redux/slices/verifySlice";
import { axiosAcceptJSON } from "../../utilities/API/axios";
import ModalText from "../../components/Modals/ModalText";
import {
  openModalAction,
  selectorOpenModalText,
} from "../../redux/slices/openModalTextSlice";

interface LoginFields {
  email: string;
  password: string;
  loginForever: boolean;
}

type LoginData = {
  isSuccessful?: boolean;
  message?: string;
  accessToken?: string;
};

const Login = () => {
  const navigatePage = useMyNavigate();

  const dispatch = useDispatchTyped();

  const [loginFields, setLoginFields] = useState<LoginFields>({
    email: "",
    password: "",
    loginForever: false,
  });

  const { isModalOpen } = useSelectorTyped(selectorOpenModalText);

  // If it were onClick event, then:MouseEvent<HTMLButtonElement>
  const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data: LoginData = await axiosAcceptJSON(
        "POST",
        "/api/v1/auth/login",
        JSON.stringify(loginFields)
      );

      const accessToken = data?.accessToken;

      if (typeof accessToken === "string") {
        navigatePage("/");
        dispatch(authorize({ userStatus: { isUserAuthorized: true } }));
      }

      if (data?.isSuccessful === false) {
        switch (data?.message) {
          case "Invalid Email":
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Invalid e-mail!`,
              })
            );
          case "Wrong email/password combinations":
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Wrong e-mail/password combination!`,
              })
            );
          case "Missing Credentials":
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Fields can't be empty!`,
              })
            );
          case "Server error":
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Login error, please try again later.`,
              })
            );
          case "Detected used refresh token in user's cookies":
            dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Someone has made requests without your permission. 
          If that wasn't you please login again and reset your password!`,
              })
            );
            return setLoginFields({
              email: "",
              password: "",
              loginForever: false,
            });
          default:
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Unexpected error happened, please try again.`,
              })
            );
        }
      }
    } catch (err) {
      return;
    }
  };

  const { showHideState, setShowHideState } = useShowHideInput();

  const handleLoginInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginFields({ ...loginFields, [name]: value });
  };

  const toggleKeepMeLogged = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setLoginFields({ ...loginFields, [name]: checked });
  };

  const loginTestUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log("fired");
      const data: LoginData = (await axiosAcceptJSON(
        "POST",
        "/api/v1/auth/login",
        JSON.stringify({
          email: "test@test.com",
          password: "test",
          loginForever: false,
        })
      )) as LoginData;
      console.log("data", data);

      const accessToken = data?.accessToken;
      if (typeof accessToken === "string") {
        navigatePage("/");
        dispatch(authorize({ userStatus: { isUserAuthorized: true } }));
      }

      if (data?.isSuccessful === false) {
        switch (data?.message) {
          case "Invalid Email":
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Invalid e-mail!`,
              })
            );
          case "Wrong email/password combinations":
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Wrong e-mail/password combination!`,
              })
            );
          case "Missing Credentials":
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Fields can't be empty!`,
              })
            );
          case "Server error":
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Login error, please try again later.`,
              })
            );
          case "Detected used refresh token in user's cookies":
            dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Someone has made requests without your permission. 
          If that wasn't you please login again and reset your password!`,
              })
            );
            return setLoginFields({
              email: "",
              password: "",
              loginForever: false,
            });
          default:
            return dispatch(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Unexpected error happened, please try again.`,
              })
            );
        }
      }
    } catch (err) {
      return;
    }
  };

  return (
    <>
      <ModalText />
      <h1 className="text-info text-center mb-5">LOGIN</h1>
      <div className="d-flex flex-column align-items-center ">
        <Form
          onSubmit={loginSubmit}
          className="pb-4 mb-4 d-flex flex-column w-25 align-items-center form-login "
        >
          <Form.Label id="email" className="text-primary mb-0 ">
            E-mail:
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            name="email"
            id="email"
            aria-describedby="email"
            onChange={handleLoginInputChanges}
            value={loginFields.email}
            className="mb-2"
            autoComplete="on"
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
              onChange={handleLoginInputChanges}
              value={loginFields.password}
              className="mb-4"
              // autoComplete="off" // default
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
            variant=" btn bg-light btn-outline-info text-info mb-2 fw-bold  "
            type="button"
            onClick={loginTestUser}
          >
            LOGIN AS A TEST USER
          </Button>
          <Button
            variant=" btn bg-light btn-outline-info text-info mb-2  "
            type="submit"
          >
            LOGIN
          </Button>

          <div style={{ display: "flex" }}>
            <Form.Check
              type="checkbox"
              id="keepMeLogged"
              onChange={toggleKeepMeLogged}
              name="loginForever"
              checked={loginFields.loginForever}
              style={{ marginRight: "8px" }}
            />
            <Form.Label
              htmlFor="keepMeLogged"
              className="text-danger ml-1 font-weight-bold"
              style={{ userSelect: "none" }} // makes it unselectable
            >
              Keep me logged until I logout
            </Form.Label>
          </div>

          <div className="mt-5 ms-1 mb- d-flex  align-items-center justify-content-space-between">
            <p className="text-danger pt-2 me-3">Don't have an account?</p>
            <Button
              variant="btn bg-light btn-outline-success pb-1 mb-1  text-success btn-sm "
              type="button"
              onClick={() => navigatePage("/register")}
            >
              REGISTER
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
