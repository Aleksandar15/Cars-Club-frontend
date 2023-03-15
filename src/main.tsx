import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
// Deprecated createStore
import rootReducer from "./redux/reducer/rootReducer";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
