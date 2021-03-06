import React from "react";
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from "gatsby";
import { defaultOptions } from "./internals";

// TODO: remove for v3
const withPrefix = withAssetPrefix || fallbackWithPrefix;

exports.onRenderBody = ({ setHeadComponents, pathname }, pluginOptions) => {
  const { feeds } = {
    ...defaultOptions,
    ...pluginOptions
  };

  const links = feeds
    .filter(({ match }) => {
      if (typeof match === `string`) return new RegExp(match).exec(pathname);
      return true;
    })
    .map(({ output, title }, i) => {
      if (output.charAt(0) !== `/`) {
        output = `/` + output;
      }

      return (
        <link
          key={`gatsby-plugin-feed-mdx-${i}`}
          rel="alternate"
          type="application/rss+xml"
          title={title}
          href={withPrefix(output)}
        />
      );
    });

  setHeadComponents(links);
};
