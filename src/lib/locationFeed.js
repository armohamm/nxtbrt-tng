export function locationFeedSubscribe(
  onLocationChange, 
  {
    geolocation = navigator.geolocation,
    console = window.console
  }={}
){
  const watchId = geolocation.watchPosition(
    handleLocationSuccess,
    handleLocationFailure,
    {
      maximumAge: 300000
    }
  );

  function handleLocationSuccess(position){
    onLocationChange(position);
    if( position.coords.accuracy <= 500 ){ // 500 meters
      stopWatching();
    }
  }

  function handleLocationFailure(positionError){
    console.error('GELOCATION ERROR:',positionError);
    stopWatching();
  }

  function stopWatching(){
    geolocation.clearWatch(watchId);
  }
}
