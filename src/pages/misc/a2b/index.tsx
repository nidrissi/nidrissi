import React from "react";
import { Provider } from "react-redux";

import Layout from "../../../components/Layout";
import store from "../../../a2b/store";
import App from "../../../a2b/App";

export default function A2B() {
  return (
    <Layout title="arXiv2BibLaTeX" description="Convert an arXiv entry to a BibLaTeX entry.">
      <Provider store={store}>
        <App />
      </Provider>
    </Layout>
  );
}
