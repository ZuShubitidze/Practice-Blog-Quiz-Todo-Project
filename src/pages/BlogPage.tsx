import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Post } from "@/interfaces/post-interface";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "@/firebaseConfig";

const db = getFirestore(app);

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showBlogInput, setShowBlogInput] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // Upload Posts to Firestore
  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: new Date(),
      });
      setShowBlogInput(false);
      setTitle("");
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  // Fetch Posts from Firestore
  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData: Post[] = querySnapshot.docs.map((doc) => ({
        id: doc.id as unknown as number, // Firestore IDs are strings; adjust as needed
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete Post
  const handleDelete = async (id: number) => {
    try {
      await deleteDoc(doc(db, "posts", id.toString()));
      fetchPosts();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <main className="p-20 w-full md:w-1/2 gap-20 flex flex-col">
      {/* Blog Posts List */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Blog Posts - {posts.length}</h1>
        {posts.map((post, index) => (
          <div key={index} className="border-b py-4 flex flex-col gap-2">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <Button
              onClick={() => handleDelete(post.id)}
              className="bg-red-500 text-white md:w-1/2 lg:1/3 w-full"
            >
              Delete Post
            </Button>
          </div>
        ))}
      </div>
      {/* Add Blog Post */}
      <div className="flex gap-10 mb-10 items-center">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Button onClick={() => setShowBlogInput(true)}>Add a Post</Button>
      </div>
      {/* Add Blog Post Form */}
      {showBlogInput && (
        <div className="flex flex-col gap-4 mb-10">
          <Input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            className="border p-2 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex gap-4">
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={() => setShowBlogInput(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogPage;
