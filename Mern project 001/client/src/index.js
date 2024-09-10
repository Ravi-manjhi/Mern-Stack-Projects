import ReactDom from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./reducer/store/store";
import PostContextProvider from "./context/postContext";
import AuthContextProvider from "./context/authContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PostContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </PostContextProvider>
    </Provider>
  </BrowserRouter>
);
