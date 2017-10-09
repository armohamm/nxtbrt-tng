import o9n from 'o9n';
import _detectGyro from './detectGyro';

export function orientationFeedSubscribe(
  onOrientationChange,
  {
    orientation=o9n.orientation,
    detectGyro=_detectGyro
  } = {}
){
  let appearsToBeMobileDevice = undefined;
  detectGyro(function(hasGyro){
    appearsToBeMobileDevice = hasGyro;
    whenOrientationChanges();
  });

  orientation.addEventListener('change', whenOrientationChanges);

  function whenOrientationChanges(){
    if( appearsToBeMobileDevice ){
      onOrientationChange(orientation.type);
    }
  }
}
