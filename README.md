# CARS CLUB

---

#### NOTE: I'm still working on this fullstack project - it's not yet finished & my main goal is to improve my TypeScript skills.

#### Plans & Features (in non-technical way):

- Login & Register sections.
- Section for cars info & specifications: Catalog.
- Section for posting cars for sales (allowed by all users): Marketplace.
- Posts will be connected to the OP user (original poster) & they can update or delete their post.
- Users not related to a particular post will be able to comment; they will be related to their own comment & be able to update and delete their own comment.

#### Technologies used:

###### Postgres DB, TypeScript, ReactJS with Redux Toolkit, NodeJS with ExpressJS

### Run my frontend project

- Clone this project.
- Navigate (`cd`) into your project directory.
- Run `npm install` in your command line.
- Run `npm run dev` in your command line.
- Visit http://localhost:5173 in your browser.
  - Vite version 4 has changed the PORT from 3000 to 5173.
- For the full functionality connect it with my <a href="https://github.com/Aleksandar15/Cars-Club-backend">backend</a> project.

#### How to's

- If you want to deploy this app on Netlify you should copy the code included in my <a href="https://github.com/Aleksandar15/Cars-Club-frontend/blob/main/netlify.toml">netlify.toml</a> file.

##### Sources

- For most of my SVG icons I've used a PNG version of icons8 and then converted that PNG into SVG using sites like https://www.pngtosvg.com.

##### Extras (_reminders for me_)

1.  On authentication part: I went with the logic to keep the same Redux Toolkit's state from `/login` route navigating into one of the `ProtectedRoutes` and **not** to re-call `/verifyrefreshtoken` endpoint because that speeds up the performance of my App, while logically (my pre-development concerns were that) it may seem like "_oh what about if User's token has expired (or any other form of unauthentication) will that mean User can see their own authenticated data?_" -> and actually no, the way it really works is that indeed User can see "stallen" or _if I use semi-correct term_ "cached" data **only**, because any further trial to access **_new_** data is secured by: #1 `refreshTokenController` on the backend & #2 route handler's specific auth-middleware setup; so let's say a case scenario: where the User may see his/hers 'Post' while switching between `Marketplace`/`Catalog`/`Home` and back to `Marketplace` -> if they try to remove their own 'Post' (or to do _any other (auth-required) action_) it would require a new HTTP Request upon which the previously mentioned conditions must be passed in order to achieve such an action -> and in a case where User's authentication has expired then the HTTP Response would be that of a rejected Request where such cases on the frontend are handled by re-navigating the User back to the `/login` route & optional UI/UX is to alert them using my custom `ModalText`.
2.  Render's sleepig time just wouldn't be kept at 30s and it kept bugging me which turned out better for me: Finding even better alternatives like the Cron Job's I'll describe below:
    -        After 7 trials with setTimeout and without and also with `window.location.reload()` they ALL still kept failing even on the last most-closest/almost-best solution: delay of 10s & results:
             it took 2x requests to `/api/v1/auth/verifyrefreshtoken` by 28s (shown in Network tab)
             and 10s additionally on the 3rd and last (my own) re-call HTTP Request to `/verifyrefreshtoken`
             so in total around 1:10 minutes. BAD.
             - Alternative approach I took: running cron jobs
             https://console.cron-job.org
             There's free quota's (pretty much is a free service; OpenSource as well) that can run every 1mins
             I selected my backend to run ~14mins (you can't mathemtically select exactly 14mins) as to not fall
             asleep (15mins):
             https://cars-clubs-backend.onrender.com
             Gets pinged (no response is needed; even though there's Monitor
             showing it returned 404 Not Found -> it's all ***great*** because `/` Route
             Handler doesn't exist) and that way it keeps up the
             server awake is pinging the server at any route. Aside from that, setting up the time-between-calls: math of 60/14 (4.28 meaning: I *MUST* call every **at least 5 times** and at least below 14mins time-in-between) has decimals results
             so I selected the minutes per-call like EVERY: 04,14,28,42,56mins.
             NOTE: I will keep the `setTimeout` in case my
             cron job goes down (it's Open Source after all bugs can happen for them). -> since that doesn't cause any app specific issues
             since it ONLY runs on status code 500 (server down ONLY;
             unless I have deployed some bugs:)).
