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
import PostsList from "@/components/blog/PostsList";
import AddPost from "@/components/blog/AddPost";
import PostForm from "@/components/blog/PostForm";

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
      <PostsList posts={posts} handleDelete={handleDelete} />
      {/* Add Blog Post */}
      <AddPost setShowBlogInput={setShowBlogInput} />
      {/* Add Blog Post Form */}
      {showBlogInput && (
        <PostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          handleSubmit={handleSubmit}
          setShowBlogInput={setShowBlogInput}
        />
      )}
    </main>
  );
};

export default BlogPage;
