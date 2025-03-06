"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateRoomForm } from "@/components/create-rooms";
import { JoinRoomForm } from "@/components/join-rooms";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePageClient() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
			<main className="  flex container  ">
				<div className="mx-auto   max-w-2xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-4 md:mb-12 text-center"
					>
						<h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400">
							BrainFumble
						</h2>
						<p className="mt-4 text-muted-foreground scale-75 md:scale-100">
							Challenge your friends in a fast-paced quiz competition. Create a room or join an
							existing one to get started.
						</p>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<div className="overflow-hidden p-4 rounded-md scale-75 md:scale-100 border-2 shadow-lg  bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
							<Tabs defaultValue="create" className="w-full">
								<TabsList className="flex justify-center w-full ">
									<TabsTrigger value="create">Create Room</TabsTrigger>
									<TabsTrigger value="join">Join Room</TabsTrigger>
								</TabsList>
								<TabsContent value="create" className="p-4">
									<CreateRoomForm />
								</TabsContent>
								<TabsContent value="join" className="p-4">
									<JoinRoomForm />
								</TabsContent>
							</Tabs>
						</div>
					</motion.div>
				</div>
			</main>
		</div>
	);
}
