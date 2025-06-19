import { Profile } from "../domain/types";

export const getProfileDisplayName = (profile: Profile) => {
	return profile.name ? profile.name : profile.email;
};