import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LandingPage({
  onLogin,
}: {
  onLogin: (email: string) => void;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) onLogin(email);
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-background dark:bg-background-dark transition-colors pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="w-full max-w-lg"
      >
        <Card className="rounded-3xl shadow-2xl border border-muted dark:border-muted-dark bg-card/90 dark:bg-card-dark/90 backdrop-blur-md transition-colors">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-4xl font-bold tracking-tight font-[Georgia]">
              Welcome 👋
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground dark:text-muted-foreground-dark font-[Georgia]">
              Enter your email to unlock your to-do list and make today
              productive.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="py-6 text-base rounded-xl shadow-sm"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  className="w-full py-6 text-lg rounded-xl font-medium font-[Georgia]"
                >
                  Continue →
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
