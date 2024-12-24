
// "use client";

// import { fullBlog } from "@/app/lib/interface";
// import { client, urlFor } from "@/app/lib/sanity";
// import { PortableText } from "next-sanity";
// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// async function getData(slug: string) {
//   const query = `
//      *[_type == "blog" && slug.current == '${slug}']{
//    "currentSlug": slug.current,
//   title,
//   content,
//   titleImage
// }[0]`;

//   const data = await client.fetch(query);
//   return data;
// }

// interface Comment {
//   username: string;
//   text: string;
// }

// export default function BlogArticle({ params }: { params: { slug: string } }) {
//   const [data, setData] = useState<fullBlog | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState("");
//   const [username, setUsername] = useState("");

//   // Fetch the blog data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await getData(params.slug);
//       setData(result);
//     };
//     fetchData();
//   }, [params.slug]);

//   // Fetch comments from localStorage on component mount
//   useEffect(() => {
//     const storedComments = localStorage.getItem(`comments-${params.slug}`);
//     if (storedComments) {
//       setComments(JSON.parse(storedComments));
//     }
//   }, [params.slug]);

//   const handleAddComment = () => {
//     if (newComment.trim() && username.trim()) {
//       const newCommentObj = { username, text: newComment };
//       const updatedComments = [...comments, newCommentObj];
//       setComments(updatedComments);
//       localStorage.setItem(`comments-${params.slug}`, JSON.stringify(updatedComments));
//       setNewComment("");
//     }
//   };

//   const handleDeleteComment = (index: number) => {
//     const updatedComments = comments.filter((_, i) => i !== index);
//     setComments(updatedComments);
//     localStorage.setItem(`comments-${params.slug}`, JSON.stringify(updatedComments));
//   };

//   if (!data) {
//     return <p>Loading...</p>; // Show a loading message while data is being fetched
//   }

//   return (
//     <div className="mt-8">
//       <h1>
//         <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
//           Latest - Blogs
//         </span>
//         <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
//           {data.title}
//         </span>
//       </h1>

//       <Image
//          src={urlFor(data.titleImage).url()}  
//          width={800}
//          height={800}
//          alt="Title Image"
//          priority
//          className="rounded-lg mt-8 border"
//       />

//       <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
//         <PortableText value={data.content} />
//       </div>

//       <div className="mt-8">
//         <h2 className="text-lg font-bold">Comments:</h2>
//         <ul className="pl-5">
//           {comments.map((comment, index) => (
//             <li key={index} className="mb-4 flex items-start">
//               <div className="flex-1">
//                 <p className="font-bold">{comment.username}</p>
//                 <p>{comment.text}</p>
//               </div>
//               {comment.username === username && (
//                 <button
//                   className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleDeleteComment(index)}
//                 >
//                   Delete
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>

//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Enter your username"
//             className="border rounded w-full p-2 mb-2"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <textarea
//             placeholder="Add your comment"
//             className="border rounded w-full p-2"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           />
//           <button
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={handleAddComment}
//           >
//             Add Comment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import { urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import { createClient } from "next-sanity";
import Image from "next/image";


interface BlogArticleParams {
  slug: string;
}

interface BlogArticleProps {
  params: BlogArticleParams;
}

const client = createClient({
    projectId: "zatwz31j",  // Replace with your Sanity project ID
    dataset: "production",  // or your custom dataset
    useCdn: false, // Disable CDN for write operations
    token: "sk5AcqqBD3YD0y7JceXxKxRJgUm7TBvd6NFUJbcfQgmwS7W10Y1HUpferUfNQoAtdEJ8dHdv4Pp65tX9trcBnKv433oALDDSPRHraMoxUGjJIFaT9P4HBdCtNiLgnUPPbWFCqvohkhwE9A8DSsQvUObttQ3ZJ4vgMQDBymmnwx6QRhX5O9l0", // Replace with your generated API token
  });

// Fetch comments from Sanity
const fetchComments = async (slug: string) => {
  const query = `*[_type == "comment" && blog->slug.current == '${slug}']{
    _id,
    username,
    text,
    blog->{
      title
    }
  }`;
  
  const data = await client.fetch(query);
  return data;
};

// Fetch blog data from Sanity
const getData = async (slug: string) => {
  const query = `*[_type == "blog" && slug.current == '${slug}']{
    _id,
    "currentSlug": slug.current,
    title,
    content,
    titleImage
  }[0]`;

  const data = await client.fetch(query);
  return data;
};

