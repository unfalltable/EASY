// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Keylink is ERC20 {

    constructor() ERC20("Keylink", "KL") {
        _mint(msg.sender, 809900000000 * 10 ** decimals());
    }
    
}
