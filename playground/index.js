var Web3 = require("web3")
var provider = new Web3.providers.HttpProvider("http://localhost:8545")
var contract = require("truffle-contract")
var requireNoCache = require("require-nocache")(module);
// See truffle-schema for more info: https://github.com/trufflesuite/truffle-schema

  // The file ./MyContract.sol.js now exists, which you can
  // import into your project like any other Javascript file.

var accountAddress = "0xbc83c83dab8eb2bd724b8f70946b3eb1758235bb"
var MetaCoin = contract(requireNoCache("../build/contracts/MetaCoin.json"))
var ConvertLib = contract(requireNoCache("../build/contracts/ConvertLib.json"))
MetaCoin.setProvider(provider)
ConvertLib.setProvider(provider)

Promise.all([ConvertLib.deployed(),MetaCoin.deployed()]).then(insts=>{
  let metaCoin = insts[1]
  metaCoin.getBalance.call(accountAddress).then(balance=>{
    console.log(balance)
  }).catch(e=>{
    console.error(e)
  })
}).catch(e=>{
  console.error(e)
})
  
//   MetaCoin.new().then(inst=>{
//     //console.log(inst.getBalance())
//   }).catch(e=>{
//     console.error(e)
//   })
  


