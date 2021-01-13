import React from 'react'
import AppD from './AppD'
import AppM from './AppM'

export default function Plat() {
    let mobile = false;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        mobile = true;
      }else{
        mobile = false;
      }

    return (<>{mobile? <AppM/> : <AppD/>}</>)
}