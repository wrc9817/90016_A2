import { createStore } from 'vuex'
import instance from '../utils/index'
export const store = createStore({
  state: {
    userInfo:{
      email:null,
      id:null,
      gender:null,
      age:null,
      location:null,
      first_name:null,
      last_name:null,
      isAdmin:false,
    },
    profileDialog:false,
    comments:null,
    commentId:null,
    newCommentDialog:false,
    commentDetail:{
      title:null,
      time:null,
      content:null,
      author:null,
      like_count:null,
      views:null,
    },
    replies:[],
    audit:false,
  },
  getters: {
  },
  mutations: {
    handleLogin(state,payload){
      state.userInfo = payload      
    },
    handleLogout(state,payload){
      state.userInfo = {
        email:null,
        id:null,
        gender:null,
        age:null,
        location:null,
        first_name:null,
        last_name:null,
      };
    },
    handleOpenProfile(state,payload){
      state.profileDialog = payload;
    },
    handleOpenCommentDialog(state,payload){
      state.newCommentDialog = payload
    },
    handleComments(state,payload){
      state.comments = payload
    },
    handleEnterComment(state,payload){
      state.commentId = payload
    },
    handleCommentDetail(state,payload){
      state.commentDetail = payload
    },
    handleReplies(state,payload){
      state.replies = payload
    },
    handleOpenAudit(state,payload){
      state.audit = payload
    }
  },
  actions: {
    fetchComments({
      state,commit
    }){
      var params = {
        userId:state.userInfo.id,
        isAdmin:state.userInfo.isAdmin
      }
      instance
      .get('/comments',{
        params:params
      })
      .then((res)=>{
        if(res.data.status==200){
          commit("handleComments",res.data.data);
        }
      })
    },
    fetchReplies({
      state,commit
    }){
      var params = {
        commentId:state.commentId,
      }
      instance.get('/reply',{
        params
      })
      .then((res)=>{
        if(res.data.status==200){
          commit("handleReplies",res.data.data)
        }
        
      })
    }
  },
  modules: {
  }
})
