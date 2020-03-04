// 歌曲搜索接口
// 请求地址：
// https://autumnfish.cn/search
// 请求方法：get
// 请求参数：keywords(查询的关键词)
// 响应内容：歌曲搜索结果

// 歌曲URL获取
// 请求地址：
// https://autumnfish.cn/song/url
// 请求方法：get
// 请求参数：id（歌曲id）
// 响应内容：歌曲的url地址

// 歌曲详情获取
// 请求地址：
// https://autumnfish.cn/song/detail
// 请求方法：get
// 请求参数：id（歌曲id）
// 响应内容：歌曲详情，包含封面信息


// 热门评论获取
// 请求地址：
// https://autumnfish.cn/comment/hot?type=0
// 请求方法：get
// 请求参数：id(歌曲ID，type固定为0)
// 响应内容：歌曲的热门评论

// mv地址获取
// 请求地址：
//https://autumnfish.cn/mv/url
//请求方法：get
// 请求参数：id(mvid,为0说明没有MV)
// 响应内容：url的地址

var vm = new Vue({
    el: "#app",
    data: {
        // 查询关键词
        query: "",
        // 歌曲数组
        musicList: [],
        // 歌曲地址
        musicUrl: "",
        // 歌曲图片
        musicCover: "",
        // 歌曲信息
        musicTxt: "",
        musicSinger: "",
        musicEdi: "",
        // 歌曲评论
        musicComments: [],
        //动画播放状态
        isPlaying: false,
        //歌曲视频地址
        mvUrl: "",
        // 视频播放状态
        isShow: false


    },
    methods: {
        // 歌曲搜索
        searchMusic: function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function(response) {
                    console.log(response);
                    that.musicList = response.data.result.songs;
                    // console.log(response.data.result.songs);
                }, function(err) {})
        },
        // 歌曲播放
        playerMusic: function(musicId) {
            console.log(musicId);
            // 歌曲地址获取
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function(response) {
                    console.log(response.data.data[0].url);
                    that.musicUrl = response.data.data[0].url;

                }, function(err) {})

            // 歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function(response) {
                    console.log(response);
                    that.musicTxt = response.data.songs[0].name;
                    that.musicSinger = response.data.songs[0].ar[0].name;
                    that.musicEdi = response.data.songs[0].al.name;
                    that.musicCover = response.data.songs[0].al.picUrl;
                }, function(err) {})

            // 歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function(response) {
                    // console.log(response);
                    // console.log(response.data.hotComments);
                    that.musicComments = response.data.hotComments;
                }, function(err) {})
        },
        // 播放动画
        play: function() {
            // console.log('play');
            this.isPlaying = true;
        },
        // 暂停动画
        pause: function() {
            // console.log('pause');
            this.isPlaying = false;
        },
        // 视频播放
        mvPlay: function(mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function(response) {
                    // console.log(response);
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                }, function(err) {})
        },
        //关闭视频
        closeMv: function() {
            this.isShow = false;
        }
    }
})

// 使用jquery写的js
// 计算时分秒
// var audio = $("audio").get(0);

// function computTime(time) {
//     var h = Math.floor(time / 3600);
//     var m = Math.floor(time % 3600 / 60);
//     var s = Math.floor(time % 60);
//     return (h < 10 ? '0' + h : h) + ':' (m < 10 ? '0' + m : m) + ':' (s < 10 ? '0' + s : s);
// }

// $(function() {
//     audio.oncanply = function() {
//         var totalTime = computTime(audio.duration);
//         console.log(totalTime);
//         $(".total").html(totalTime);
//     }
// });