const axios = require('axios');

module.exports = async function() {
    const postsURL = 'https://cms.semeia.io/wp-json/mejlak/v1/posts';

    const response = await axios.get(postsURL);
    return response.data;
}
