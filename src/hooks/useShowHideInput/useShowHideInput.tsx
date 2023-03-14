import { SetStateAction, useState } from "react";
import HideButtonSvg from "../../utilities/icons-setup/hideInputButtonIconSVG";
import ShowButtonSVG from "../../utilities/icons-setup/showInputButtonIconSVG";

const useShowHideInput = () => {
  interface localState {
    inputTypeProp: string;
    btnClassName: string;
    btnTextSVG?: any; //optional
    btnStyleProp: {
      borderRadius: string;
    };
  }

  const [showHideState, setShowHideStateLocally] = useState<localState>({
    btnClassName: "bg-light btn-outline-danger mb-4 ps-1 pe-1",
    inputTypeProp: "password",
    btnTextSVG: <ShowButtonSVG />,
    btnStyleProp: {
      borderRadius: "0px 10px",
    },
  });

  const setShowHideState = () => {
    setShowHideStateLocally({
      btnClassName:
        showHideState.btnClassName ===
        "bg-light btn-outline-danger mb-4 ps-1 pe-1"
          ? "bg-light btn-outline-primary mb-4 ps-1 pe-1"
          : "bg-light btn-outline-danger mb-4 ps-1 pe-1",
      inputTypeProp:
        showHideState.inputTypeProp === "password" ? "text" : "password",
      btnTextSVG:
        showHideState.inputTypeProp === "password" ? (
          <HideButtonSvg />
        ) : (
          <ShowButtonSVG />
        ),
      btnStyleProp: {
        //here if I used prevState, I would've: {...prevState.btnStyleProp, borderRadius:...}
        borderRadius:
          showHideState.btnStyleProp.borderRadius === "0px 10px"
            ? "10px 0px"
            : "0px 10px",
      },
    });
  };

  return { showHideState, setShowHideState };
};

export default useShowHideInput;
