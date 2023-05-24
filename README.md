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
    - After 7 trials with `setTimeout` and without and also with `window.location.reload()` they ALL still kept failing even on the last most-closest/almost-best solution: delay of 10s & results:
      it took 2x requests to `/api/v1/auth/verifyrefreshtoken` by 28s (shown in Network tab)
      and 10s additionally on the 3rd and last (my own) re-call HTTP Request to `/verifyrefreshtoken`
      so in total around 1:10 minutes. BAD. - Alternative approach I took: running cron jobs
      https://console.cron-job.org
      There's free quota's (pretty much is a free service; OpenSource as well) that can run every 1mins
      I selected my backend to run ~14mins (you can't mathemtically select exactly 14mins) as to not fall
      asleep (15mins):
      https://cars-clubs-backend.onrender.com
      Gets pinged (no response is needed; even though there's Monitor
      showing it returned 404 Not Found -> it's all **_great_** because `/` Route
      Handler doesn't exist) and that way it keeps up the
      server awake is pinging the server at any route. Aside from that, setting up the time-between-calls: math of 60/14 (4.28 meaning: I _MUST_ call every **at least 5 times** and at least below 14mins time-in-between) has decimals results
      so I selected the minutes per-call like EVERY: 04,14,28,42,56mins.
      NOTE: I will keep the `setTimeout` in case my
      cron job goes down (it's Open Source after all bugs can happen for them). -> since that doesn't cause any app specific issues
      since it ONLY runs on status code 500 (server down ONLY;
      unless I have deployed some bugs:)).
3.  I thought UI/UX would be much better if I had "Posted by" username in the `Marketplace` component, but my logic was not implemented in the JWT token: and instead I had modified on the backend both `loginController` and `verifyRefreshTokenController` to incldue `user_name` in the response & for the `verifyRefreshTokenController` I must query to my Database instead of including private info like `user_email`/`user_name` in the JWT Token. Then on the Frontend also use Redux Toolkit when `useVerifyRefreshToken` is successful & has received that `user_name`, `user_role`, `user_email`, `user_id` -> For Posts UPDATE & DELETE Buttons to be rendered conditionally based on `post.user_id === user_id`.
4.  IMPORTANT FACT is that the console response of 403 (Forbidden) is an "OKAY" response **if** there's updated data on the screen it means the Axios Interceptor did its job well & the 403 status means the `authorizeJWT` did a good job at protecting the Source & if the data is displayed on the Frontend then `refreshTokenController` did successfully refreshed the accessToken by using User's "session"/'refreshToken' TOKEN & delivering a fresh NEW short-lived "accessToken" (_as well as new 'refreshToken'_). :)
5.  VERY IMPORTANT decision & plans I've made for NOT using Async Thunk with /editpost & /createpost ALIKE, in my setup = accessToken iS to be refreshed & used ONLY once, because it is shortly-lived so I MUST use `useAxiosInterceptor` Hook call which is IMPOSSIBLE inside Redux Files. YES I do can have "editPost" & "createPost" separate Async Thunks in a single REDUX file, but it's #1 NOT that useful
    since there's no reusability usage; and #2 the MOST important **_issue_**
    is the fact that I'll have to make sure I "just" call
    `useAxiosInterceptor`() WITHOUT using its returned Axios (_if I don't need to_) in the
    Component where I'd be calling(/dispatching) that AsyncThunk & all the while using the SAME
    intercepted Axios in the Async Thunk Redux file **BUT** imported from Axios.ts (the **EXACT** 'reference Axios instance object' that's being intercepted in my `useAxiosInterceptor` custom Hook) just to make sure
    my POST/PUT Requests won't fail by using a non-intercepted Axios instance. A lot of workaround indeed. Overall forgetting to call `useAxiosInterceptor` would lead to Async Thunk failing on me and causing bugs to my App.

    - And I also wouldn't be able to call a DISPATCH function in my Redux file to fill my `ModalPost.tsx` input fields with the VALUES matching the `post_id` that the user has clicked on, because `useDispatch` is a Hook that also **can NOT** be called inside Redux files.
    - **UPDATE on the issue**: the bug happened. I was cleaning up my `ModalPost.tsx` (because I'm splitting my component into parts) & then all of a sudden I couldn't retrieve data in my `/Marketplace` because I incidently removed my `useAxiosInterceptor()` from my `ModalPost` and my `/refreshtoken` endpoint wasn't being hit because the `axiosCredentials` instance inside of my `getAllPosts` Async Thunk wasn't intercepting the 403 Request so it ended up with 401 Requests and 0 Data being displayed on the screen: I've jumped to check my PostgreSQL database and the Data was there then I reminded myself of the issue and re-added the code `useAxiosInterceptor` call inside `ModalPost`.
      - I'm thinking to avoid such future issues I may just call my `useAxiosInterceptor()` in the top upmost level of component - that's my `App.tsx` however I won't do it for now since I need to test Performance for such a modification. So the possible issues in the future exists if Response is not being intercepted in my future Async Thunks then I must just call `useAxiosInterceptor()` **AT LEAST** in the component where I'm calling that given Async Thunk, otherwise once I'm finished with Performance testing and if it turns out there's no Performance hits by calling `useAxiosInterceptor()` inside `App.tsx` then I'll just do that once and that would **also mean** that I **won't** need to ever again call `useAxiosInterceptor()` but instead directly import the intercepted `axiosCredentials` Axios object from my `axios.ts` file and use it across any component.

6.  My personal challenge on the Frontend's React part was to _ALWAYS_ use Redux Toolkit & never passing a props to Children Components, however the `Post.tsx` had a perfect spot for my `Post_Action_Buttons` child component to receive 2 props: `post.user_id` and `post.post_id` since those "EDIT" and "DELETE" buttons will be the "deepest children" -> 1 level deep, I thought it was very fine to pass those values as props since a button can never go any deeper than that. Even if I had anything else in my mind for the future: I do have those 2 props that I can further pass them by Redux Toolkit to the Children's of `Post_Action_Buttons` component.
7.  Update on `openModalPostSlice` -> I have created this new action that will be used
    ONLY to toggle ModalPost to open/close; I've been thinking
    to separate those states as "ModalPostData" and keep this
    one with a single 'isModalPostOpen' state, but I decided
    not to, because I'm filtering this state out of my FormData
    but I don't have to do it because sending my isModalPostOpen
    state data to the backend doesn't do any harm.
    -> Hence I can even use it for an evidence in Express: if
    req.body.isModalPostOpen is missing, that could be a hacker
    trying to modify a Post data on behalf of the victimized
    user, but I won't do it for now because it requires testing.
8.  `ModalPostSuccessText` logic for now is that
    setShowModalFN ALWAYS calls getAllPosts() Async Thunk,
    in the future for reusability I can use my new state in my
    updated slice `modalPostSuccessTextSlice`:'`typeOfResponse`' state
    to conditionally render different BUTTONS & its `onClick`'s.
    (As well as pagination future plans will requires new Thunk.)
    Example:
    - Failed response will move the User back to `ModalPost` (re-open)
      with its field input states values UNCHANGED
      VS a successful response will trigger Async Thunk to trigger
      a re-render of my `MarketPlace.tsx` & **_also_** resets `ModalPost`\`s input fields state values after that successful response.
9.  IMPORTANT styling reminder: read comments at `ModalDeletePost` but mostly in `ModalPostSuccessText` and `App.css` (CTRL+F): "margin: auto" is where my fix for mobile sizes UI/UX perfection came in! Additionally on the buttons I've added "width: 150px" instead of the, now useless, "maxWidth: 150px" because a combo of `margin:auto` and `width:150px` works better -> but I do **can** exchange `width` for `minWidth:150px` which works the same & logic-wise it feels as same as `width:150px`.
    - And also read CTRL+F ".clickOKbutton" in `App.css` my testing and clarification that the above statement is the real working best solution.
    - As for my ".spanModalClickOutside" I no longer even need `position: relative` since this best of the best fixes: `margin: auto` did centralize it as well.
      - And **all** I'm doing for the wrappers of `<span>` and a button or multiple buttons like in my `ModalDeletePost.tsx` is I'm using a `<div>` wrapper with a styling of `display: grid` and all works perfectly. -> On top of it all I can have the buttons in an `display: flex` div and that very same div inside a parent div and the span tag inside, with the parent div's style of `dispaly: grid` if I wanted the Buttons to be on a same line (horizontal line) while the span to be below them centralized (haven't tested yet such a case, but that seems to be a working scenario).
10. More styling reminders: `whiteSpace: "pre-line"` makes my string litterals new lines be displayed as new lines unlike `whiteSpace: "pre-wrap"` takes things too litteral and displays the same exact number of empty space in between texts (mostly used inside of my Modal's texts).
    - I also fixed the kind of bug that ChatGPT themselves have it: if text is inputted inside of Post's title or Description without the User breaking lines: then it'll ruin the UI/UX and a horizontal scroll at the bottom appears where the text would go as far to the right as the text there is, instead a CSS / styling fix is: `wordBreak: "break-word"` as inside my `Post.tsx`.
11. A bunch of TypeScript issues & TypeScript fixes notes at Components: `ModalPost_Create_or_Edit_Button.tsx`, `openModalPostSlice.ts`, `verifySlice.tsx` ( I haven't yet modified it's fiel extension to .ts from .tsx because it's one of my very first slices and used across my whole App so I don't want a breaking changes for now).
    - I see some workarounds on selectors state (**_by slice Redux files_**) I had in `modalDeletePostSlice.ts` and `openModalTextSlice.tsx` (should be `.ts` as well).
    - Also works for `formSearchCarsSlice.ts`.
      - However as a side-note I must always make sure to exprot the Types in cases where I tried to import the from Slices directly but I've forgotten to `export` them first.
    - Update#3: oh well I had such an _SPECIFIC_-STATE export of Redux State inside of my `getAllPosts` Async Thunk & Slice combinations; & I will also use that such same exporting logic in my new `getSortedPosts.ts`. -> BY THAT I **FIGURED A MISTAKE I WAS DOING** is that I had imported the InitialState TYPES of the slices instead of creating a separate Types for the received States, so my fixed at this same #11 point about 'A bunch of TypeScript issues' was an easyfix: create a separate Types files for each of the components INSTEAD of importing them from the Slice's InitialState's Types.
12. Very important decisions about my `FormSearchCars.tsx` Component:
    New logic: I must have to send a different state of the
    finalized searchCarsFieldsState.carNameInputField STATE
    to the Post.tsx for sending GET Sort methods
    as to avoid useEffect's dependency WARNINGS by the fact
    that I'll be sending it as PARAMS to the soon to be made
    SORT GETallPosts Controller
    ^-> AGAIN:
    That'd be a workaround:
    a '`triggerSearchBarReFetch`' REDUX STATE can be the
    "`searchCarsFieldsState.carNameInputField`" REDUX STATE
    so that if it never changed: it won't re-trigger a Fetch
    call.
    \*A FLAG would have been triggerring re-fetch because my plan was to
    switch `!flag` the opposite boolean on `handleSearchFN` clicks.
    I feel like I've wasted a Redux Slice in here unless I
    plan to split my `FormSearchCars.tsx` even more into multiple children Components.
    INSTEAD THE NEW PLAN ACTION:
    `handleSearchFN` will dispatch a Redux Action to change
    fields by name from "" (empty strings) to let's say
    MERCEDES -> thus I wouldn't need a flag -> because a
    flag is even worse solution: it will re-fetch EVEN IF
    the same input is written WHILE a Redux State change
    if it's the same then the `handleSearchFN` clicks won't
    re-call the `useEffect` inside `Post.tsx` & Thus no re-fetch would be ever called if input hasn't changed (or any other value in the future updates that won't change===no re-fetch===by no re-calling of the `useEffect` inside `Post.tsx`). I consider that to be a very smart move or at least a much smarter move than my initial plan.

    AGAIN: My final goal is to both have a pagination & button clicks on numbers at the bottom as re-fetching BUT also on Searching a Car to keep the same SORTING & page: ... Thinking about it now I may need to reset the LIMITS and OFFSET on my backend server: because the logic is not gonna go as planned if I keep the same logic for Search Button it would be looking ugly UI/UX wise as if there's no Posts if the user was let's say at the last page at the time of clicking `handleSearchFN`: perhaps & **most likely** the search field "Mercedes": won't mean there's 100% **only** Mercedeses so I must reset the page back to Page 1. That turned out more complex than I thought.
    UPDATE#3: I better just use a `createAsyncThunk` that will be an Async Thunk of "GET SORTED POSTS" functionality so I can just as easily re-fetch it with `LIMIT` and `OFFSET` params provided by the `handleSearchFN` and on top of it all I may just put a condition inside of there to keep check if the fields has changed & maybe use `useRef` hook for it? -> AND Also don't forget to add `sessionStorage` in here as well (as `localStorage` is bad UX since it will be keeping the same search fields ALWAYS instead of **only** on a single tab opened & perisists **ONLY** on refreshing the page).

13. Very nice UX improvements inside of my `ModalPost.tsx`: since it shares 2 buttons: 'EDIT A POST' and 'CREATE A POST' however those are 2 different logic: and for the 'CREATE A POST' I wanna retain the values inside the input fields but for the 'EDIT A POST' I don't want to because if a User decides to cancel the Edit and Opens 'CREATE A POST' then the input field values she/he will see is those of the Post she/he tried to edit but canceled: meaning User clicked on a given Post but canceled its modifications and thus clicking on 'CREATE A POST' there was those values being retained. So, for an update, I instead, inside of my `ModalPost.tsx` use `useSelectorTyped` hook to grab the state `modalPostButtonValue` which has 2 values of either a 'EDIT A POST' or 'CREATE A POST' and thus I'm conditionally either resetting the fields for the 'EDIT A POST' (since 'EDIT A POST' anyways triggers a GET requests and fields values are filled by that GET Response) or not resetting fields: if the state is 'CREATE A POST' -> so that when a User cancels and opens back up the fields remains the same.
    - However I'm thinking for future updates I might have to include a button of `'RESET FIELDS'` inside my `ModalPost` just like I did in my Password Manager App.
    - NOTE that for successful action, meaning the User decided to click 'CREATE' or 'EDIT' button then the `ModalPost` are _always_ reset to empty field values so they are fine, no need to touch them.
14. I have not added IMAGE Size limits just for easier testing. In a real App I would at least limit the size and even possibly provide a link to my Users of a free service to resize their images or add my own functionality that will resize theirs images either on the Frontend Notice or without their Notice I'd resize them on the backend and store them on the server or database & then frontend will retrieve the resized pictures.
15. Inside `Post.tsx` on the Frontend I've added a check against `posts` state of expected array to check against `undefined`: because of don't-trust-the-backend/server AND don't-trust-the-frontend/client RELATIONSHIP in programming.
16. Visual BUG inside `PaginationMarketplace`:
    Turns out I MUST also call a setCurrentPage
    of inside `PaginationMarketplace` state should go inside
    a Redux Toolkit state instead of local state.
    because bug happens: correct data but
    number is stuck at '2' or what number it was at the time of
    clicking 'search' AKA this '`handleSearchFN`'.
    - And thinking about it This Visual BUG WILL persist inside
      my `Edit` & `Delete` & even `CREATE Post` functions buttons
      must all reset `PaginationMarketplace`\`s state `currentPage` back to `1`
      once they'll call the `getSortedPosts` with `limit:5`
      and `offset:0` -> re-thinking: except for `Delete` button
      which will ONLY filter the removed data upon 200 Response Successful Response: don't re-fetch but instead filter out the removed Post from the `Posts` state for smoother UX/UI.
17. Reusability issues I figured `offset` and `limit` inside of my `PaginationMarketplace` are used multiple times and if I decide to change the `limit` I must change it across multiple codes -> instead a solution for DRY Principle would be to put this limit in a Redux State: so whatever's initial state I put inside that slice it's however many Posts Per Pages would be shown inside of mine `Post.tsx` Component.
    - -> BUT for `offset` there's no need to do it as they're a functionality in and off itself by some math calculations that I can't memorize and I have to remind myself if I ever want to implement something so good and advanced pagination as my current one is.
    - -> Future plans is let User decide a number to SOrt per Page.
18. The next visual bug is inside of my `ModalPost` custom modal I should remove the `formatNumber` function on the `input` fields because such value can't be editted: UI/UX issues is that while it looks nice if User wanted to edit it inside the Modal then the User **must** remove the whole `price` string and re-write a new one because otherwise it's buggy that I have commas symbols but I also have a function that ignores those commas: I see now a workaround would have been that I may allow them to even write their own commas but then I'd use my RegEx to filter all symbols out once I send it as a response to my server; but that's unnecessary confusing UI/UX for the User and I love the current setup where I limit them to ONLY write numbers and NOTHING beside it gets imputted: however that mini-bug persists because of it! -> So that's why I'm thinking of removing `formatNumber` away from the `ModalPost` `input` `askingPrice` fields & but however I'd keep using it inside my `Post` Component where I'm rendering `askingPrice` as a `p` tag of `Asking Price:` and that looks good UI/UX and in same time would fix the current mini-issue. (still unfixed.)
19. Another future improvement can be a User profile where the User can see their own Posts but that would require yet another and a new `MyProfile` Component.
    - And on top of it all I'd still need to use a same setup or similar kind of `PaginationMarketplace` and a `FormSearchCars` to both be nested inside that new to-be `MyProfile` Component.
20. A UI/UX decision I have to make between 3 CRUD OPERATIONS: `Delete` button is easy: don't re-fetch only filter upon `200` received success response; then `Create` Post is easy as well: re-fetch and move the User to the front Page 1 so that they'll see the newest Post and their own in same time, much like instagram fields. However the `EDIT` Post buttons would of required my previously mentioned issue inside of my `PaginationMarketplace` I **MUST** be using a Redux State of `currentPage` so that I'll keep the User at same Page number, however if I don't re-fetch then the issue is: they won't see their updated Post. I do can use `find` method and modify that particular post and `push` method to `splice` method to bring it back but that's a lot of unnecessary overhead. However it's still complex to maybe re-fetch at the same `OFFSET` and `LIMIT` (limit is easy `postPerPage`) and also I **must** make sure not to forget about the `carNameTitle` state of inside `formSearchSubmitSlice` set up by the `FormSearchCars` component `handleSearchFN` click: so that in a case where the User is updating AKA editting their Post: keep them on a same `OFFSET`: which is most likely gonna come up from `PaginationMarketplace` and also fire a call to `getSortedPosts` Async Thunk with 3rd argument `carNameTitle` being that very same state I mentioned now.
    - Hm, so in such a case `offset` must go inside my `postPerPageSlice` at which point I'd have to rename it for a better convention.
    - But yet again, if `Edit` Post Button would re-fetch and call `window.scrollTo(0, 0);` then such a long code restructuring to my `PaginationMarketplace` moving into Redux Slice would be pointless `Edit`-Post-button-logic-wise; However I reminded myself of the future `MyProfile` component & its reusability that comes with a lil bit of refactoring on my code will be of significant value for my next plans & ideas: the Pagination would be re-implemented with just a copy paste pretty much.
    - Actually I have thought about using `map` method inside of my `getSortedPost` Async Thunk Redux file where I'd be exchanging the texts for the texts that User has written inside the Modal as to avoid Loading my `Post.tsx` however there's this issue that each Post has an image and this image has to be of type Buffer in order for my `convertBufferToImgSRC` function inside `Post` to work and to correctly convert the Buffer into `src` value, because when the file is uploaded it's of type `File` and not `Buffer`.
      - A workaround #1 I see is that I can re-fetch the Data without showing Loading when the `modalPostButtonValue` state value is `'EDIT A POST'`;
      - #2 would be to convert this `File` into `Buffer`. -> **if** User even tries to Edit the Image, otherwise `else if (image==='')` then don't convert anything and keep the image as-is inside the `Posts` state of `getSortedPost` file. -> `FileReader()` in React; the only issue could be if the Multer middleware on the backend does losses some of the `Buffer`'s values then the image Buffer won't match, but that actually doesn't break anything, as on the NEXT re-fetch of `getSortedPost` the `Posts` will get overriden and recenetly-editted-post's `image` value would come from the Backend, the only thing I'm trying to accomplish now is a smooth UI/UX on `'EDIT A POST'` action.
      - #3 is most expensive and ruins all the smoothiness: condition: if the User tries to upload an image: check conditionally: `if (typeof image === File)...` and call my backend API's Multer middleware and receive the Buffer to be used as `image` property inside `getSortedPost` Redux file's state; `else if (image === '')...` then the User isn't tryingto Edit the Post's **image**, but that's quite expensive workaround.
21. (*Decided not to use `sessionStorage`, read on for more info about *my new decision*.*) Next what I can do UI/UX decision: is to retain the User's destination by something like storing the `window.scrollY` value in a `sessionStorage` so whenever User refreshes -> they will be scrolled down to their pre-refresh destination: it would be useful for the `Edit Post` button. ->->->->-> **NEW DECISION MADE**: I decided a different workaround: to modify my `editPostController` on the server to make it return the `EditedPost` no matter _if_ the User has provided a new image or not -> meaning in the `editPostController`: I have modified my SQL to `RETURN _`no matter _the cases_ if the User updated`image`or not -> just so that on the Frontend I now am mutating the`Posts`Array state from the`getSortedPosts`Redux file based on the`edittedPostData.post_id`(meaning I'm only mutating the editted Post element of the`Posts`Array state using`.map`method) by calling the reducer`editSortedPostAction`action function with 1 Argument of this Object received (from calling`/editpost/:post_id/:user_id`) as `data?.edittedPostData`(Object) inside the`editPost`function inside`ModalPost_Create_or_Edit_Button` component.
22. "Editted `getSortedPosts` Redux Slice File: renamed the Async Thunk into `getSortedPostsAsyncThunk` to avoid confusion about auto-import suggesting me the default 'Reducer' (I mean VSCODE auto-suggestions `import` names) -> I could have removed the `export` `default` `getSortedPostsSlice.reducer` statement and to never use such a code again in the future for the next Async Thunk's slices because auto-suggesting (or auto-import) is confusing the VSCode: suggests both the`getSortedPosts` named Async Thunk `export` & also suggests the `export default getSortedPosts.slice`, VSCODE's `import`'s auto-suggestion is uneasy to decide, because VSCode doesn't differentiate `default export` from the normal `export` or named `export` of my `getSortedPosts` Async Thunk. All the while it's fine with normal Slices to be using `export default nameOfTheSlice.reducer` **ONLY** if they are not using nor planning to be using Async Thunks in the future. As a reminder: `export default nameOfTheSlice.reducer` is used for an easy-import inside `rootReducer.ts` by using the ES6 shorthand syntax of same key-value names when importing directly the `.reducer` part of the `nameOfTheSlice` as a workaround that would be: `export const { nameOfTheSliceReducer } = nameOfTheSlice.reducer` (**_Note_**: don't forget to destructure at the same line as `export` because if I mistakenly use `export const nameOfTheSliceReducer...` -> that'd require it to be used as `nameOfTheSliceReducer.nameOfTheSliceReducer` in those files that `import`ed it).
23. `PaginationMarketplace.tsx` may need a `flag` state as well, to add upon all of the `disabled` logic an extra `... || flag` -> so that they can't trigger another call while one is incoming -> but then I would need to use the `getSortedPosts`'s "status states" like the `postsStatus` because I don't have ANY responses inside of my `PaginationMarketplace` and thus I can't have a local state `flag` but instead I must just use a condition: `'loading'`(or `'idle'` or `'failed'`) value of `postsState` state -> then set `flag = true` otherwise if `postsState` = `'succeeded'` -> then set `flag = false` as that will `active` my buttons. -> AGAIN All of this is needed so that slow internet Users won't re-trigger 2 or 3 or more subsequental requests with the same refresh_token at which point the Server will reject the 2nd or 3rd Request and remova ALL `refresh_token`'s Rows matching that `user_id` from the `refresh_tokens` table and logs the User out as a suspicios activity of where a Hacker might be trying to re-use the `refreshToken` cookie; because the backend Code "doesn't know" if the User is legit or a Hacker & on top of it all: my server-side code-wise rules are 1 Request per 1 Refresh Token -> these rules are set by my `refreshTokenController` code.
24. UI/UX-wise for the `PaginationMarketplace` I don't have conditional rendering as if while `getSortedPostsAsyncThunk` is called and a state of `postsState` is `'loading'`: I can show `null` instead of my `Pagination`'s components however that's not a big issue since it's all good for Pagination numbers to remain.

##### Further plans (_reminders for me_)

1. Have an "edit username" & "edit e-mail" features, but that **will** require me to also run SQL Query against my PostgreSQL database `posts` table to run `UPDATE posts SET post_created_by_username=$1 WHERE user_id=$2` & respectively if I've choosen to show e-mail.
   - For `post_created_by_email` I might even implement a conditional checking in `ModalPost.tsx` (& "edits Posts") to make User decide whether to show "contact number" or "contact e-mail" or both. A toggler.
2. Have a comments section which `comments` table that will relate with each `post` Row of the `posts` table and `FOREIGN KEY` "user_id" column to `REFERENCE` `users` table.
3. Have a replies sections: such that `replies` table will have to connect with "comment_id" from `comments` table & the "user_id" from `users` table.
