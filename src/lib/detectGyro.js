export default function detectGyro(
  onUpdate,
  {addEventListener=window.addEventListener} = {}
){
  addEventListener("deviceorientation", function(ev) {
    const hasGyro = event.alpha !== null;
    onUpdate(hasGyro);
  },{once:true});

}
