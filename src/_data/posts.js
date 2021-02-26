const axios = require('axios');

module.exports = async function() {
    const postsURL = 'http://cms.semeia.io/wp-json/mejlak/v1/posts';

    const response = await axios.get(postsURL);
    return response.data;
}
