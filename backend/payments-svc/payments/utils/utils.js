import _ from "lodash"

export const blockList = (initialObj, arrayToblock) => {
    return _.omit(initialObj, arrayToblock)
}
export const allowList = (initialObj, arrayToAllow) => {
    return _.pick(initialObj, arrayToAllow)
}

// const sleep = async(ms) => {
//   return await new Promise(resolve => setTimeout(resolve, ms))
// }
// for(let i=0; i<3; i++){
//   console.log(`Waiting ${i} seconds...`);
//   await sleep(i * 1000);
// }