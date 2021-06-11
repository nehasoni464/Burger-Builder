import axios from 'axios'
const instance=axios.create({
    baseURL:'https://burger-bae-default-rtdb.firebaseio.com/'
})

export default instance;