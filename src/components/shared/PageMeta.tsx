import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE = 'https://www.manankumar.in';

// Per-route title, description and the ONLY canonical for that route
// (index.html deliberately has no canonical / og:url, so routes never share one).
export const PageMeta: React.FC<{ title: string; description: string; path: string }> = ({ title, description, path }) => {
  const url = `${SITE}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
