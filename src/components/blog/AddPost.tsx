import { Button } from "../ui/button";

const AddPost = ({
  setShowBlogInput,
}: {
  setShowBlogInput: (value: boolean) => void;
}) => {
  return (
    <div className="flex gap-10 mb-10 items-center">
      <h1 className="text-2xl font-bold">Blog</h1>
      <Button onClick={() => setShowBlogInput(true)}>Add a Post</Button>
    </div>
  );
};

export default AddPost;
