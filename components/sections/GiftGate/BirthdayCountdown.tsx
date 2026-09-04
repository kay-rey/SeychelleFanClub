import type { JSX } from "react";
import type { CountdownParts } from "@/lib/types";

interface BirthdayCountdownProps {
	parts: CountdownParts;
}

interface CountdownUnitProps {
	value: number;
	label: string;
}

function padTwo(value: number): string {
	return value.toString().padStart(2, "0");
}

function CountdownUnit({ value, label }: CountdownUnitProps): JSX.Element {
	return (
		<div className="flex flex-col items-center">
			<span className="font-mono tabular-nums text-3xl sm:text-4xl text-pink-600 leading-none w-[2ch] text-center">
				{padTwo(value)}
			</span>
			<span className="mt-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.18em] text-pink-900/40">
				{label}
			</span>
		</div>
	);
}

/**
 * Live remaining time until midnight Pacific on September 18.
 */
export function BirthdayCountdown({ parts }: BirthdayCountdownProps): JSX.Element {
	const { days, hours, minutes, seconds } = parts;
	const ariaLabel = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until midnight Pacific Time on September 18`;

	return (
		<div className="space-y-2" role="timer" aria-label={ariaLabel}>
			<div className="flex items-start justify-center gap-3 sm:gap-5">
				<CountdownUnit value={days} label={days === 1 ? "day" : "days"} />
				<span className="font-mono text-3xl sm:text-4xl text-pink-300 leading-none" aria-hidden>
					:
				</span>
				<CountdownUnit value={hours} label="hours" />
				<span className="font-mono text-3xl sm:text-4xl text-pink-300 leading-none" aria-hidden>
					:
				</span>
				<CountdownUnit value={minutes} label="minutes" />
				<span className="font-mono text-3xl sm:text-4xl text-pink-300 leading-none" aria-hidden>
					:
				</span>
				<CountdownUnit value={seconds} label="seconds" />
			</div>
			<p className="font-sans text-xs tracking-wide text-pink-900/35">until midnight Pacific Time</p>
		</div>
	);
}
