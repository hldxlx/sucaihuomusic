<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!--recommends有时，才渲染slider。如果不写v-if="recommends.length"，会导致recommends没有时就渲染slider，有错-->
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>

        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.picUrl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.songListDesc"></h2>
                <p class="desc" v-html="item.accessnum"></p>
              </div>
            </li>
          </ul>
        </div>

      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>


  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';
  import {getRecommend,getDiscList} from 'api/recommend';
  import Slider from 'base/slider/slider';
  import {ERR_OK} from 'api/config';
  export default {
    data(){
      return {
        recommends: [],
        discList:[]
      }
    },
    created(){
      setTimeout(()=>{
        this._getRecommend();
      },10)
      this._getDiscList();
    },
    methods:{
        //getRecommend为异步过程
      _getRecommend(){
        getRecommend().then((res) =>{
          if(res.code === ERR_OK){
            this.recommends = res.data.slider;
          }
        })
      },
      _getDiscList(){
        getDiscList().then((res) =>{
          if(res.code === ERR_OK){
            console.log(res.data.songList);
            this.discList = res.data.songList;
            this.discList = this.discList.concat(this.discList);
          }
        })
      },
      loadImage(){
        //只在第一张图片有了之后refresh一次，接下来的图片不用
        if(!this.checkLoaded){
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
      }

    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

