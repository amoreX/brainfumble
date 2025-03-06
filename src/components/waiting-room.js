"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, Clock, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function WaitingRoom({
	roomCode,
	hostName,
	category,
	playerLimit,
	isHost = true,
	currentPlayerName,
	onStart,
}) {
	const [players, setPlayers] = useState([{ id: "1", name: hostName, isHost: true }]);

	const [isStarting, setIsStarting] = useState(false);

	// If we're joining as a player, add ourselves to the list
	useEffect(() => {
		if (!isHost && currentPlayerName) {
			setPlayers((prev) => [
				...prev,
				{ id: Date.now().toString(), name: currentPlayerName, isHost: false },
			]);
		}
	}, [isHost, currentPlayerName]);

	// Simulate other players joining
	useEffect(() => {
		if (players.length < 3) {
			const timer = setTimeout(() => {
				const names = ["Taylor", "Jordan", "Casey", "Riley", "Morgan"];
				const randomName = names[Math.floor(Math.random() * names.length)];

				setPlayers((prev) => [
					...prev,
					{
						id: Date.now().toString(),
						name: randomName,
						isHost: false,
					},
				]);
			}, Math.random() * 5000 + 2000);

			return () => clearTimeout(timer);
		}
	}, [players]);

	const handleStartGame = () => {
		setIsStarting(true);
		setTimeout(() => {
			onStart();
		}, 1500);
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle>Waiting Room</CardTitle>
						<Badge variant="outline" className="px-3 py-1">
							{players.length}/{playerLimit} Players
						</Badge>
					</div>
					<CardDescription>Waiting for players to join...</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex flex-wrap gap-2 text-sm">
							<div className="flex items-center gap-1.5">
								<Users className="h-4 w-4 text-muted-foreground" />
								<span>Host: {hostName}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Trophy className="h-4 w-4 text-muted-foreground" />
								<span>Category: {category}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span>30 seconds per question</span>
							</div>
						</div>

						<div className="grid gap-2">
							{players.map((player) => (
								<div
									key={player.id}
									className="flex items-center justify-between rounded-lg border p-3 text-sm"
								>
									<div className="flex items-center gap-3">
										<Avatar className="h-8 w-8 border">
											<AvatarFallback className="bg-primary/10 text-primary">
												{player.name.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<span>{player.name}</span>
									</div>
									{player.isHost && <Badge variant="secondary">Host</Badge>}
								</div>
							))}

							{Array.from({ length: playerLimit - players.length }).map((_, i) => (
								<div
									key={`empty-${i}`}
									className="flex items-center gap-3 rounded-lg border border-dashed p-3 text-sm text-muted-foreground"
								>
									<div className="h-8 w-8 rounded-full bg-muted" />
									<span>Waiting for player...</span>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{isHost ? (
				<Button
					onClick={handleStartGame}
					className="w-full"
					disabled={players.length < 2 || isStarting}
				>
					{isStarting ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Starting Game...
						</>
					) : players.length < 2 ? (
						"Waiting for Players..."
					) : (
						"Start Game"
					)}
				</Button>
			) : (
				<div className="text-center text-sm text-muted-foreground">
					Waiting for host to start the game...
				</div>
			)}
		</div>
	);
}
