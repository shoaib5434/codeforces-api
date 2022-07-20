let express = require('express');
let app = express();
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