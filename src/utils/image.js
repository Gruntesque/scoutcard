/**
 * ScoutCard
 * Image Loader
 */

const imageCache = new Map();
const SAMPLE_SIZE = 20;
const CORNER_SIZE = 3;

function averageCorner(data, startX, startY) {

    const color = { r: 0, g: 0, b: 0, a: 0 };

    for (let y = startY; y < startY + CORNER_SIZE; y++) {
        for (let x = startX; x < startX + CORNER_SIZE; x++) {
            const index = (y * SAMPLE_SIZE + x) * 4;
            color.r += data[index];
            color.g += data[index + 1];
            color.b += data[index + 2];
            color.a += data[index + 3];
        }
    }

    const count = CORNER_SIZE * CORNER_SIZE;

    return {
        r: color.r / count,
        g: color.g / count,
        b: color.b / count,
        a: color.a / count
    };

}

function colorDistance(a, b) {

    return Math.hypot(
        a.r - b.r,
        a.g - b.g,
        a.b - b.b
    );

}

function colorChroma(color) {

    return Math.max(color.r, color.g, color.b) -
        Math.min(color.r, color.g, color.b);

}

function dominantEdgeColor(data) {

    const buckets = new Map();

    for (let y = 0; y < SAMPLE_SIZE; y++) {
        for (let x = 0; x < SAMPLE_SIZE; x++) {

            if (x && y && x < SAMPLE_SIZE - 1 && y < SAMPLE_SIZE - 1) {
                continue;
            }

            const index = (y * SAMPLE_SIZE + x) * 4;

            if (data[index + 3] < 224) {
                continue;
            }

            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const key = [r, g, b].map(value =>
                Math.floor(value / 32)
            ).join(":");
            const bucket = buckets.get(key) ?? {
                r: 0,
                g: 0,
                b: 0,
                count: 0
            };

            bucket.r += r;
            bucket.g += g;
            bucket.b += b;
            bucket.count++;
            buckets.set(key, bucket);

        }
    }

    const dominant = [...buckets.values()]
        .sort((a, b) => b.count - a.count)[0];

    if (!dominant) {
        return "";
    }

    return `rgb(${Math.round(dominant.r / dominant.count)},${Math.round(dominant.g / dominant.count)},${Math.round(dominant.b / dominant.count)})`;

}

function classifyImageBackground(data) {

    const edge = SAMPLE_SIZE - CORNER_SIZE;
    const corners = [
        averageCorner(data, 0, 0),
        averageCorner(data, edge, 0),
        averageCorner(data, 0, edge),
        averageCorner(data, edge, edge)
    ];

    if (corners.every(corner => corner.a < 32)) {
        return { background: "transparent", color: "" };
    }

    if (corners.every(corner =>
        corner.a > 224 &&
        corner.r > 220 &&
        corner.g > 220 &&
        corner.b > 220 &&
        colorChroma(corner) < 36
    )) {
        return { background: "white", color: "" };
    }

    const color = dominantEdgeColor(data);

    if (corners.every(corner => colorChroma(corner) < 42)) {
        return { background: "solid", color };
    }

    const maxDistance = Math.max(
        ...corners.flatMap((corner, index) =>
            corners.slice(index + 1).map(other =>
                colorDistance(corner, other)
            )
        )
    );

    return {
        background: maxDistance > 100 ? "field" : "solid",
        color
    };

}

function analyzeImageBackground(url) {

    return new Promise(resolve => {

        const image = new Image();

        image.onload = () => {

            try {

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d", {
                    willReadFrequently: true
                });

                canvas.width = SAMPLE_SIZE;
                canvas.height = SAMPLE_SIZE;

                context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

                resolve(
                    classifyImageBackground(
                        context.getImageData(
                            0,
                            0,
                            SAMPLE_SIZE,
                            SAMPLE_SIZE
                        ).data
                    )
                );

            } catch(error) {

                console.warn(
                    "[ScoutCard] Image analysis failed:",
                    error
                );

                resolve({ background: "unknown", color: "" });

            }

        };

        image.onerror = () => resolve({ background: "unknown", color: "" });
        image.src = url;

    });

}

export async function loadExternalImageAsset(url) {

    if (!url) {

        return { url: "", background: "unknown", color: "" };

    }

    if (url.startsWith("data:")) {

        return { url, background: "transparent", color: "" };

    }

    if (imageCache.has(url)) {

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

                    const blobUrl = URL.createObjectURL(response.response);

                    analyzeImageBackground(blobUrl).then(analysis => {

                        const asset = { url: blobUrl, ...analysis };

                        imageCache.set(url, asset);
                        resolve(asset);

                    });

                } catch(error) {

                    console.warn(
                        "[ScoutCard] Image conversion failed:",
                        error
                    );

                    resolve({ url: "", background: "unknown", color: "" });

                }

            },

            onerror(error) {

                console.warn(
                    "[ScoutCard] Image request failed:",
                    error
                );

                resolve({ url: "", background: "unknown", color: "" });

            }

        });

    });

}

export async function loadExternalImage(url) {

    return (await loadExternalImageAsset(url)).url;

}

export default loadExternalImage;
