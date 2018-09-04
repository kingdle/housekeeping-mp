// pages/index/type.js
var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({
    data: {
        // types: null,
        typeTree: {}, // 数据缓存
        category_id: 0 ,
        // 当前类型
        "types": [],
        typeTree: [],
    },
        
    onLoad: function (option){
        var that = this;
        wxb.Post('/api/service.index/getIndex', {
          openid: wxb.getOpenId(),
        }, function (data) {
          wx.hideLoading();
          that.setData({
            types: data.categorys
          })
        });
    },    
 


    tapType: function (e){
        var that = this;
        const category_id = e.currentTarget.dataset.typeId;

        that.setData({
          category_id: category_id
        });
        console.log(category_id);
        wxb.Post('/api/service.index/getRepair', {
          openid: wxb.getOpenId(),
          category_id: that.data.category_id,
          page: wxb.that.data.page,
          type: wxb.that.data.type,
        }, function (data) {
          wx.hideLoading();
          var datas = wxb.that.data.datas;
          for (var val in data.list) {
            datas.push(data.list[val]);
          }

          wxb.that.setData({
            typeTree: datas,
            more: data.more,
            page: wxb.that.data.page + 1,
          })
        });

    },
    // 加载品牌、二级类目数据
    getTypeTree (currType) {
        const me = this, _data = me.data;
        if(!_data.typeTree[currType]){
            request({
                url: ApiList.goodsTypeTree,
                data: {typeId: +currType},
                success: function (res) {
                    _data.typeTree[currType] = res.data.data;
                    me.setData({
                        typeTree: _data.typeTree
                    });
                }
            });
        }
    }
})