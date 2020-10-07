const axios = require("axios");

module.exports = async function() {
	const vacanciesURL = "http://localhost/semeia/wp-json/mejlak/v1/vacancies";

	const response = await axios.get(vacanciesURL);
	return response.data;
}
