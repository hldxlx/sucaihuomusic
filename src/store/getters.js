/**
 * Created by cyb on 2019/5/2.
 */
//通过getters取state的数据，取到组件里面
export const singer = state =>state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) =>{
  return state.playlist[state.currentIndex] || {}
}
