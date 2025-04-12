<template>
  <footer class="layout-footer">
    <div class="footer-main">
      <div class="footer-view">
        <div class="logo-item">
          <div class="logo">
            <el-image class="img" :src="logoUrl" fit="cover" />
          </div>
          <div class="name">Easi DAO</div>
        </div>
      </div>
      <div class="footer-view">
        <div class="about-item">
          <div class="title">About Us</div>
          <div class="media-list">
            <div class="media-item">
              <div class="media-logo">
                <el-image class="img" :src="Twitter" fit="cover" />
              </div>
              <div class="media-name">Twitter</div>
            </div>
            <div class="media-item">
              <div class="media-logo">
                <el-image class="img" :src="Telegram" fit="cover" />
              </div>
              <div class="media-name">Telegram</div>
            </div>
            <div class="media-item">
              <div class="media-logo">
                <el-image class="img" :src="Discord" fit="cover" />
              </div>
              <div class="media-name">Discord</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-view">
        <div class="help-item">
          <div class="title">Need Help?</div>
          <div class="help-list">
            <div class="desc">Help Center</div>
            <div class="desc">Contact Us</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-tip">© 2024 by Easi DAO. All rights reserved!</div>
  </footer>
</template>

<script setup>
import { i18n } from "@/i18n"
import { watch, ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"

import logoUrl from "@/assets/layouts/logo.jpg"
import Twitter from "@/assets/images/icons/Twitter.png"
import Telegram from "@/assets/images/icons/telegram.png"
import Discord from "@/assets/images/icons/discord.png"

const router = useRouter()

const lang = ref(i18n.global.locale)

watch(
  () => i18n.global.locale,
  (newVal) => {
    lang.value = newVal ? newVal : "zh"
  }
)
</script>

<style lang="scss" scoped>
.layout-footer {
  background: #333333;

  .footer-main {
    min-height: 300px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 50px;

    padding: 70px 0;

    .footer-view {
      display: flex;
      justify-content: space-between;

      .logo-item {
        display: flex;
        align-items: center;
        gap: 20px;

        .logo {
          border-radius: 50%;
          overflow: hidden;

          .img {
            width: 100px;
            height: 100px;
          }
        }

        .name {
          color: #ffffff;
          font-size: 32px;
          font-weight: 600;

          text-transform: uppercase;
        }
      }

      .about-item {
        .title {
          color: #ffffff;
          font-size: 24px;
          font-weight: 600;

          text-transform: uppercase;
        }

        .media-list {
          display: flex;
          gap: 25px;
          margin-top: 20px;

          .media-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            cursor: pointer;

            .media-logo {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }

            .media-name {
              color: #ffffff;
              font-size: 16px;
            }

            &:hover {
              .media-name {
                text-decoration: underline;
              }
            }
          }
        }
      }

      .help-item {
        .title {
          color: #ffffff;
          font-size: 24px;
          font-weight: 600;

          text-transform: uppercase;
        }

        .help-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;

          .desc {
            color: #ffffff;
            font-size: 16px;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .footer-tip {
    color: #ffffff;
    text-align: center;
    padding: 10px 0;
  }
}

@media (max-width: 1320px) {
}
@media (max-width: 1024px) {
}
@media (max-width: 820px) {
}
@media (max-width: 768px) {
}
@media (max-width: 576px) {
}
@media (max-width: 480px) {
}
@media (max-width: 390px) {
}
</style>
