var Web3 = require("web3")
var provider = new Web3.providers.HttpProvider("http://localhost:8545")
var contract = require("truffle-contract")
var requireNoCache = require("require-nocache")(module);
// See truffle-schema for more info: https://github.com/trufflesuite/truffle-schema

  // The file ./MyContract.sol.js now exists, which you can
  // import into your project like any other Javascript file.

let accountAddress_A = "0x5dffdafaf4f57f7679df276196b2a8c61d21ca45",
    accountAddress_B = "0x30ed7f72b72f73ee9013c2711d572f36e6e4f599"

var MetaCoin = contract(requireNoCache("../build/contracts/MetaCoin.json"))
var ConvertLib = contract(requireNoCache("../build/contracts/ConvertLib.json"))
MetaCoin.setProvider(provider)
ConvertLib.setProvider(provider)


async function getBalance(address){
  let convertLib = await ConvertLib.deployed(),
      metaCoin = await MetaCoin.deployed()

  return await metaCoin.getBalance.call(address)
}

async function sendCoinFrom(A,toB){
  let convertLib = await ConvertLib.deployed(),
      metaCoin = await MetaCoin.deployed()
  return metaCoin.sendCoin(toB, 1000, {from:A})
}

async function main(){
  let balanceA = await getBalance(accountAddress_A)
  let balanceB = await getBalance(accountAddress_B)
  console.log(balanceA)
  console.log(balanceB)

  await sendCoinFrom(accountAddress_A, accountAddress_B)

  balanceA = await getBalance(accountAddress_A)
  balanceB = await getBalance(accountAddress_B)

  console.log(balanceA)
  console.log(balanceB)
}

main().then(res=>{
  console.log("success")
}).catch(e=>{
  console.error(e)
})
// Promise.all([ConvertLib.deployed(),MetaCoin.deployed()]).then(insts=>{
//   let metaCoin = insts[1]
//   metaCoin.getBalance.call(accountAddress_A).then(balance=>{
//     console.log(balance)
//     metaCoin.sendCoin(accountAddress_B,100,{from:accountAddress_A}).then()
//   }).catch(e=>{
//     console.error(e)
//   })
// }).catch(e=>{
//   console.error(e)
// })
  
//   MetaCoin.new().then(inst=>{
//     //console.log(inst.getBalance())
//   }).catch(e=>{
//     console.error(e)
//   })
  


