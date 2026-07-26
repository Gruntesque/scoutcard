/**
 * ScoutCard
 * Player model
 */

export default class Player {

    constructor() {

        this.id = null;

        this.name = "";

        this.avatar = "";

        this.club = "";

        this.clubLogo = "";

        this.position = "";

        this.nationality = "";

        this.age = null;

        this.height = "";

        this.foot = "";

        this.marketValue = "";

        this.contractUntil = "";

        this.l10 = null;

        this.sorare = {

            slug: "",

            score: null

        };

        this.transfermarkt = {

            id: "",

            url: ""

        };

    }

    static fromSorare(data) {

        const player = new Player();

        player.id = data.objectID;

        player.name = data.display_name ?? "";

        player.avatar = data.avatarUrl ?? "";

        player.club =
            data.active_club?.name ??
            "";

        player.position =
            data.position ??
            data.positions?.[0] ??
            "";

        player.nationality =
            data.country?.code ??
            "";

        player.l10 =
            data.status
                ?.last_ten_played_so5_average_score ??
            null;

        player.sorare.slug =
            data.slug ?? "";

        return player;

    }

}