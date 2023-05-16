import axios from "axios";
import { useDispatchTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { openModalAction } from "../../redux/slices/openModalTextSlice";
import { authorize, unauthorized } from "../../redux/slices/verifySlice";
import {
  axiosCredentials,
  axiosCredentialsNonInterceptors,
} from "../../utilities/API/axios";
import {
  ErrorUserAuth,
  SuccessUserAuth,
} from "../../utilities/Types/userAuthTypes";
import {
  IsUserAuthorized,
  RouteBelongsTo,
} from "../../utilities/Types/verifyUserTypes";

const useVerifyRefreshTK = (
  routeBelongsTo: RouteBelongsTo,
  isUserAuthorized: IsUserAuthorized
) => {
  const dispatchTyped = useDispatchTyped();

  // const timestamp = Date.now();

  if (isUserAuthorized === undefined) {
    const verifyRefreshToken = async () => {
      try {
        // GET /verifyrefreshtoken
        const { data } = await axiosCredentialsNonInterceptors.get(
          // `/api/v1/auth/verifyrefreshtoken${timestamp}`,
          `/api/v1/auth/verifyrefreshtoken`
          // {
          //   headers: {
          //     "Cache-Control": "no-cache",
          //   },
          // }

          // NOTE may or may not use these cache headers in the future,
          // I tried to bypass what turned out to be AVG Chrome bugs
          // with their new 'Memory save' feature kept sending me
          // old cookies in the HTTP Requests even when there were
          // 0 cookies OR: even when I'd re-assign it by document.cookie
          // the Express.js logs would show it received an
          // invisible cookie that doesn't exist in the AVG Chrome.
          // & Checking network tab would show 2 refreshToken cookies
          // separated by `;` (DUPLICATES inside the HTTP Request: they
          // were NOT differentiable by anything except their values!
          // ->Also that first (unwanted) refreshToken's value was being
          // sent back as Response Header in Set-Cookie & I tried to even
          // hard-set a different cookie: and result was HTTP Response
          // gets different cookie BUT AVG Chrome keeps re-sending this
          // invisible & unwanted bug-inducing cookie), but the
          // first cookie was stubborn & invisible
          // and was being sent in every HTTP request
          // to the /api/v1/auth/verifyrefreshtoken with or without
          // 'timestamp' and with or without Headers of 'Cache-Control':
          // 'no cache' & also tests: I tried setting it up
          // on a button click
          // same thing happened; however when I moved the controller's
          // logic
          // directly to be inside server.ts -> at a simplier /refreshtk
          // endpoint: it somehow didn't showed that invisible cookie
          // not on Button click nor by this useVerifyRefreshTK (hm?), but
          // I couldn't run that endpoint's logic inside server.ts (which
          // has a lot of codes in it)
          // just to "avoid" this what-seems-to-be-AVG-Chrome-bug.
          // HOWEVER: Chrome never has such an unexpected bugs, so AVG
          // Chrome version was cause of that issue with 100% certainty.
        );

        const dataTyped = data as SuccessUserAuth;
        if (dataTyped?.isSuccessful) {
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

          // Fix for sleeping Render.com taking up 30s to wake up
          console.log(
            "Initial useVerifyRefreshTK err?.response?.status:",
            err?.response?.status
          );
          if (err?.response?.status === 500) {
            // Update4: 1ms wasn't enough, still took 3 x 500 statuses
            // for 4th request to be of 200
            // Let's add 5s delay, if even that doesn't work
            // I'd need to use window.location.reload(false);
            // NOTE about this command: will do a cached refresh
            // instead of (true): will do full refresh, more info here:
            // https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react

            // UPDATE3: ah those sleeping servers... without the timeout
            // sometimes it takes 3, other times 5+ responses with 500
            // before response is received: after 2~3 minutes..
            // it seem like NOT giving it a timeout kind of confuses
            // the slow Render's free tier.
            // Let's try a setTimeout with 1 second delay.

            // Update2: there's seem to be NO need for timeout because
            // by the time status 500 is received: the Server is UP.

            const id = setTimeout(() => {
              //   // It's not infinitive loop because after 30s the server
              //   // has already awoke & there's no more 500 Errors.
              verifyRefreshToken();
              clearTimeout(id);
              // }, 30003);
              // }, 1000);
            }, 5000);
          }

          if (errDataTyped?.isSuccessful === false) {
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
                  isModalOpen: true,
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

    verifyRefreshToken();
  }
};
export default useVerifyRefreshTK;
