// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Tick {
    address staker;
    uint256 amount;
}

contract Energy is ERC20, Ownable {

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    IERC20 public keylink;

    Tick[] public ticks;
    
    constructor(IERC20 _keylink, IERC20 _usdt) ERC20("Energy", "ENG") Ownable(msg.sender) {
        keylink = _keylink;
    }

    //关闭交易功能
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(false, "Trading is disabled");
        return super.transfer(recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(false, "Trading is disabled");
        return super.transferFrom(sender, recipient, amount);
    }

    //质押
    function mint(uint256 _amount) public {

        //接收Keylink
        require(keylink.balanceOf(msg.sender) >= _amount, "Insufficient Keylink balance");
        keylink.transferFrom(msg.sender, address(this), _amount);

        //铸造Energy
        _mint(msg.sender, _amount);

        //记录
        
        emit Staked(msg.sender, _amount);
    }

    //解押
    function burn(uint256 _amount) public {

        //销毁Energy
        require(balanceOf(msg.sender) >= _amount, "Insufficient Energy balance");
        _burn(msg.sender, _amount);

        //转移Keylink
        keylink.transfer(msg.sender, _amount);

        emit Unstaked(msg.sender, _amount);
    }

}