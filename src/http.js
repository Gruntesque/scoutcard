/**
 * ScoutCard
 * HTTP helper
 */

function send(method, url, options = {}) {

    return new Promise((resolve, reject) => {

        if (typeof GM_xmlhttpRequest !== "function") {

            reject(
                new Error(
                    "GM_xmlhttpRequest is not available."
                )
            );

            return;

        }

        GM_xmlhttpRequest({

            method,

            url,

            headers: options.headers || {},

            data: options.body,

            timeout: options.timeout || 30000,

            responseType: options.responseType || "text",

            anonymous: true,

            onload(response) {

                if (
                    response.status >= 200 &&
                    response.status < 300
                ) {

                    resolve(response);

                    return;

                }

                reject(
                    new Error(
                        `HTTP ${response.status} (${url})`
                    )
                );

            },

            onerror(error) {

                reject(error);

            },

            ontimeout() {

                reject(
                    new Error(
                        `Timeout (${url})`
                    )
                );

            }

        });

    });

}

export async function get(url, options = {}) {

    const response = await send(

        "GET",

        url,

        options

    );

    return response.responseText;

}

export async function post(url, body, options = {}) {

    const response = await send(

        "POST",

        url,

        {

            ...options,

            body

        }

    );

    return response.responseText;

}

export async function getJSON(url, options = {}) {

    return JSON.parse(

        await get(

            url,

            options

        )

    );

}

export async function postJSON(url, body, options = {}) {

    return JSON.parse(

        await post(

            url,

            body,

            options

        )

    );

}

export default {

    get,

    post,

    getJSON,

    postJSON

};