import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
	subsets: ["latin"],
	variable: "--font-instrument-sans",
});

export const metadata = {
	title: "brainfumble",
	description: "Fun trivia game to ruin friendships",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={instrumentSans.variable}>
			<body className="font-sans antialiased">{children}</body>
		</html>
	);
}
