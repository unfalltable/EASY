const express = require("express");
const passport = require("passport");
const { ethers } = require("ethers");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { HttpsProxyAgent } = require("https-proxy-agent");

const { connectDB } = require("../utils/db_connect");
const { getNowFormatDate } = require("../utils/index");

const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const HTTP_PROXY = process.env.HTTP_PROXY;

const gStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8096/api/OAuth/google/callback", // OAuth 认证回调地址
    proxy: true,
  },
  function (accessToken, refreshToken, profile, done) {
    handleOAuthCallback(accessToken, refreshToken, profile, done);
  }
);

//设置proxy
const agent = new HttpsProxyAgent(HTTP_PROXY);
gStrategy._oauth2.setAgent(agent);

passport.use(gStrategy);

function handleOAuthCallback(accessToken, refreshToken, profile, done) {
  done(null, profile);
}

// 谷歌 OAuth 认证
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 谷歌 OAuth 认证回调
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      // 从 OAuth 认证中获取用户信息，例如用户的 Google ID、邮箱等
      const googleUserId = req.user.id;
      const userEmail = req.user.emails[0].value;

      // 生成以太坊钱包
      const wallet = ethers.Wallet.createRandom();
      const walletAddress = wallet.address;
      const privateKey = wallet.privateKey;

      res.redirect(`http://localhost:3075/?OAuth=google`);
    } catch (error) {
      console.error("Error in Google OAuth callback:", error);
      res.status(500).json({
        code: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
