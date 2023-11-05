
require('dotenv').config({
    path: '.env'
})

jest.mock('./test/helpers/getEnviroments',()=>({
    getEnviroments: () => ({...process.env})
}))