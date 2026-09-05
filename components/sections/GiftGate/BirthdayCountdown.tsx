import type { JSX } from "react";
import { isUnlockSmokeTest, TEST_UNLOCK_AT_NEXT_MINUTE } from "@/lib/birthday";
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
			<span className="font-mono tabular-nums text-2xl sm:text-3xl text-[#f5f0e8] leading-none w-[2ch] text-center">
				{padTwo(value)}
			</span>
			<span className="mt-2 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-[#f5f0e8]/70">
				{label}
			</span>
		</div>
	);
}

/**
 * Live remaining time until the unlock midnight (birthday or tonight while testing).
 */
export function BirthdayCountdown({ parts }: BirthdayCountdownProps): JSX.Element {
	const { days, hours, minutes, seconds } = parts;
	const unlockLabel = TEST_UNLOCK_AT_NEXT_MINUTE
		? "the next minute"
		: isUnlockSmokeTest
			? "midnight Pacific Time tonight"
			: "midnight Pacific Time on September 18";
	const ariaLabel = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until ${unlockLabel}`;

	return (
		<div className="space-y-3" role="timer" aria-label={ariaLabel}>
			<div className="flex items-start justify-center gap-3 sm:gap-5">
				<CountdownUnit value={days} label={days === 1 ? "day" : "days"} />
				<span className="font-mono text-2xl sm:text-3xl text-[#f5f0e8]/55 leading-none" aria-hidden>
					:
				</span>
				<CountdownUnit value={hours} label="hours" />
				<span className="font-mono text-2xl sm:text-3xl text-[#f5f0e8]/55 leading-none" aria-hidden>
					:
				</span>
				<CountdownUnit value={minutes} label="minutes" />
				<span className="font-mono text-2xl sm:text-3xl text-[#f5f0e8]/55 leading-none" aria-hidden>
					:
				</span>
				<CountdownUnit value={seconds} label="seconds" />
			</div>
			<p className="font-sans text-[0.65rem] uppercase tracking-[0.18em] text-[#f5f0e8]/70">
				{TEST_UNLOCK_AT_NEXT_MINUTE
					? "until the next minute"
					: "until midnight Pacific Time"}
			</p>
		</div>
	);
}
