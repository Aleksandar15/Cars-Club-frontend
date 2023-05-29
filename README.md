# CARS CLUB

##### ~> My <a href="https://github.com/Aleksandar15/Cars-Club-backend">backend code</a>.

#### Visit my live website here: https://cars-club.netlify.app

##### Test login user:

1. Click the `Login as a test user` button
2. - E-mail: test@test.com
   - Password: test

#### About my Full-Stack Cars Club APP:

Combining my passion for cars, I created this fullstack project with the primary goal of honing my TypeScript skills. I had focused on setting up a reusable and scalable codebase, laying a solid foundation for seamless integration of additional features. With everything working smoothly, my app is now at a stage where I can continually implement my new ideas into future updates.

#### On the frontend

- Users can create a Post with an image, then submit this `multipart/form-data` request with all the input values appended to a `FormData`.
- I'm converting the backend's image value - a _binary data_ - into a `src` value using a function that first converts it to `Uint8Array` instance, then I'm grabbing the `buffer` property value & passing it as an argument to the `Blob`'s constructor (but passing the whole instance works as well). Finally with `URL.createObjectURL` I'm creating a URL from this Blob that is used as the `src` value.

#### On the backend

- I'm using Multer middleware to process the `FormData` received from a `multipart/form-data` request with the storage option `memoryStorage()`, then using `upload.single` instance middleware to populate `req.file` with metadata about the image. My controller _only_ stores the _binary data_ from the `buffer` property into my PostgreSQL as a `BYTEA` column type.
- My `refresh_tokens` and `posts` tables both have a MANY-TO-ONE relationship with my `users` table.

#### Technologies used:

###### TypeScript + ReactJS with Redux Toolkit + NodeJS with ExpressJS and MulterJS + PostgreSQL Database. Vite for faster workflow experience.

<h4 style="text-align: center;">^ UPDATE ^</h4>

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

<h4 style="text-align: center;">NO NEED TO READ BELOW ARE MY REMINDERS 😊</h4>

---

##### Extras & Journals & Plans <a href="https://github.com/Aleksandar15/Cars-Club-frontend-reminders">here</a> (_frontend reminders for me_; no need to go in there - it's the size of a book 😊.)
