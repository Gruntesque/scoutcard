/**
 * ScoutCard
 * Transfermarkt Profile Parser
 */

export function parseProfile(html) {

    const doc = new DOMParser().parseFromString(
        html,
        "text/html"
    );

    const profile = {

        age: null,

        height: null,

        foot: null,

        position: null,

        citizenship: [],

        contractExpires: null

    };

    const infoItems = [

        ...doc.querySelectorAll(

            ".info-table__content"

        )

    ];

    for (let i = 0; i < infoItems.length - 1; i += 2) {

        const label = infoItems[i]
            .textContent
            .trim()
            .toLowerCase();

        const valueNode = infoItems[i + 1];

        const value = valueNode.textContent.trim();

        switch (label) {

            case "date of birth/age:": {

                const match = value.match(/\((\d+)\)/);

                if (match) {

                    profile.age = Number(match[1]);

                }

                break;

            }

            case "height:":

                profile.height = value;

                break;

            case "foot:":

                profile.foot = value;

                break;

            case "position:":

                profile.position = value;

                break;

            case "citizenship:":

                profile.citizenship = [

                    ...valueNode.querySelectorAll("img")

                ].map(img =>

                    img.alt.trim()

                );

                break;

            case "contract expires:":

                profile.contractExpires = value;

                break;

        }

    }

    return profile;

}

export default parseProfile;