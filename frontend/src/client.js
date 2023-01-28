import sanityClient from "@sanity/client";
import imageUrlBilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_ID,
  dataset: "production",
  apiVersion: "2022-12-11",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_API_TOKEN,
});

const builder = imageUrlBilder(client);

export const urlFor = (source) => builder.image(source);
