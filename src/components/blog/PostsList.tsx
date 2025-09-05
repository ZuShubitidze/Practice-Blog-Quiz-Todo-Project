import type { Post } from "@/interfaces/post-interface";
import { Button } from "../ui/button";

const PostsList = ({
  posts,
  handleDelete,
}: {
  posts: Post[];
  handleDelete: (id: number) => void;
}) => {
  return (
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
  );
};

export default PostsList;
