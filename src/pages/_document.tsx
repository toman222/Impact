import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

// Custom document for halfmoon properties
// Otherwise standard
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="auto-scaling-disabled">
        <Head />
        <body data-set-preferred-theme-onload="true">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
