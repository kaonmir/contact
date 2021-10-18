import {
  Profile,
  SimpleProfile,
  SimpleProfiles,
} from "../../model/@types/Profile";

export default function searchContact(
  keywords: string[],
  profile: SimpleProfile
): boolean {
  if (keywords.length === 0) return true;

  const { content, full_name, tags, title } = profile;
  const profile_keywords = [
    content,
    content.split("-").join(""),
    ...full_name.split(/[ \.\,]/),
    ...tags,
    title,
  ]
    .map((k) => k.toLowerCase())
    .filter((k) => k.length !== 0);

  return keywords
    .map((k) => k.toLowerCase())
    .every((keyword) =>
      profile_keywords.some((p_word) => p_word.includes(keyword))
    );
}
