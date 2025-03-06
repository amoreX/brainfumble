import { Instrument_Sans, InstrumentSans } from "next/font/google";
import "./globals.css";

// const InstrumentSans = Instrument_Sans({
// 	variable: [],
// });

export const metadata = {
	title: "brainfumble",
	description: "Fun trivia game to ruin friendships",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={` antialiased`}>{children}</body>
		</html>
	);
}
