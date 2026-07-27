/**
 * ScoutCard
 * Transfermarkt Ranking
 */


function normalize(text) {

    return (

        text ||

        ""

    )

    .normalize("NFD")

    .replace(
        /[\u0300-\u036f]/g,
        ""
    )

    .toLowerCase()

    .replace(
        /[^a-z0-9 ]/g,
        " "
    )

    .replace(
        /\s+/g,
        " "
    )

    .trim();

}



function nameTokens(text) {

    const value =
        normalize(text);

    if (!value) {

        return [];

    }

    return value
        .split(" ")
        .filter(Boolean);

}



function nameScore(query, candidate) {


    const q =
        normalize(query);


    const c =
        normalize(candidate);



    if (!q || !c) {

        return 0;

    }



    // Nome exatamente igual

    if (q === c) {

        return 100;

    }



    // Nome começa com a busca

    if (c.startsWith(q)) {

        return 80;

    }



    const queryTokens =
        nameTokens(q);


    const candidateTokens =
        nameTokens(c);



    let matched = 0;



    for (const token of queryTokens) {

        if (
            candidateTokens.includes(token)
        ) {

            matched++;

        }

    }



    // Todas as palavras aparecem

    if (
        matched === queryTokens.length
    ) {

        return 70;

    }



    // Uma palavra apenas

    if (
        matched === 1
    ) {

        return 25;

    }



    return 0;

}



function activityScore(player) {


    let score = 0;



    if (player.currentClub) {

        score += 20;

    }



    if (player.positionGroup) {

        score += 10;

    }



    return score;

}



export function rankTransfermarktResults(

    query,

    players = []

) {


    const seen =
        new Set();



    return players

        .filter(player => {


            if (!player.id) {

                return false;

            }


            if (seen.has(player.id)) {

                return false;

            }


            seen.add(player.id);


            return true;


        })


        .map(player => {


            const name =
                nameScore(
                    query,
                    player.name
                );


            return {

                player,

                nameScore: name,

                score:

                    name +

                    activityScore(
                        player
                    )

            };


        })


        .sort(

            (a, b) => {


                // Nome exato sempre vence

                if (
                    b.nameScore !== a.nameScore
                ) {

                    return (
                        b.nameScore -
                        a.nameScore
                    );

                }


                return (
                    b.score -
                    a.score
                );


            }

        );

}



export function isConfidentMatch(

    results

) {


    if (!results.length) {

        return false;

    }



    const first =
        results[0];



    /*
    
    Nome exatamente igual:
    abre direto.

    */

    if (
        first.nameScore === 100
    ) {

        return true;

    }



    const second =
        results[1];



    if (!second) {

        return (
            first.nameScore >= 80
        );

    }



    return (

        first.nameScore >= 80 &&

        first.score - second.score >= 40

    );

}