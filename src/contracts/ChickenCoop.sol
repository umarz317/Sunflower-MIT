// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChickenCoop is ERC721, Ownable {
    address public minter;
    uint public totalsupply;

    constructor() public ERC721("Sunflower Farmers Chicken Coop", "SFCC") {
        minter = msg.sender;
        _setBaseURI("https://sunflower-farmers.com/play/nfts/chicken-coop/metadata");
    }

    function passMinterRole(address farm) public returns (bool) {
        require(msg.sender==minter, "You are not minter");
        minter = farm;

        return true;
    }

    // function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    //     require(tokenId <= 2000, "Token ID is not valid");

    //     return "https://sunflower-farmers.com/play/nfts/chicken-coop/metadata";
    // }


    function mint(address account, uint256 amount) public {
        require(amount == 1);
        require(msg.sender == minter, "You are not the minter");
        require(totalsupply < 2000, "Only 2000 coops can be minted");
        require(balanceOf(account) < 1 || account == minter, "A farm can only have 1 chicken coop");

        uint256 tokenId = totalsupply + 1;
        _mint(account, tokenId);

        totalsupply = totalsupply + 1;
	}
}