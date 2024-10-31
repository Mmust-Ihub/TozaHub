import { catchAsync } from "../utils/catchAsync.js";


const helloWorld = catchAsync(async(req, res) => {
    return res.status(200).json({"message": "api is up and running ..."})
})

const createWallet = catchAsync(async(req, res) => {
    const data = req.body
    console.log(`The wallet data: ${data}`)
    return res.status(200).json(data)
})

export default { helloWorld, createWallet }