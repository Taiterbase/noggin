import { DateTime } from "luxon";

export default function TimeSince(epoch: number) {
    const now = DateTime.now()
    const then = DateTime.fromSeconds(epoch)
    const diff = now.diff(then, ["years", "months", "weeks", "days", "hours", "minutes", "seconds"]).toObject();
    for (const [unit, val] of Object.entries(diff)) {
        diff[unit] = Math.round(val);
    }

    if (diff.years > 0) {
        return { diff: diff.years, unit: "y" };
    } else if (diff.months > 0) {
        return { diff: diff.months, unit: "M" };
    } else if (diff.weeks > 0) {
        return { diff: diff.weeks, unit: "w" };
    } else if (diff.days > 0) {
        return { diff: diff.days, unit: "d" };
    } else if (diff.hours > 0) {
        return { diff: diff.hours, unit: "h" };
    } else if (diff.minutes > 0) {
        return { diff: diff.minutes, unit: "m" };
    } else if (diff.seconds > 0) {
        return { diff: diff.seconds, unit: "s" };
    } else {
        return { diff: 0, unit: "s" };
    }

}