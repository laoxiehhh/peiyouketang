webpackJsonp([7],{pqEy:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("Dd8w"),i=a.n(e),n=a("tSVZ"),c=a("9rMa"),o={data:function(){return{lessonData:{},buyFlag:null}},created:function(){this.getData()},components:{foot:n.a},computed:i()({},Object(c.c)(["loginKey"])),methods:{handleClick:function(){var t=this;this.loginKey?this.$confirm("是否确认购买?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.handleBuy(),t.$message({type:"success",message:"购买成功！"})}).catch(function(){t.$message({type:"info",message:"已取消购买"})}):this.$router.push("/login")},getData:function(){var t=this,s={courseId:this.courseId};this.$http.post("https://www.easy-mock.com/mock/5afa75091483315259546162/login/quxue/courseInfo.action",s).then(function(s){t.lessonData=s.data.data,console.log(t.lessonData)}).catch(function(t){console.log(t)})},handleBuy:function(){var t=this,s={courseId:this.lessonData.courseId};this.$http.post("https://www.easy-mock.com/mock/5afa75091483315259546162/login/quxue/purchase.action",s).then(function(s){t.buyFlag=s.data.data.key,console.log(t.buyFlag)})}},props:{courseId:{type:String,required:!0}}},l={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"lessons"},[a("div",{staticClass:"lessons-wrap"},[a("div",{staticClass:"lessons-card"},[a("div",{staticClass:"card-left"},[a("div",{staticClass:"card-left-title"},[t._v(t._s(t.lessonData.courseName))]),t._v(" "),a("div",{staticClass:"card-left-time"},[a("span",{staticClass:"iconfont icon-shijianzhongbiao time-icon"}),t._v(" "),a("span",{staticClass:"time-text"},[t._v(t._s(t.lessonData.start)+"-"+t._s(t.lessonData.end))])]),t._v(" "),a("div",{staticClass:"card-des"},[t._v("适合"+t._s(t.lessonData.grade)+" | 全国地区通用")]),t._v(" "),a("div",{staticClass:"card-teacher"},[a("div",{staticClass:"teacher-item"},[t._m(0),t._v(" "),a("span",[t._v(t._s(t.lessonData.teacherName))])]),t._v(" "),a("div",{staticClass:"teacher-item"},[t._m(1),t._v(" "),a("span",[t._v(t._s(t.lessonData.teacherName))])]),t._v(" "),a("div",{staticClass:"teacher-item"},[t._m(2),t._v(" "),a("span",[t._v(t._s(t.lessonData.teacherName))])])])]),t._v(" "),a("div",{staticClass:"card-right"},[a("div",{staticClass:"card-right-price"},[t._v("￥ "),a("span",[t._v(t._s(t.lessonData.costs))])]),t._v(" "),a("div",{staticClass:"card-right-btn"},[a("el-button",{attrs:{type:"text"},on:{click:t.handleClick}},[t._v(t._s(t.loginKey?"立即购买":"请先登录"))])],1)])]),t._v(" "),a("div",{staticClass:"lessons-content"},[a("div",{staticClass:"content-nav"},[t._v("课程大纲")]),t._v(" "),a("div",{staticClass:"content-main"},[a("ul",t._l(t.lessonData.courseItems,function(s,e){return a("li",{key:e,staticClass:"content-item"},[a("span",{staticClass:"item-index"},[t._v(t._s(e))]),t._v(" "),a("span",{staticClass:"item-text"},[t._v(t._s(s.description))])])}))])])]),t._v(" "),a("div",{staticClass:"footer"},[a("foot")],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"img-wrap"},[s("img",{attrs:{src:a("ilNo"),alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"img-wrap"},[s("img",{attrs:{src:a("ilNo"),alt:""}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"img-wrap"},[s("img",{attrs:{src:a("ilNo"),alt:""}})])}]};var r=a("VU/8")(o,l,!1,function(t){a("zdit")},"data-v-882cdca8",null);s.default=r.exports},zdit:function(t,s){}});
//# sourceMappingURL=7.6a3bed216e56dfc425cd.js.map