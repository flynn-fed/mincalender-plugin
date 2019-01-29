Component({
  properties:{
    num:{
      type:'string',
      value:0
    },
    index:{
      type:'string',
      value:0
    }
  },
  data: {
    list:[],
    currentTime: '',
    currentD:1,
    currentM: 1,
    currentY: 2019,
    navTitle: ['一','二','三','四','五','六','日'],
    strMonth: '135781012'
  },
  attached: function(){
    // 可以在这里发起网络请求获取插件的数据
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDate();
    let obj = this.findMonthDays(y,m,d);
    this.setData({
      list: obj.arr,
      currentD: d,
      currentM: m,
      currentY: y,
      currentTime: obj.time 
    })
  },
  methods: {
    findMonthDays(y,m,d){
      let date = new Date(y,m,d);
      //获取每个月第一天是星期几
      let w = date.getDay();
      let fweek = this.getMonthOneWeek(w, d);
      let arr = [];
      // let len = (this.data.strMonth.indexOf(m + 1)) != -1 ? 31 : 30
      //获取一个月的总天数
      let len = new Date(y,m+1,0).getDate();
      // console.log(m,len);
      for (let i = 1; i < fweek; i++) {
        arr.push({
          name: ''
        })
      }
      for (let i = 0; i < len; i++) {
        arr.push({
          name: i + 1
        })
      }
      return {
        arr: arr,
        time: y + '-' + (m + 1) + '-' + d
      }
    // console.log(fweek)
    },
    //获取当月1号是星期几
    getMonthOneWeek(w, d) {
      return Math.abs(w - d % 7 + 1)
    },
    getNextMonth(){
      this.data.currentM + 1 > 11 ?
       this.setData({ currentM:0,currentY:this.data.currentY + 1})
        : 
        this.setData({ currentM: this.data.currentM + 1 });
      let obj = this.findMonthDays(this.data.currentY,this.data.currentM,1);
      this.setData({
        list: obj.arr,
        currentTime: obj.time
      })
    },
    getPrevMonth() {
      this.data.currentM - 1 < 0 ? 
        this.setData({ currentM: 11, currentY: this.data.currentY - 1 })
       : 
        this.setData({ currentM: this.data.currentM - 1});
      let obj = this.findMonthDays(this.data.currentY,this.data.currentM,1);
      this.setData({
        list: obj.arr,
        currentTime: obj.time
      })
    },
    getName(e){
      // console.log(e);
      //获取父组件传过来的数据
      // console.log(this.data.index);
      this.setData({
        num: e.target.dataset.num
      })
      this.triggerEvent('changeEvent', {num:this.data.num})
    }
  }
})