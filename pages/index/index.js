//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    images:[],
    gender:'',
    age: '',
    emotion:'' ,
    scrore:'',
    expression: '',
    glasses: '',
    faceend:true,
    animation:false
  },
/*   选择本地图片 */
faceImage:function(){
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success:(res)=> {
      // tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      this.setData({
        images:tempFilePaths,
        animation:true
      })
     /*  图片后台发送 */
     setTimeout(()=>{
       wx.uploadFile({
         url: 'http://www.thexxdd.cn/baidu/',
         filePath: tempFilePaths[0],
         name: 'file',
         success: (res) => {
           var data = res.data
           var datas = JSON.parse(data)
           /* console.log(datas)  */
           var faceing = datas.faces
           console.log(faceing)
           /* 判断是否有人脸 */
           if (faceing.message == '没有检测到人脸') {
             this.setData({
               faceend: false,
               animation: false
             })
           }
           else {
             this.setData({
               gender: faceing.gender,
               age: faceing.age,
               emotion: faceing.emotion,
               scrore: faceing.scrore,
               expression: faceing.expression,
               glasses: faceing.glasses,
               faceend: true,
               animation: false
             })
           }
         }
       })
     },4000)
   
    }
  })
}
 
})
