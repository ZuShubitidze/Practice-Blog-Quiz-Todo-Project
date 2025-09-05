import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SelectCategoryForm = ({
  handleCategoryChange,
}: {
  handleCategoryChange: (value: string) => void;
}) => {
  return (
    <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="geography">Geography</SelectItem>
          <SelectItem value="history">History</SelectItem>
        </SelectContent>
      </Select>
    </form>
  );
};

export default SelectCategoryForm;
