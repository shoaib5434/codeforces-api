let Axios = require('axios');
let Pretty = require('pretty');
let Cheerio = require('cheerio');
let express = require('express');
let app = express();

// Request("https://www.tiktok.com/@salikisticsx.___/video/7102065970931436827?is_copy_url=1&is_from_webapp=v1").then(function(html){
// 	let $ = Cheerio.load(html);
// 	console.log(($('video.tiktok-1sm3sg-VideoBasic').attr('src')));
// }).catch(function(err){
// 	console.log(err);
// })


async function getBackResults (requestUrl) {
	return await Axios.get(requestUrl).then(res => res);
}

function getFinalResult() {
	/* URL Setting */
	let ProblemCode = '1692';
	let ProblemNumber = 'G';
	let url = `https://codeforces.com/problemset/problem/${ProblemCode}/${ProblemNumber}`;

	/* Getting Results */

	return getBackResults(url).then(function(html) {

		let $ = Cheerio.load(html.data);
		// console.log($('.problem-statement').html());

		let ProblemConstraints = {};

		ProblemConstraints['title'] = $('.problem-statement .header .title').text().split('. ')[1];
		ProblemConstraints['time-limit'] = parseInt($('.problem-statement .header .time-limit').text().split('test')[1].split(' ')[0]);
		ProblemConstraints['memory-limit'] = parseInt($('.problem-statement .header .memory-limit').text().split('test')[1].split(' ')[0]);

		let Problem = {};

		Problem['constraints'] = ProblemConstraints;

		let ProblemStatment = $('.problem-statement > div:nth-child(2)').html();

		Problem['statment'] = ProblemStatment;

		Problem['input'] = $('.problem-statement > .input-specification').html();
		Problem['output'] = $('.problem-statement > .output-specification').html();

		return Problem;
	}).
	catch(function(err) {
		console.log(err);
	});
}

app.get('/',async(req,res) => {
	getFinalResult().then(result => {
		return res.status(200).json({
			constraints : result.constraints,
			statement : result.statment,
			input : result.input,
			output : result.output,
		});
	})
});

app.listen(3000,() => {
	console.log("Listining..")
})