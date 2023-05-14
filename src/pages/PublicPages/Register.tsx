import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalText from "../../components/Modals/ModalText";
import useMyNavigate from "../../hooks/useMyNavigate/useMyNavigate";
import useShowHideInput from "../../hooks/useShowHideInput/useShowHideInput";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import {
  openModalAction,
  selectorOpenModalText,
} from "../../redux/slices/openModalTextSlice";
import { axiosDefaultReq } from "../../utilities/API/axios";

type RegisterFields = {
  email: string;
  username: string;
  password: string;
};

type RegisterData = {
  data: {
    isSuccessful?: boolean;
    message?: string;
    user_info?: {
      user_name: string;
      user_email: string;
      user_role: string;
    };
  };
};

const Register = () => {
  const navigatePage = useMyNavigate();
  const dispatchTyped = useDispatchTyped();
  const { isModalOpen } = useSelectorTyped(selectorOpenModalText);

  const registerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // By using custom Axios instance instead of funcitonal instance
      // I'd need to handle errors in the Catch block
      const { data }: RegisterData = await axiosDefaultReq.post(
        "/api/v1/auth/register",
        JSON.stringify(registerFields),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      if (
        data?.isSuccessful &&
        data?.message === "User registered successfully"
      ) {
        // NOTE: string literals won't print the message on a new
        // lines, however I keep using it for visual code cleanup
        // & styling-wise using: "white-space": "pre-line".
        dispatchTyped(
          openModalAction({
            isModalOpen: !isModalOpen,
            text: `Successfully registered!
            Welcome ${data?.user_info?.user_name}!
            You can login now.`,
          })
        );
        return navigatePage("/login");
      }
    } catch (err) {
      // Thus, using the Axios instance I needed to import 'axios'
      // to grab 'isAxiosError' built-in method; as it doesn't exist
      // in the axiosDefaultReq instance I've built.
      if (axios.isAxiosError(err)) {
        // Fix: TSC error 'Object (.response) is possibly 'undefined''
        if (err?.response?.data?.isSuccessful === false) {
          switch (err?.response?.data?.message) {
            case "User already exists":
              return dispatchTyped(
                openModalAction({
                  isModalOpen: !isModalOpen,
                  text: `User is already registered!`,
                })
              );
            case "Invalid Email":
              return dispatchTyped(
                openModalAction({
                  isModalOpen: !isModalOpen,
                  text: `Invalid e-mail!`,
                })
              );
            case "Missing Credentials":
              return dispatchTyped(
                openModalAction({
                  isModalOpen: !isModalOpen,
                  text: `Fields can't be empty!`,
                })
              );
            default:
              return dispatchTyped(
                openModalAction({
                  isModalOpen: !isModalOpen,
                  text: `Unexpected error happened, please try again!`,
                })
              );
          }
        }
      } else {
        console.log("Unexpected Axios error:", err);
        return "An unexpected error happened";
      }
    }
  };

  const [registerFields, setRegisterFields] = useState<RegisterFields>({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterFields({ ...registerFields, [name]: value });
  };

  const { showHideState, setShowHideState } = useShowHideInput();
  return (
    <>
      <ModalText />
      <h1 className="text-info text-center  mb-5 ">REGISTER</h1>
      <div className="d-flex flex-column align-items-center ">
        <Form
          onSubmit={registerSubmit}
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
            onChange={handleInputChanges}
            value={registerFields.username}
            className="mb-2"
            autoComplete="on"
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
            onChange={handleInputChanges}
            value={registerFields.email}
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
              onChange={handleInputChanges}
              value={registerFields.password}
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
