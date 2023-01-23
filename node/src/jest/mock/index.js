
(async () => {
    const axios = require('axios')

    const result = await axios.get('http://webcode.me')
    
    console.log(result.data)
})()
