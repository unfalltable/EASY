// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LinearVesting is ERC20, Ownable {
    using SafeMath for uint256;

    struct VestingSchedule {
        uint256 totalAmount;
        uint256 releasedAmount;
        uint256 startTime;
        uint256 endTime;
    }

    mapping(address => VestingSchedule) public vestingSchedules;
    address public recoveryAddress;
    uint256 public constant VESTING_DURATION = 30 years;

    event TokensReleased(address beneficiary, uint256 amount);
    event TokensRecovered(uint256 amount);

    constructor(string memory name, string memory symbol, address _recoveryAddress) ERC20(name, symbol) {
        recoveryAddress = _recoveryAddress;
    }

    function createVestingSchedule(address beneficiary, uint256 amount) external onlyOwner {
        require(vestingSchedules[beneficiary].totalAmount == 0, "Vesting schedule already exists for this beneficiary");
        require(amount > 0, "Amount must be greater than 0");

        vestingSchedules[beneficiary] = VestingSchedule({
            totalAmount: amount,
            releasedAmount: 0,
            startTime: block.timestamp,
            endTime: block.timestamp + VESTING_DURATION
        });

        _mint(address(this), amount);
    }

    function release() external {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.totalAmount > 0, "No vesting schedule found");
        require(block.timestamp >= schedule.startTime, "Vesting period has not started");

        uint256 unreleased = releasableAmount(schedule);
        require(unreleased > 0, "No tokens are due for release");

        schedule.releasedAmount = schedule.releasedAmount.add(unreleased);
        _transfer(address(this), msg.sender, unreleased);

        emit TokensReleased(msg.sender, unreleased);
    }

    function releasableAmount(VestingSchedule storage schedule) internal view returns (uint256) {
        if (block.timestamp >= schedule.endTime) {
            return schedule.totalAmount.sub(schedule.releasedAmount);
        } else {
            uint256 elapsedTime = block.timestamp.sub(schedule.startTime);
            uint256 vestedAmount = schedule.totalAmount.mul(elapsedTime).div(VESTING_DURATION);
            return vestedAmount.sub(schedule.releasedAmount);
        }
    }

    function recoverUnclaimedTokens() external onlyOwner {
        uint256 unreleased = balanceOf(address(this));
        require(unreleased > 0, "No unclaimed tokens to recover");

        _transfer(address(this), recoveryAddress, unreleased);

        emit TokensRecovered(unreleased);
    }
}
