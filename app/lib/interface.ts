import { PortableTextBlock } from "@sanity/types";

export interface simpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: object
}

export interface fullBlog {
  currentSlug: string;
  title: string;
  content: Array<PortableTextBlock>;
  titleImage: object
}

export interface Comment {
  _id: string;
  username: string;
  text: string;
}


