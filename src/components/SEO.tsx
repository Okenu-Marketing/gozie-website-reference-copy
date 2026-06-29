import { Helmet } from "react-helmet-async";

const SITE_URL = "https://gozieokenu.com";
const DEFAULT_IMAGE = "https://gozieokenu.com/images/gozie-photo.jpg";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, any>;
  geoTags?: boolean;
}

const SEO = ({ title, description, path, image = DEFAULT_IMAGE, type = "website", jsonLd, geoTags }: SEOProps) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo Tags */}
      {geoTags && <meta name="geo.region" content="US-TX" />}
      {geoTags && <meta name="geo.placename" content="Austin, Texas" />}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
