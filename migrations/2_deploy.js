const Token = artifacts.require("TokenV2");
const farm = artifacts.require("FarmV2");

module.exports = async function (deployer) {
  //deploy Token
  await deployer.deploy(Token);

  //assign token into variable to get it's address
  const token = await Token.deployed();
  //pass token address for contract(for future minting)
  await deployer.deploy(farm, token.address);
  //assign contract into variable to get it's address
  const farmContract = await farm.deployed();
  //change token's owner/minter from deployer to farm
  await token.passMinterRole(farmContract.address);
  console.log("Token address:", token.address);
  console.log("Farm address:", farmContract.address);
};
