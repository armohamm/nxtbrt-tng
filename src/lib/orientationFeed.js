
export function orientationFeedSubscribe(onOrientationChange,{orientation}){
  orientation.addEventListener('change',handleChange);

  function handleChange(){
  }
}
