const https = require("https");
const querystring = require("querystring");
const zlib = require("zlib");

const API_BASE_URL = "api.showmyhomework.co.uk";
const SATCHELONE = "https://www.satchelone.com"

function makeRequest(method, path, options = {}) {
	var _this = this;
		
	return new Promise(function (resolve, reject) {
		const request_options = {};
	
		request_options.method = method;
		request_options.host = options.host || API_BASE_URL;
		request_options.path = path;
		request_options.port = options.port || 443;
		
		if (options.query) {
			for (let i in options.query) {
				if (Array.isArray(options.query[i])) {
					options.query[i + "[]"] = options.query[i];
					delete options.query[i];
				}
			}

			request_options.path += "?" + querystring.stringify(options.query);
		}
		
		const post_data = querystring.stringify(options.body || {});
		
		request_options.headers = {
			"accept": "application/smhw.v3+json",
			"accept-encoding": "gzip, deflate, br",
			"accept-language": "en-GB,en;q=0.9,es-GB;q=0.8,es;q=0.7,en-US;q=0.6",
			"origin": SATCHELONE,
			"referer": SATCHELONE + (options.referer || "/login"),
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "cross-site",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36",
			
			...options.headers
		}
		
		if (options.body) {
			request_options.headers["Content-Type"] = "application/x-www-form-urlencoded";
			request_options.headers["Content-Length"] = Buffer.byteLength(post_data);
		}
		
		if (options.payload) {
			request_options.headers["Content-Type"] = "application/json; charset=UTF-8";
			request_options.headers["Content-Length"] = Buffer.byteLength(JSON.stringify(options.payload));
		}
		
		const post_req = https.request(request_options, function (res) {
			let chunks = [];
			
			if (res.headers["content-encoding"] === "gzip") {
				var unzip = res.pipe(zlib.createGunzip());
				
				unzip.on("data", function (data) {
					chunks.push(data);
				});

				unzip.on("end", () => {
					const buf = chunks.join("");
					
					try {
						resolve(JSON.parse(buf));
					} catch {
						resolve(buf);
					}
				});
			} else {
				res.on("data", function (data) {
					chunks.push(data);
				});

				res.on("end", () => {
					const buf = chunks.join("");
					
					try {
						resolve(JSON.parse(buf));
					} catch {
						resolve(buf);
					}
				});
			}
		});
		
		if (options.body)
			post_req.write(post_data);
		
		if (options.payload)
			post_req.write(JSON.stringify(options.payload));
		
		post_req.end();
	});
}

module.exports = {
	make: makeRequest
}