import axios from "axios";
import { useState } from "react";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { openModalTextAction } from "../../redux/slices/openModalTextSlice";
import {
  selectorUserInfo,
  userInfoAction,
} from "../../redux/slices/userInfoSlice";
import {
  authorize,
  selectVerifyUser,
  unauthorized,
} from "../../redux/slices/verifySlice";
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
                user_email: dataTyped?.user_email,
                user_name: dataTyped?.user_name,
                user_id: dataTyped?.user_id,
                user_role: dataTyped?.user_role,
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
            // Update7: still failing even after 10s
            // it took 2x requests by 28s (shown in Network tab)
            // and 10s additionally on the last (my own) re-call
            // so in total around 1:10 minutes. BAD.
            // Alternative approach I took: running cron jobs
            // https://console.cron-job.org
            // There's free quota that can run every 1mins
            // I selected my backend to run ~14mins as to not fall
            // asleep:
            // https://cars-clubs-backend.onrender.com
            // Get's pinged (no response is needed; there's Monitor
            // showing it returned 404 Not Found bcuz `/` Route
            // Handler doesn't exist) and that way it keeps up the
            // server awake, aside from that 60/14 has decimals
            // so selected minutes like: EVERY: 04,14,28,42,56mins.
            // NOTE: I will keep the setTimeout in case my
            // cron job goes down. -> since that doesn't cause issue
            // since it ONLY runs on status code 500 (server down;
            // unless I have deployed some bugs:)).

            // Update6: it doesn't work still takes up to 2mins
            // it took 1:30 minute after I hard refreshed 10 times
            // CTRL+SHIFT+R
            // I did try refreshing manually after 30s (receiving 500)
            // and 10 more times ever after, but STILL it took ~2mins
            // I'll go back to setTimeout and have it 10s delay.
            // OTHERWISE I must switch to some paid plans or Fly.io
            // server left 1/3 but keep Database on Render.com

            // // Updated5: re-calling verifyRefreshToken() is not enough
            // // status 500 logs, then another 500 arrives; randomly
            // // 2, 3 or 6 calls -> usually with 5s delay it's 'reduced'
            // // to 2 calls but still it seems like Render has sleeping
            // // time (5s+ but 10s? 8s?) after the 30s waking-up time
            // // instead let's use reloads:
            // // window.location.reload(false);
            // // // ^Error: Expected 0 arguments, but got 1.ts
            // // Luckily 'false' is the default so article below was wrong?
            // window.location.reload();
            // // Note: I've also removed the setTimeout and its self-call
            // // to verifyRefreshToken();

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
              // }, 5000);
            }, 10000);
          }

          if (
            errDataTyped?.isSuccessful === false ||
            // hotfix2.0: if server isn't reachable that's a Network Error:
            errDataTyped === undefined
          ) {
            // return // should not 'return', else openModal isn't triggered
            dispatchTyped(
              unauthorized({
                userStatus: {
                  isUserAuthorized: false,
                  codeStatus: err?.response?.status,
                },
              })
            );

            // hotfix2: HEADS-UP: err.message === 'Network Error' is true, but I
            // won't send a separate dispatch call to open Modal with the correct msg
            // of the error as to prevent possible hackers of knowing the exact issue
            // console.log("Initial useVerifyRefreshTK 'err':", err);
            // console.log("useVerifyRefresh errDataTyped",errDataTyped); //undefined
            // console.log("routeBelongsTo:", routeBelongsTo); // it's 'private'

            if (routeBelongsTo === "private") {
              dispatchTyped(
                openModalTextAction({
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
              // process to start & mid-execution runs openModalTextAction.
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
