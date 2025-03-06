"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { WaitingRoom } from "@/components/waiting-room";

export function JoinRoomForm() {
	const router = useRouter();
	const [playerName, setPlayerName] = useState("");
	const [roomCode, setRoomCode] = useState("");
	const [isJoining, setIsJoining] = useState(false);
	const [hasJoined, setHasJoined] = useState(false);
	const [error, setError] = useState("");

	const handleJoinRoom = (e) => {
		e.preventDefault();
		setError("");
		setIsJoining(true);

		// Simulate API call to join room
		setTimeout(() => {
			// For demo purposes, we'll just check if the room code is 6 characters
			if (roomCode.length === 6) {
				setHasJoined(true);
			} else {
				setError("Invalid room code. Please check and try again.");
			}
			setIsJoining(false);
		}, 1500);
	};

	const startGame = () => {
		router.push(`/game/${roomCode}`);
	};

	if (hasJoined) {
		return (
			<WaitingRoom
				roomCode={roomCode}
				hostName="Alex" // In a real app, this would come from the server
				category="General Knowledge" // In a real app, this would come from the server
				playerLimit={4} // In a real app, this would come from the server
				isHost={false}
				currentPlayerName={playerName}
				onStart={startGame}
			/>
		);
	}

	return (
		<form onSubmit={handleJoinRoom} className="space-y-6">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="player-name">Your Name</Label>
					<Input
						id="player-name"
						placeholder="Enter your name"
						value={playerName}
						onChange={(e) => setPlayerName(e.target.value)}
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="room-code">Room Code</Label>
					<Input
						id="room-code"
						placeholder="Enter 6-character code"
						value={roomCode}
						onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
						maxLength={6}
						className="text-center text-lg tracking-widest uppercase"
						required
					/>
					{error && <p className="text-sm text-red-500">{error}</p>}
				</div>
			</div>

			<Button
				type="submit"
				className="w-full"
				disabled={isJoining || !playerName || roomCode.length !== 6}
			>
				{isJoining ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Joining Room...
					</>
				) : (
					"Join Room"
				)}
			</Button>
		</form>
	);
}
