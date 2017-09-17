import o9n from 'o9n';

export function orientationFeedSubscribe(
  onOrientationChange,
  {orientation=o9n.orientation} = {}
){
  orientation.addEventListener('change',handleChange);

  function handleChange(ev){
    const orientationType = ev.target.type;
    onOrientationChange(orientationType);
  }

  const initialOrientationType = orientation.type;
  onOrientationChange(initialOrientationType);
}
