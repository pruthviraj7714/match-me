import { differenceInYears } from "date-fns";

export function calculateAge(dateOfBirth: string) {
  const today = new Date();
  return differenceInYears(today, new Date(dateOfBirth));
}
