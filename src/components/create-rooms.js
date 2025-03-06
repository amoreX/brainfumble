"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2, Copy } from "lucide-react";
import { WaitingRoom } from "@/components/waiting-room";

const QUIZ_CATEGORIES = [
	{ id: "general", name: "General Knowledge" },
	{ id: "science", name: "Science" },
	{ id: "history", name: "History" },
	{ id: "sports", name: "Sports" },
	{ id: "technology", name: "Technology" },
];

const TIMER_OPTIONS = [
	{ value: "15", label: "15 seconds" },
	{ value: "30", label: "30 seconds" },
	{ value: "45", label: "45 seconds" },
	{ value: "60", label: "60 seconds" },
];

export function CreateRoomForm() {
	const router = useRouter();
	const [hostName, setHostName] = useState("");
	const [category, setCategory] = useState("");
	const [playerLimit, setPlayerLimit] = useState("4");
	const [timer, setTimer] = useState("30");
	const [isCreating, setIsCreating] = useState(false);
	const [roomCreated, setRoomCreated] = useState(false);
	const [roomCode, setRoomCode] = useState("");
	const [copied, setCopied] = useState(false);

	const handleCreateRoom = (e) => {
		e.preventDefault();
		setIsCreating(true);

		// Simulate API call to create room
		setTimeout(() => {
			// Generate a random 6-character room code
			const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
			setRoomCode(generatedCode);
			setRoomCreated(true);
			setIsCreating(false);
		}, 1500);
	};

	const copyRoomCode = () => {
		navigator.clipboard.writeText(roomCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const startGame = () => {
		router.push(`/game/${roomCode}`);
	};

	if (roomCreated) {
		return (
			<div className="space-y-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
						<CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
					</div>
					<h3 className="text-2xl font-bold">Room Created!</h3>
					<p className="text-muted-foreground">
						Share this code with your friends to join the game
					</p>

					<Card className="w-full max-w-xs border-2 border-primary/20">
						<CardContent className="flex items-center justify-between p-4">
							<span className="text-2xl font-bold tracking-widest">{roomCode}</span>
							<Button variant="ghost" size="icon" onClick={copyRoomCode} className="h-8 w-8">
								{copied ? (
									<CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
								) : (
									<Copy className="h-4 w-4" />
								)}
								<span className="sr-only">Copy code</span>
							</Button>
						</CardContent>
					</Card>
				</div>

				<WaitingRoom
					roomCode={roomCode}
					hostName={hostName}
					category={QUIZ_CATEGORIES.find((c) => c.id === category)?.name || category}
					playerLimit={Number.parseInt(playerLimit)}
					onStart={startGame}
				/>
			</div>
		);
	}

	return (
		<form onSubmit={handleCreateRoom} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="host-name">Your Name</Label>
					<Input
						id="host-name"
						placeholder="Enter your name"
						value={hostName}
						onChange={(e) => setHostName(e.target.value)}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="category">Quiz Category</Label>
					<Select value={category} onValueChange={setCategory} required>
						<SelectTrigger id="category">
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							{QUIZ_CATEGORIES.map((category) => (
								<SelectItem key={category.id} value={category.id}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="player-limit">Player Limit</Label>
						<Select value={playerLimit} onValueChange={setPlayerLimit}>
							<SelectTrigger id="player-limit">
								<SelectValue placeholder="Select limit" />
							</SelectTrigger>
							<SelectContent>
								{[2, 3, 4, 5, 6].map((num) => (
									<SelectItem key={num} value={num.toString()}>
										{num} players
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="timer">Time per Question</Label>
						<Select value={timer} onValueChange={setTimer}>
							<SelectTrigger id="timer">
								<SelectValue placeholder="Select time" />
							</SelectTrigger>
							<SelectContent>
								{TIMER_OPTIONS.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			<Button type="submit" className="w-full" disabled={isCreating || !hostName || !category}>
				{isCreating ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Creating Room...
					</>
				) : (
					"Create Room"
				)}
			</Button>
		</form>
	);
}
