import o9n from 'o9n';
import _detectGyro from './detectGyro';

import createGtmClient from './gtm';

export function orientationFeedSubscribe(
  onOrientationChange,
  {
    orientation=o9n.orientation,
    detectGyro=_detectGyro,
    gtm=createGtmClient()
  } = {}
){
  let appearsToBeMobileDevice = undefined;
  detectGyro(function(hasGyro){
    gtm.pushEvent('gyro-detection',{hasGyro});
    appearsToBeMobileDevice = hasGyro;
    whenOrientationChanges();
  });

  orientation.addEventListener('change', whenOrientationChanges);

  function whenOrientationChanges(){
    gtm.pushEvent('orientation-change',{orientation:orientation.type});
    if( appearsToBeMobileDevice ){
      onOrientationChange(orientation.type);
    }
  }
}
