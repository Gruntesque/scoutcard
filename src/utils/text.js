/**
 * ScoutCard
 * Text utilities
 */

export function normalize(text) {

    if (!text) {
        return "";
    }

    return text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

}

export function clean(text) {

    return text
        ?.replace(/\s+/g, " ")
        ?.trim() ?? "";

}

export function equals(a, b) {

    return normalize(a) === normalize(b);

}

export function contains(haystack, needle) {

    return normalize(haystack)
        .includes(normalize(needle));

}

export function tokenize(text) {

    return normalize(text)
        .split(" ")
        .filter(Boolean);

}

export function similarity(a, b) {

    const A = new Set(tokenize(a));
    const B = new Set(tokenize(b));

    if (!A.size || !B.size) {
        return 0;
    }

    let common = 0;

    for (const word of A) {

        if (B.has(word)) {

            common++;

        }

    }

    return common / Math.max(A.size, B.size);

}

export function looksLikePlayerName(text) {

    text = clean(text);

    if (text.length < 3) {
        return false;
    }

    if (text.length > 60) {
        return false;
    }

    if (/\d/.test(text)) {
        return false;
    }

    return true;

}

export function initials(name) {

    return clean(name)
        .split(" ")
        .filter(Boolean)
        .map(word => word[0])
        .join("")
        .toUpperCase();

}
