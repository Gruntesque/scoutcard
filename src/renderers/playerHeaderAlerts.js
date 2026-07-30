export function injuryBlock(tm) {
    if (!tm.injury && !tm.expectedReturn)
        return "";

    return `
<div class="scoutcard-injury">

<span class="scoutcard-injury-icon">
⛔
</span>

<div class="scoutcard-injury-text">

<div class="scoutcard-injury-title">
${tm.injury || "Injured"}
</div>

${
    tm.expectedReturn
        ? `
<div class="scoutcard-injury-return">
${tm.expectedReturn}
</div>
`
        : ""
}

</div>

</div>
`;
}

export function loanBlock(tm) {
    if (!tm.loan)
        return "";

    return `
<div class="scoutcard-loan">

<span class="scoutcard-loan-icon">
🔁
</span>

<div class="scoutcard-loan-title">
Loan
</div>

</div>
`;
}