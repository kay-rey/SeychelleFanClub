import type { BirthdayNote, ConfettiPiece, CountdownParts, HeroCopy } from "@/lib/types";

/** Seychelle's birthday (month is 1-indexed). */
export const BIRTHDAY = {
	year: 1998,
	month: 9,
	day: 18,
} as const;

export const LOCAL_STORAGE_MUTED_KEY = "birthday-muted";

/**
 * Temporary design unlock — treat the site as open on her birthday.
 * Set to `false` before September 18 so the real lock returns.
 */
export const PREVIEW_AS_UNLOCKED = true;

export const CONFETTI_COUNT = 14;
export const CONFETTI_RADIUS = 180;

export const WRONG_ANSWER_DURATION = 1500;
export const CONFETTI_DURATION = 1600;
export const SCROLL_DELAY = 50;
export const HERO_FADE_DURATION = 1000;

export const BIRTHDAY_NOTES: BirthdayNote[] = [
	{
		icon: "leaf",
		title: "Your stillness",
		body: "You carry a calm that settles a room — like shade in a stone garden. Being near you feels like finding the quiet path.",
	},
	{
		icon: "heart",
		title: "Your warmth",
		body: "You make ordinary hours feel considered. The way you look at the world — patient, bright — is the light I keep returning to.",
	},
	{
		icon: "sun",
		title: "Your light",
		body: "Soft afternoon light on limestone. That is how I think of you this year: warm, exacting, and beautiful without trying.",
	},
];

export const LETTER_GREETING = "Happy birthday, Seychelle.";

export const LETTER_BODY =
	"For Seychelle, the light of my life. Twenty-eight looks beautiful on you — like late sun on warm stone, like a garden that knows how to wait. Of all the quiet places in the world, I was lucky enough to find you. You are the still center of my favorite days. My love for you is steady as marble and soft as the air between the columns.";

export const LETTER_SIGN_OFF = "- With all my love";

export const PACIFIC_TIME_ZONE = "America/Los_Angeles";

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = 86400;

/**
 * Age Seychelle turns (or turned) in the given calendar year, using Pacific time.
 */
export function getTurningAge(now: Date): number {
	return getPacificYear(now) - BIRTHDAY.year;
}

/**
 * Remaining time until midnight Pacific on September 18 of the current Pacific year.
 */
export function getCountdownToUnlock(now: Date): CountdownParts {
	const unlockAt = getBirthdayUnlockAt(now);
	const totalMs = Math.max(0, unlockAt.getTime() - now.getTime());
	const totalSeconds = Math.floor(totalMs / MS_PER_SECOND);

	return {
		days: Math.floor(totalSeconds / SECONDS_PER_DAY),
		hours: Math.floor((totalSeconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR),
		minutes: Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE),
		seconds: totalSeconds % SECONDS_PER_MINUTE,
		totalMs,
	};
}

/**
 * True at or after midnight Pacific on September 18 of this Pacific year.
 */
export function canOpenGift(now: Date): boolean {
	if (PREVIEW_AS_UNLOCKED) return true;
	return getCountdownToUnlock(now).totalMs <= 0;
}

/**
 * Hero headline and supporting line based on the current instant.
 */
export function getHeroCopy(now: Date): HeroCopy {
	const turningAge = getTurningAge(now);
	const unlocked = canOpenGift(now);

	if (!unlocked) {
		return {
			title: "For Seychelle",
			subtitle: null,
			openAriaLabel: "This feature opens at midnight Pacific Time on September 18",
			successMessage: "Happy birthday.",
			canOpen: false,
			lockedHint: "This opens on her birthday.",
		};
	}

	return {
		title: `Happy ${turningAge}th birthday, Seychelle`,
		subtitle: "A quiet feature, just for you",
		openAriaLabel: "Open your birthday feature",
		successMessage: "Happy birthday.",
		canOpen: true,
		lockedHint: null,
	};
}

function getPacificYear(now: Date): number {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: PACIFIC_TIME_ZONE,
		year: "numeric",
	}).formatToParts(now);
	const yearPart = parts.find((part) => part.type === "year");
	return Number(yearPart?.value);
}

/**
 * Midnight Pacific Time on September 18 of the Pacific calendar year for `now`.
 */
function getBirthdayUnlockAt(now: Date): Date {
	const year = getPacificYear(now);
	return zonedDateTimeToUtc(year, BIRTHDAY.month, BIRTHDAY.day, 0, 0, 0, PACIFIC_TIME_ZONE);
}

/**
 * Converts a wall-clock date/time in a named time zone to a UTC `Date`.
 */
function zonedDateTimeToUtc(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	second: number,
	timeZone: string
): Date {
	const formatter = new Intl.DateTimeFormat("en-US", {
		timeZone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hourCycle: "h23",
	});

	const readAsUtc = (ms: number): number => {
		const values = Object.fromEntries(
			formatter
				.formatToParts(new Date(ms))
				.filter((part) => part.type !== "literal")
				.map((part) => [part.type, part.value])
		);
		return Date.UTC(
			Number(values.year),
			Number(values.month) - 1,
			Number(values.day),
			Number(values.hour),
			Number(values.minute),
			Number(values.second)
		);
	};

	const wantedAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);
	let utcMs = wantedAsUtc;

	for (let i = 0; i < 3; i += 1) {
		utcMs += wantedAsUtc - readAsUtc(utcMs);
	}

	return new Date(utcMs);
}

/**
 * Confetti positions in a circle around the center, starting from the top.
 */
export function getConfettiPieces(): ConfettiPiece[] {
	return Array.from({ length: CONFETTI_COUNT }, (_, i) => {
		const angle = (i / CONFETTI_COUNT) * 2 * Math.PI - Math.PI / 2;
		return {
			id: i,
			tx: CONFETTI_RADIUS * Math.cos(angle),
			ty: CONFETTI_RADIUS * Math.sin(angle),
		};
	});
}
