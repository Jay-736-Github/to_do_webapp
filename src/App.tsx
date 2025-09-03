import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import ToDoPage from "./components/ToDoPage";
import { Header } from "./components/Header"; // Import the header

function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("todo_user_email");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogin = (email: string) => {
    localStorage.setItem("todo_user_email", email);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("todo_user_email");
    setUserEmail(null);
  };
 
  const getUserName = (email: string) => {
    const namePart = email.split("@")[0]; 

    return namePart
      .split(/[\._]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };
  const userName = userEmail ? getUserName(userEmail) : "buddy";

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header userName={userName} />
      <main className="pt-20">
        {userEmail ? (
          <ToDoPage userEmail={userEmail} onLogout={handleLogout} />
        ) : (
          <LandingPage onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}

export default App;
