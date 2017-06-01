var Web3 = require("web3")
var provider = new Web3.providers.HttpProvider("http://localhost:8545")
var contract = require("truffle-contract")
var requireNoCache = require("require-nocache")(module);
// See truffle-schema for more info: https://github.com/trufflesuite/truffle-schema

  // The file ./MyContract.sol.js now exists, which you can
  // import into your project like any other Javascript file.

var accountAddress = "0xda1457e1ab119b0a9531fc6454aa7bbd4b2d1c54"
var MetaCoin = contract(requireNoCache("../contract/MetaCoin.json"))
var ConvertLib = contract(requireNoCache("../contract/ConvertLib.json"))
MetaCoin.setProvider(provider)
ConvertLib.setProvider(provider)
ConvertLib.at(accountAddress).then(lib=>{
  MetaCoin.at(accountAddress).then(metaCoin=>{
    metaCoin.getBalance.call(accountAddress).then(res=>{
      console.log(res)
    }).catch(e=>{
      console.error(e)
    })
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
  


