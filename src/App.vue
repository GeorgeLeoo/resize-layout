<template>
  <div id="app" class="test">
    <div class="box">
      <div class="header">App.vue--vue-demo</div>
      <ResizeLayout :resizeBarThick="1" style="height: calc(100vh - 40px);">
        <ResizeCol width="240px">
          <div class="left">
            <ul>
              <li v-for="item in menu" :key="item">{{ item }}</li>
            </ul>
          </div>
        </ResizeCol>
        <ResizeCol>
          <div class="right">
            <ResizeLayout :resizeBarThick="1">
              <ResizeRow>
                <div class="right-top">
                  <div class="top-main">
                    <div class="top-tab">
                      <span>App.vue</span>
                      <span>index.js</span>
                      <span>index.html</span>
                      <span>ResizeCol.vue</span>
                      <span>ResizeLayout.vue</span>
                    </div>
                    <div class="structure">
                      <span>src > App.vue > tempate > div#app.test</span>
                    </div>
                  </div>
                  <div class="main clearfix">
                    <div class="fl line-number">
                      <ul>
                        <li v-for="i in 100" :key="i">{{ i }}</li>
                      </ul>
                    </div>
                    <div class="fl">
                      <textarea v-model="value" name="" id=""></textarea>
                    </div>
                  </div>
                </div>
              </ResizeRow>
              <ResizeRow ref="bottom" height="200px" class="right-bottom">
                <div class="tab">
                  <span>TERMINAL</span>
                  <span>PROBLEMS</span>
                  <span>OUTPUT</span>
                  <span>DEBUG CONSOLE</span>
                </div>
              </ResizeRow>
            </ResizeLayout>
          </div>
        </ResizeCol>
      </ResizeLayout>
    </div>
  </div>
</template>

<script>
import { ResizeLayout, ResizeCol, ResizeRow } from '../packages/ResizeLayout'

export default {
  components: {
    ResizeLayout,
    ResizeCol,
    ResizeRow
  },
  data () {
    return {
      menu: ['ResizeLayout', 'node_modules', 'public', 'src', 'package.json'],
      value: '// this is code'
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  user-select: none;
  background: #1f2428;
  .clearfix::after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
  .box {
    height: 100vh;
    .header {
      background: #2b2a2a;
      color: #6c6b6b;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-weight: bold;
    }
    .left {
      background: #1f2428;
      height: calc(100vh - 40px);
      color: #d1d5da;
      padding: 10px;
      border-right: 1px solid #1b1f23;
      li {
        line-height: 32px;
      }
    }
    .right {
      height: calc(100vh - 40px);
      .top-main {
        position: sticky;
        top: 0;
      }
      .right-top {
        background: #24292e;
        .top-tab {
          border-bottom: 1px solid #1b1f23;
          span {
            color: #e1e4e8;
            display: inline-block;
            border-top: 1px solid transparent;
            padding: 0 15px;
            font-size: 14px;
            line-height: 38px;
            cursor: pointer;
            background: #1f2428;
            border-right: 1px solid #1b1f23;
          }
          span:first-child {
            background: #24292e;
            border-top: 1px solid #f9826c;
          }
          span:last-child {
            border-right: 1px solid transparent;
          }
        }
        .structure {
          background: #24292e;
          color: #959da5;
          padding: 0 15px;
          line-height: 28px;
          font-size: 14px;
          box-shadow: 0 3px 3px #1b1f23;
        }
        .main {
          overflow: auto;
          .fl {
            float: left;
          }

          textarea {
            width: 600px;
            height: 1200px;
            background: transparent;
            border: none;
            outline: none;
            padding: 0 15px;
            color: #fff;
            resize: none;
            line-height: 26px;
          }

          .line-number {
            color: #444d56;
            border-right: 1px solid #2f363d;
            li {
              padding: 0 20px;
              text-align: right;
              width: 100%;
              line-height: 26px;
              font-weight: bold;
            }
          }
          .line-number:first-child {
            counter-reset: #e1e4e8;
          }
        }
      }
      .right-bottom {
        background: #1f2428;
        padding: 10px;
        .tab {
          span {
            color: #e1e4e8;
            display: inline-block;
            border-bottom: 1px solid transparent;
            margin: 0 15px;
            font-size: 14px;
            cursor: pointer;
          }
          span:first-child {
            border-bottom: 1px solid #f9826c;
          }
        }
      }
    }
  }
}
</style>
