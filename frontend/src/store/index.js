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
    }
  },
  actions: {
    fetchComments({
      state,commit
    }){
      var params = {
        userId:state.userInfo.id
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
    }
  },
  modules: {
  }
})
