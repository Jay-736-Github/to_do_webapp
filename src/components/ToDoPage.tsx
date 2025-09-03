import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Info, PlusCircle, LogOut, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  text: string;
  notes: string;
  isCompleted: boolean;
}

interface ToDoPageProps {
  userEmail: string;
  onLogout: () => void;
}

export default function ToDoPage({ userEmail, onLogout }: ToDoPageProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem(`tasks_${userEmail}`);
    try {
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
    }
    return Array.from({ length: 5 }, () => ({
      id: nanoid(),
      text: "",
      notes: "",
      isCompleted: false,
    }));
  });

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentNotes, setCurrentNotes] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    localStorage.setItem(`tasks_${userEmail}`, JSON.stringify(tasks));
  }, [tasks, userEmail]);

  const handleAddTask = () => {
    const newTask: Task = {
      id: nanoid(),
      text: "",
      notes: "",
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskTextChange = (id: string, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleOpenNotesModal = (task: Task) => {
    setSelectedTask(task);
    setCurrentNotes(task.notes);
    setIsModalOpen(true);
  };

  const handleSaveNotes = () => {
    if (selectedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? { ...task, notes: currentNotes } : task
        )
      );
    }
    setIsModalOpen(false);
    setSelectedTask(null);
    setCurrentNotes("");
  };

 
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1;
  });

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl">
  
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-[Georgia] text-accent-foreground">
          Your Tasks
        </h1>
        <Button variant="ghost" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      <AnimatePresence>
        <motion.div layout className="space-y-4">
          {sortedTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div whileHover={{ y: -4, scale: 1.01 }}>
                <Card
                  className={cn(
                    "transition-colors duration-300 shadow-lg hover:shadow-2xl rounded-xl",

                    task.isCompleted ? "bg-muted/50" : "bg-card"
                  )}
                >
                  <CardContent className="p-4 flex items-center gap-4 group">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.isCompleted}
                      onCheckedChange={() => handleToggleComplete(task.id)}
                      className="h-5 w-5"
                    />
                    <Input
                      placeholder={`Type your task here...`}
                      className={cn(
                        "flex-grow text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto font-[Georgia]",
     
                        task.isCompleted &&
                          "line-through text-muted-foreground opacity-70"
                      )}
                      value={task.text}
                      onChange={(e) =>
                        handleTaskTextChange(task.id, e.target.value)
                      }
                      readOnly={task.isCompleted}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenNotesModal(task)}
                      className="h-8 w-8"
                      aria-label="Open notes"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTask(task.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-6 flex justify-center"
      >
        <Button
          onClick={handleAddTask}
          size="lg" 
          className="w-full md:w-auto rounded-xl shadow-md font-[Georgia]"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add Task
        </Button>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Notes for: {selectedTask?.text || "this task"}
            </DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Add your important notes here..."
            className="min-h-[200px] mt-4 font-[Georgia]"
            value={currentNotes}
            onChange={(e) => setCurrentNotes(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
