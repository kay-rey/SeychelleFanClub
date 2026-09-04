import type { BirthdayNote, ConfettiPiece, HeroCopy } from "@/lib/types";

/** Seychelle's birthday (month is 1-indexed). */
export const BIRTHDAY = {
	year: 1998,
	month: 9,
	day: 18,
} as const;

export const LOCAL_STORAGE_MUTED_KEY = "birthday-muted";

/** Not yet "runs away" to these positions; x >= 0 so it never overlaps the gift. */
export const NOT_YET_POSITIONS = [
	{ x: 0, y: 0 },
	{ x: 36, y: -20 },
	{ x: 24, y: 28 },
] as const;

/** Each Not yet click: the button shrinks. */
export const NOT_YET_SIZE_STEPS = [
	"h-11 min-w-[5.5rem] px-3 text-sm",
	"h-10 min-w-[5rem] px-2 text-sm",
	"h-9 min-w-[4.5rem] px-2 text-xs",
	"h-8 min-w-[4rem] px-1.5 text-xs",
	"h-7 min-w-[3.5rem] px-1 text-[10px]",
] as const;

export const MAX_NOT_YET_CLICKS = NOT_YET_SIZE_STEPS.length - 1;

export const CONFETTI_COUNT = 14;
export const CONFETTI_RADIUS = 180;

export const WRONG_ANSWER_DURATION = 1500;
export const CONFETTI_DURATION = 1600;
export const SCROLL_DELAY = 50;
export const HERO_FADE_DURATION = 1000;

export const SPARKLE_COUNT = 20;
export const FLOATING_HEART_COUNT = 8;
export const FLOATING_SHELL_COUNT = 6;
export const FLOATING_GIFT_COUNT = 4;

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

/**
 * Age Seychelle turns (or turned) in the given calendar year.
 */
export function getTurningAge(now: Date): number {
	return now.getFullYear() - BIRTHDAY.year;
}

/**
 * Whole days until this year's birthday. 0 on the day, negative after.
 */
export function getDaysUntilBirthday(now: Date): number {
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const birthdayThisYear = new Date(now.getFullYear(), BIRTHDAY.month - 1, BIRTHDAY.day);
	const diffMs = birthdayThisYear.getTime() - startOfToday.getTime();
	return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Hero headline and supporting line based on today's date.
 */
export function getHeroCopy(now: Date): HeroCopy {
	const days = getDaysUntilBirthday(now);
	const turningAge = getTurningAge(now);

	if (days > 0) {
		const dayWord = days === 1 ? "day" : "days";
		return {
			title: "Your birthday is almost here",
			subtitle: `${days} ${dayWord} until you're ${turningAge}`,
			giftAriaLabel: "Open your birthday gift",
			successMessage: "Yay! Let's celebrate.",
		};
	}

	return {
		title: `Happy ${turningAge}th birthday, Seychelle`,
		subtitle: "Tap to open your present",
		giftAriaLabel: "Open your birthday present",
		successMessage: "Yay! Let's celebrate.",
	};
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