export default function BlogArticle({ params }: BlogArticleProps) {
  const [data, setData] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(params.slug); // Call to getData
        setData(result); // Set blog data in state
        const commentsFromSanity = await fetchComments(params.slug); // Call to fetchComments
        setComments(commentsFromSanity); // Set comments in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, [params.slug]); // Dependency array

  const handleDeleteComment = async (commentId: string) => {
        try {
          await client.delete(commentId);
          setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
          console.error("Error deleting comment:", error);
          alert("There was an error deleting the comment. Please try again.");
        }
      };

  const handleAddComment = async () => {
    if (!newComment || !username) {
      alert("Username and comment text are required.");
      return;
    }

    const newCommentData = {
      _type: "comment",
      username,
      text: newComment,
      blog: { _type: "reference", _ref: data?._id },
    };

    try {
      const createdComment = await client.create(newCommentData);
      setComments((prevComments) => [...prevComments, createdComment]);
      setNewComment("");
      setUsername("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("There was an error adding your comment. Please try again.");
    }
  };

  if (!data) {
    return <p>Loading...</p>;
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

        <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
        <div className="mb-4">           <label htmlFor="username" className="block text-sm font-medium text-gray-700">
             Username
           </label>
        <input
          type="text"
          value={username}
          className="border rounded w-full p-2 mb-2"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        </div>

        <textarea
          value={newComment}
          className="border rounded w-full p-2"
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter your comment"
        />


        <button onClick={handleAddComment} className="my-2 bg-blue-500 text-white px-4 py-2 rounded">Add Comment</button>
      </div>

      <div>
        <h2 className="my-2">Comments:</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-2">
              <strong>{comment.username}:</strong>
              <p>{comment.text}</p>
              <button className="ml-24 mb-4 bg-red-500 text-white px-2 py-1 rounded text-sm" onClick={() => handleDeleteComment(comment._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}























// skHfz5AxWwFhUkNq5cL1LOaf5Vliy637hbaTQWRceszxIBd9K4k4e3PbfDRlzdpfzXAa6LJW1szNmZOYeMe2nyg9N74BcFDkwzs6hHfGx2wjvlmEcrpb0sPaXybPDnzPGCauNqT4OzANH4p8fnew5PwllMSX4qPztx76pXplg9gcK2thpE6I


// yeh editor wala ha
// sk5AcqqBD3YD0y7JceXxKxRJgUm7TBvd6NFUJbcfQgmwS7W10Y1HUpferUfNQoAtdEJ8dHdv4Pp65tX9trcBnKv433oALDDSPRHraMoxUGjJIFaT9P4HBdCtNiLgnUPPbWFCqvohkhwE9A8DSsQvUObttQ3ZJ4vgMQDBymmnwx6QRhX5O9l0













// "use client";
// import { Comment, fullBlog } from "@/app/lib/interface";
// import { PortableTextBlock } from "sanity"; // Ensure this is installed via `sanity`
// import { urlFor } from "@/app/lib/sanity";
// import { createClient } from "next-sanity";
// import { PortableText } from "next-sanity";
// import Image from "next/image";
// import React, { useState, useEffect } from "react";

// // Sanity client configuration with API token
// const client = createClient({
//   projectId: "your-project-id",  // Replace with your Sanity project ID
//   dataset: "production",  // or your custom dataset
//   useCdn: false, // Disable CDN for write operations
//   token: "your-api-token", // Replace with your generated API token
// });

// // Function to fetch comments from Sanity
// const fetchComments = async (slug: string) => {
//   const query = `*[_type == "comment" && blog->slug.current == '${slug}']{
//     _id,
//     username,
//     text,
//     blog->{
//       title
//     }
//   }`;
  
//   const data = await client.fetch(query);
//   return data;
// };

// async function getData(slug: string): Promise<fullBlog> {
//   const query = `*[_type == "blog" && slug.current == '${slug}']{
//     "currentSlug": slug.current,
//     title,
//     content,
//     titleImage
//   }[0]`;

//   const data: fullBlog = await client.fetch(query);
//   return data;
// }

// export default function BlogArticle({ params }: { params: { slug: string } }) {
//   const [data, setData] = useState<fullBlog | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState<string>("");

//   const [username, setUsername] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await getData(params.slug);
//       setData(result);

//       // Fetch comments from Sanity
//       const commentsFromSanity = await fetchComments(params.slug);
//       setComments(commentsFromSanity);
//     };
//     fetchData();
//   }, [params.slug]);

//   const handleAddComment = async () => {
//     if (!newComment || !username) {
//       alert("Username and comment text are required.");
//       return;
//     }

//     const newCommentData = {
//       _type: "comment",
//       username,
//       text: newComment,
//       blog: { _type: "reference", _ref: data?.currentSlug },
//     };

//     try {
//       // Create new comment in Sanity
//       const createdComment = await client.create(newCommentData);

//       // Update the comments state with newly created comment
//       setComments((prevComments) => [
//         ...prevComments,
//         createdComment,
//       ]);

//       // Reset input fields
//       setNewComment("");
//       setUsername("");
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       alert("There was an error adding your comment. Please try again.");
//     }
//   };

//   if (!data) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="mt-8">
//       <h1>
//         <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
//           Latest - Blogs
//         </span>
//         <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
//           {data.title}
//         </span>
//       </h1>

//       <Image
//         src={urlFor(data.titleImage).url()}
//         width={800}
//         height={800}
//         alt="Title Image"
//         priority
//         className="rounded-lg mt-8 border"
//       />

//       <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
//         <PortableText value={data.content} />
//       </div>

//       {/* Add Comment Section */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>

//         <div className="mb-4">
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//             Username
//           </label>
//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
//             placeholder="Enter your username"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
//             Comment
//           </label>
//           <textarea
//             id="comment"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
//             placeholder="Enter your comment"
//           />
//         </div>

//         <button
//           onClick={handleAddComment}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
//         >
//           Add Comment
//         </button>
//       </div>

//       {/* Display Comments */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-4">Comments</h2>
//         {comments.length > 0 ? (
//           <ul className="space-y-4">
//             {comments.map((comment) => (
//               <li key={comment._id} className="p-4 border rounded-md shadow-sm">
//                 <strong>{comment.username}</strong>
//                 <p>{comment.text}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No comments yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }













// import { useState, useEffect } from "react";
// import client from "@/app/lib/sanity"; // Import your Sanity client

// export default function BlogArticle({ params }) {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       const data = await client.fetch(`*[_type == "comment" && blog->slug.current == '${params.slug}']`);
//       setComments(data);
//     };
//     fetchComments();
//   }, [params.slug]);

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await client.delete(commentId);
//       setComments(comments.filter(comment => comment._id !== commentId));
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       alert("There was an error deleting the comment. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Comments</h1>
//       {comments.map((comment) => (
//         <div key={comment._id}>
//           <strong>{comment.username}</strong>
//           <p>{comment.text}</p>
//           <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }