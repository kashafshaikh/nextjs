import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client setup
export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "zatwz31j",
  useCdn: false,
});

// Image URL builder
const builder = imageUrlBuilder(client);

// urlFor function with proper type for source
export function urlFor(source: object) {
  return builder.image(source);
}

