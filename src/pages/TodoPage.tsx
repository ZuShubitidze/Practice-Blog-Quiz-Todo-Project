import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function TodoPage() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  // Show todos from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = () => {
    if (!newTodo) return;
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 gap-4">
      <h1 className="text-3xl font-bold">Tasks</h1>
      <div className="flex gap-4 mb-8">
        <Input
          className="w-md"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={() => handleAddTodo()}>Add Todo</Button>
      </div>
      <ul className="flex flex-col gap-8">
        {todos.map((todo, index) => (
          <li key={index} className="grid grid-cols-2 w-md items-center">
            <p>{todo}</p>
            <Button
              onClick={() => handleDeleteTodo(index)}
              className="bg-red-500 text-white w-full"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;
