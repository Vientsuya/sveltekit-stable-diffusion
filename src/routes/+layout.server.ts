export const load = async ({ locals }) => {
	const { username } = locals;

	return { username };
};
