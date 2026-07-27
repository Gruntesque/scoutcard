/**
 * ScoutCard
 * Image Loader
 */


const imageCache = new Map();



export async function loadExternalImage(url) {


    if (!url) {

        return "";

    }



    if (

        imageCache.has(url)

    ) {

        return imageCache.get(url);

    }



    return new Promise(resolve => {


        GM_xmlhttpRequest({

            method: "GET",

            url,

            responseType: "blob",

            anonymous: true,


            onload(response) {


                try {


                    const blobUrl =

                        URL.createObjectURL(

                            response.response

                        );



                    imageCache.set(

                        url,

                        blobUrl

                    );



                    resolve(

                        blobUrl

                    );


                }

                catch(error) {


                    console.warn(

                        "[ScoutCard] Image conversion failed:",

                        error

                    );


                    resolve("");

                }


            },


            onerror(error) {


                console.warn(

                    "[ScoutCard] Image request failed:",

                    error

                );


                resolve("");

            }


        });


    });


}



export default loadExternalImage;