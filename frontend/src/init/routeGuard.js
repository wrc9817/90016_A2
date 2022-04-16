import {
  store
} from '../router/index'

export function initRouteGuard(router){
  createLoginGuard(router)
}

function createLoginGuard(router){
  router.beforeEach((to,from,next)=>{
    const isLogin = localStorage.getItem('isLogin')?true:false
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
      }if(to.path=='/login'){
        next()
      }else{
        next({
          path:'/login'
        })
      }
    }
  })
}