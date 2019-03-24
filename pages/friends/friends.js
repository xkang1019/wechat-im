// pages/friends/friends.js

/**
 * 获取好友列表
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        friends: []
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

        let username = getApp().globalData.userName
        var userCmd = {cmd: 17, type: 0, userid: username};
        var msgCmd = {cmd: 19, type: 0, userId: username};
        // this.sendMsg({content:userCmd});//获取登录用户信息;
        // this.sendMsg({content:msgCmd});//获取用户离线消息(好友+群组);

        getApp().getIMHandler().sendMsg({
            content: {
                cmd: 17,
                type: 0,
                userId: getApp().globalData.userId
            },
            fail: (res) => {
                console.log('获取好友列表失败', res);
            }
        });
        getApp().getIMHandler().setOnReceiveMessageListener({
            listener: (msg) => {
                console.log('setOnReceiveMessageListener', msg);
                if (msg.command == 18) {
                    this.initOnlineUsers(msg.data)
                }
            }
        });
    },

    createFriendItem(item) {
        return {
            friendId: item.id,
            friendHeadUrl: item.avatar,
            friendName: item.nick
        };
    },

    initOnlineUsers(data) {
        var self = this;
        var groups = data.groups;
        var groupsList = [];
        for (var g = 0; g < groups.length; g++) {
            var group = groups[g];
            var users = group.users;
            for (var u = 0; u < users.length; u++) {
                var user = users[u];
              if (getApp().globalData.userId == user.id){
                user.nick = '我';
              }
                groupsList.push(self.createFriendItem(user))
            }
        }
        self.setData({friends: groupsList})
    },

    toChat(e) {
        let item = e.currentTarget.dataset.item;
        delete item.latestMsg;
        delete item.unread;
        delete item.content;
        console.info("toChat")
        wx.navigateTo({
            url: `../chat/chat?friend=${JSON.stringify(item)}`
        });
    },

});