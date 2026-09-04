import type { BirthdayNote, ConfettiPiece, CountdownParts, HeroCopy } from "@/lib/types";

/** Seychelle's birthday (month is 1-indexed). */
export const BIRTHDAY = {
	year: 1998,
	month: 9,
	day: 18,
} as const;

export const LOCAL_STORAGE_MUTED_KEY = "birthday-muted";

export const CONFETTI_COUNT = 14;
export const CONFETTI_RADIUS = 180;

export const WRONG_ANSWER_DURATION = 1500;
export const CONFETTI_DURATION = 1600;
export const SCROLL_DELAY = 50;
export const HERO_FADE_DURATION = 1000;

export const BIRTHDAY_NOTES: BirthdayNote[] = [
	{
		icon: "heart",
		title: "Your heart",
		body: "You have a way of making everyone around you feel special. Your kindness is a quiet strength that makes my world better — this year, and every year.",
	},
	{
		icon: "music",
		title: "Every song with you",
		body: "From car karaoke to kitchen dance parties, you're the melody to my favorite moments. I love every song we share.",
	},
	{
		icon: "sun",
		title: "Your light",
		body: "You're my sunshine — happiest with your toes in the sand and the sound of the waves. Being with you feels like endless summer.",
	},
];

export const LETTER_GREETING = "Happy birthday, Seychelle.";

export const LETTER_BODY =
	"For Seychelle, the light of my life. Twenty-eight looks beautiful on you. Just like a perfect day at the beach, you bring warmth and sunshine to my world. Of all the treasures in the world, I was lucky enough to find you. You are the melody to my favorite song and the calm in my ocean. My love for you is deeper than any sea in the universe.";

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
			title: "A gift for Seychelle",
			subtitle: null,
			giftAriaLabel: "This gift opens at midnight Pacific Time on September 18",
			successMessage: "Happy birthday.",
			canOpen: false,
			lockedHint: "This gift opens on her birthday.",
		};
	}

	return {
		title: `Happy ${turningAge}th birthday, Seychelle`,
		subtitle: "Open your gift",
		giftAriaLabel: "Open your birthday gift",
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
