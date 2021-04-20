const axios = require("axios");

module.exports = async function() {
	const vacanciesURL = "https://cms.semeia.io/wp-json/mejlak/v1/vacancies";
	const response = await axios.get(vacanciesURL);
	return response.data;
}
