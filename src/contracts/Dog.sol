// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dog is ERC721, Ownable {
    address public minter;
    uint public totalsupply;

    constructor() public ERC721("Sunflower Farmers Dog", "SFD") {
        minter = msg.sender;
        _setBaseURI("https://sunflower-farmers.com/play/nfts/dog/metadata");
    }

    function passMinterRole(address farm) public returns (bool) {
        require(msg.sender==minter, "You are not minter");
        minter = farm;

        return true;
    }

    // function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    //     require(tokenId <= 500);

    //     return "https://sunflower-farmers.com/play/nfts/dog/metadata";
    // }


    function mint(address account, uint256 amount) public {
        require(amount == 1);
        require(msg.sender == minter, "You are not the minter");
        require(totalsupply < 500, "Only 500 dogs can be minted");

        uint256 tokenId = totalsupply + 1;
        _mint(account, tokenId);

        totalsupply = totalsupply + 1;
	}
}