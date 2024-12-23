
"use client";

import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React, { useState, useEffect } from "react";

async function getData(slug: string) {
  const query = `
     *[_type == "blog" && slug.current == '${slug}']{
   "currentSlug": slug.current,
  title,
  content,
  titleImage
}[0]`;

  const data = await client.fetch(query);
  return data;
}

interface Comment {
  username: string;
  text: string;
}

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<fullBlog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");

  // Fetch the blog data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(params.slug);
      setData(result);
    };
    fetchData();
  }, [params.slug]);

  // Fetch comments from localStorage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments-${params.slug}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [params.slug]);

  const handleAddComment = () => {
    if (newComment.trim() && username.trim()) {
      const newCommentObj = { username, text: newComment };
      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);
      localStorage.setItem(`comments-${params.slug}`, JSON.stringify(updatedComments));
      setNewComment("");
    }
  };

  const handleDeleteComment = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(`comments-${params.slug}`, JSON.stringify(updatedComments));
  };

  if (!data) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Latest - Blogs
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
        <PortableText value={data.content} />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold">Comments:</h2>
        <ul className="pl-5">
          {comments.map((comment, index) => (
            <li key={index} className="mb-4 flex items-start">
              <div className="flex-1">
                <p className="font-bold">{comment.username}</p>
                <p>{comment.text}</p>
              </div>
              {comment.username === username && (
                <button
                  className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteComment(index)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter your username"
            className="border rounded w-full p-2 mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <textarea
            placeholder="Add your comment"
            className="border rounded w-full p-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}
