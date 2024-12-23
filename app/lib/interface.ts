export interface simpleBlogCard{
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: string
}

export interface fullBlog{
    currentSlug: string;
    title: string;
    content: Array<object>;
    titleImage: string
}