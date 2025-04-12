// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Tick } from "./libraries/Struct.sol";
import { Energy } from "./Energy.sol";




contract Distribute {
    Energy public energy;
    IERC20 public usdt;
    uint256 public lastExecuted;
    uint256 public stakeDays;
    

    event USDTDeposited(address indexed user, uint256 amount);
    event DistributeDailyFee(address indexed user, uint256 amount);

    constructor(address _energy, address _usdt) {
        energy = Energy(_energy);
        usdt = IERC20(_usdt);
        lastExecuted = 0;
    }

    //存入USDT
    function depositUSDT(uint256 _amount) public {
        require(usdt.transferFrom(msg.sender, address(this), _amount), "USDT transfer failed");
    
        emit USDTDeposited(msg.sender, _amount);
    }

    //分发每日USDT
    function distributeDailyFeeByUser() public {
        // 获取当前时间的小时、分钟、日期（北京时间）
        uint256 currentHour = (block.timestamp / 60 / 60 + 8) % 24; // UTC+8
        uint256 currentMinute = (block.timestamp / 60) % 60;
        uint256 currentDay = block.timestamp / 1 days;
        uint256 lastExecutedDay = lastExecuted / 1 days;

        // 检查是否为中午十二点到十二点半之间
        require(currentHour == 12 && currentMinute < 30, "Function can only be executed between 12:00 PM and 12:30 PM Beijing time");
        
        //检查今天是否领取过了
        require(currentDay > lastExecutedDay, "Function can only be executed once a day");

        Tick[] memory ticks = energy.getStakes(msg.sender);
        uint256 len = ticks.length;

        //计算份额
        uint256 userShare = usdt.balanceOf(address(this)) / energy.totalSupply();
        uint256 totalEarn = 0;

        for (uint256 i = 0; i < len; i++) {
            //检查质押日期是否在三天前，并且当前日期是否是第四天或之后
            uint256 stakeDay = ticks[i].timestamp / 1 days;

            if(currentDay >= stakeDay + 3){
                address account = ticks[i].staker;
                uint256 value =  userShare * ticks[i].amount;
                totalEarn += value;
                usdt.transfer(account, value);

            }
        }
        lastExecuted = block.timestamp;

        emit DistributeDailyFee(msg.sender, totalEarn);
    }

}