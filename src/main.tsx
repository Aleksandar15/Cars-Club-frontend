import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import rootReducer from "./redux/reducer/rootReducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
