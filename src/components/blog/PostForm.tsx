import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const PostForm = ({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
  setShowBlogInput,
}: {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  handleSubmit: () => void;
  setShowBlogInput: (value: boolean) => void;
}) => {
  return (
    <form className="flex flex-col gap-4 mb-10">
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
    </form>
  );
};

export default PostForm;
