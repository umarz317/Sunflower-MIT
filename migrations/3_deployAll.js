const path = require("path");
const fs = require("fs");

const contractsPath = path.join(__dirname, "../src/contracts");
const files = fs.readdirSync(contractsPath);

const excluded = [
  "Token.sol",
  "Farm.sol",
  "Airdropper.sol",
  "Chickens.sol",
  "Armor.sol",
  "Axe.sol",
];

const token = "0x52e73Ed940fFdC7bA13C8F42467F693AB83f3C4f";
const farm = "0xEAb3827F1cbf9A6C3260d0D1d38f648380b1610f";

console.log("Token Address: ", token);
console.log("Farm Address: ", farm);
var addresses = {"Token": token, "Farm": farm};

module.exports = async function (deployer) {
  for (let file of files) {
    if (path.extname(file) === ".sol" && !excluded.includes(file)) {
      console.log(path.basename(file).split(".")[0]);
      const contract = artifacts.require(
        path.basename(file).split(".")[0]
      );
      await deployer.deploy(contract);
      console.log(`${contract.contractName} deployed: `, contract.address);
      addresses[contract.contractName] = contract.address;
    }
  }
  const egg = artifacts.require("Egg");
  const chicken = artifacts.require("Chicken");
  await deployer.deploy(egg, farm);
  console.log(`${egg.contractName} deployed: `, egg.address);
  await deployer.deploy(chicken, addresses["ChickenCoop"], egg.address);
  addresses[egg.contractName] = egg.address;
  addresses[chicken.contractName] = chicken.address;
  console.log(addresses);
};
