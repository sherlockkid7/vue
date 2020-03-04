// 天气接口
// 请求地址：http://wthrcdn.etouch.cn/weather_mini
// 请求方法：get
// 请求参数：city（查询的城市名）
// 响应内容：天气信息

// 查询天气应用
// 1.回车查询：按下回车（v-on，.enter）
// 查询数据（axios 接口 v-model）
// 渲染数据（v-for 数组 that)
// 2.点击查询：自定义参数可以让代码的复用性更高
// method中定义的方法内部，可以通过this关键字点出其它方法


var app = new Vue({
    el: "#app",
    data: {
        city: '',
        weatherList: []
    },
    methods: {
        searchWeather: function() {
            // console.log('天气查询');
            // console.log(this.city);
            // 回调函数中this指向改变，保存this
            var that = this;
            // 调用接口
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city)
                .then(function(response) {
                    // console.log(response);
                    // console.log(response.data.data.forecast);
                    that.weatherList = response.data.data.forecast;
                })
                .catch(function(err) {})
        },
        handleClick: function(city) {
            this.city = city;
            this.searchWeather();
        }

    }

})