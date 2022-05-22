import {store} from '../store/index'
export function initRouteGuard(router){
  createLoginGuard(router)
}

function createLoginGuard(router){
  router.beforeEach((to,from,next)=>{
    var isLogin = localStorage.getItem("isLogin")?true:false
    if(isLogin){
      if(to.path!=='/login'){
        next()
      }else{
        next({
          path:'/'
        })
      }
    }else{
      if(to.path=='/'){
        next()
      }else if(to.path=='/login'){
        next()
      }else if(to.path=='/feature'){
        next()
      }else if(to.path=="/conclusion"){
        next()
      }else{
        next({
          path:'/login'
        })
      }
    }
  })
}