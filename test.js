const https = require('https');
async function test(event = {}) {
    const { method, host, path, body, port } = event;
    // const options = {method, host, path, body, port,
        // json: true // Automatically stringifies the body to JSON
    // };
    let result = {};
    try {
        result = await request();
        console.log('result handler =',result);
    } catch (error) {
        console.error(`err ->`,error);
    }
    console.log(JSON.stringify(result, undefined, 4));
    const response = { statusCode: 200, body: JSON.stringify(result)};
    return response;
}
function request(options = {}) {
    return new Promise((resolve, reject) => {
        https.get("https://api.brewerydb.com/v2/", resp => {
            let data = '';
            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => {
                console.log('request ->', JSON.parse(data))
                return resolve(data)
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });
}
test();