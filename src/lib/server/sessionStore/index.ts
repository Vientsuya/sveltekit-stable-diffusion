import { randomBytes } from 'crypto';

type SessionInfo = {
	username: string;
	roles: string[];
	invalidAt: number;
};

export type User = {
	id: number;
	username: string;
	password: string;
	email: string;
	roles: string[];
	registered_at: Date;
};

type Sid = string;

const sessionStore = new Map<Sid, SessionInfo>();
let nextClean = Date.now() + 1000 * 60 * 60 * 12; // 12 hours

function getSid(): Sid {
	return randomBytes(32).toString('hex');
}

export function getSession(sid: Sid): SessionInfo | undefined {
	const session = sessionStore.get(sid);
	if (session) {
		if (Date.now() > session.invalidAt) {
			console.log('Deleting invalid session', sid);
			sessionStore.delete(sid);
			return undefined;
		} else {
			return session;
		}
	} else {
		console.log('Unknown session', sid);
		return undefined;
	}
}

export function createSession(user: User, maxAge: number): string {
	let sid: Sid = '';

	do {
		sid = getSid();
	} while (sessionStore.has(sid));

	sessionStore.set(sid, {
		username: user.username,
		roles: user.roles,
		invalidAt: Date.now() + maxAge
	});

	return sid;
}

function clean() {
	const now = Date.now();
	for (const [sid, sessionInfo] of sessionStore) {
		if (sessionInfo.invalidAt < now) {
			sessionStore.delete(sid);
		}
	}
	nextClean = Date.now() + 1000 * 60 * 60 * 12; // 12 hours
}

if (Date.now() > nextClean) {
	setTimeout(() => {
		clean();
	}, 5000);
}
