import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import GTMHead from 'src/commons/google-tag-manager/gtm-head';
import GTMBody from 'src/commons/google-tag-manager/gtm-body';
import InlineFonts from 'src/commons/inline-fonts';

class NextDocument extends Document {
  render() {
    const { __NEXT_DATA__, context } = this.props;
    return (
      <Html lang="tr">
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <link rel="shortcut icon" type="image/png" href="/static/favicon/favicon.ico" />
          <InlineFonts />
          <GTMHead />
          <meta name="referrer" content="no-referrer-when-downgrade" />
        </Head>
        <body className="custom_class">
          <GTMBody />
          <div>
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

NextDocument.getInitialProps = (ctx) => {
  const page = ctx.renderPage((Component) => {
    const WrappedComponent = ({ pageContext, ...props }) => {
      return <Component {...props} />;
    };

    return WrappedComponent;
  });

  return {
    ...page,
    context: ctx,
  };
};

export default NextDocument;
