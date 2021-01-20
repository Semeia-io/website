const axios = require('axios');

module.exports = async function() {
    const postsURL = 'https://semeia.reachadvertising.biz/wp-json/mejlak/v1/posts';

    const response = await axios.get(postsURL);
    return response.data;
}
