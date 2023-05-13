import axios from "axios";
import { useEffect, useState } from "react";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import {
  openModalAction,
  selectorOpenModalText,
} from "../../redux/slices/openModalTextSlice";
import {
  authorize,
  selectVerifyUser,
  unauthorized,
} from "../../redux/slices/verifySlice";
import { axiosCredentials } from "../../utilities/API/axios";
import {
  ErrorUserAuth,
  SuccessUserAuth,
} from "../../utilities/Types/userAuthTypes";

const useVerifyRefreshTK = (routeBelongsTo?: "private" | "public") => {
  // const [authUser, setAuthUser] = useState<boolean | undefined>(undefined);
  const { isModalOpen } = useSelectorTyped(selectorOpenModalText);
  const dispatchTyped = useDispatchTyped();

  // Must use this isUserAuthorized Redux state for dependency. In case
  // when user clicks logout I want HomePage to refresh its buttons
  const { isUserAuthorized } = useSelectorTyped(selectVerifyUser);
  console.log("isUserAuthorized useVerifyRefreshTK HOOK:", isUserAuthorized);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // GET /verifyrefreshtoken
        const { data } = await axiosCredentials.get(
          `/api/v1/auth/verifyrefreshtoken`
        );

        const dataTyped = data as SuccessUserAuth;
        if (data?.isSuccessful) {
          // setAuthUser(true);

          // Also on success update the isUserAuthorized state for NavBar
          dispatchTyped(
            authorize({
              userStatus: {
                isUserAuthorized: true,
              },
            })
          );
        }
        // Error is handled in the Catch block
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errDataTyped = err?.response?.data as ErrorUserAuth;
          if (errDataTyped?.isSuccessful === false) {
            // setAuthUser(false);
            dispatchTyped(
              unauthorized({
                userStatus: {
                  isUserAuthorized: false,
                  codeStatus: err?.response?.status,
                },
              })
            );

            if (routeBelongsTo === "private") {
              dispatchTyped(
                openModalAction({
                  isModalOpen: !isModalOpen,
                  text: `Login please!`,
                })
              );
              // UPDATE2: This is half-buggy: tested in 100s tests &
              // results: condition creates a little bit of delay -> a
              // delay (luckily in this case) in a positive form: so it
              // allows mid-React-calculations to be triggering
              // ModalText's rendering inside the Login.tsx Component;
              // otherwise to make this fail IS: to remove the
              // condition OR to make it LESS complex like: `if (true)`
              // or EVEN: `if (routeBelongsTo === "private" || true)`
              // which always evaluates to `true` very quickly,
              // but this below is still complex:
              // `if (routeBelongsTo === "private" && true)` because
              // React needs to calculate both the non-complex `true`
              // && the complex conditions & thus allowing Login
              // process to start & mid-execution runs openModalAction.
              // ALSO: removing IF condition and adding setTimeout tests:
              // not even setTimeout of 0ms or 10ms isn't
              // triggering the ModalText to open, but it needs 100ms!
              // I'm half-sure that this condition:
              // `if (routeBelongsTo === "private")` is that COMPLEX
              // with evaluation time around 100ms!?!
              // However I'll keep the IF condition for security
              // reasons mentioned bellow.
              // Otherwise even if it doesn't (sometimes) run the ModalText
              // was an optional UI/UX feature anyways!:)

              // UPDATE: old notes below stopped working when Logic became
              // more Complex I had to implement 'routeBelongsTo' argument.
              // Bugs were: it (still) works well for ProtectedRoutes,
              // but triggers ModalText unnecessarily for PublicRoutes.

              // IMPORTANT NOTE ~ the reason why <ModalText/> is showing
              // up (ONLY in ProtectedRoutes) is because it is already
              // rendered inside Login.tsx
              // (where I'm navigating at in case: userAuth === false),
              // so I don't need to render it twice inside ProtectedRoutes.
              // NOTE AS WELL ~ for non-protected AKA Public Routes like
              // HomePage.tsx will not trigger the Modal, it's all safe:)
            }
          }
        }
      }
    };

    if (isUserAuthorized === undefined) {
      verifyRefreshToken();
    }
  }, []);

  // return authUser;
  return isUserAuthorized;
};
export default useVerifyRefreshTK;
