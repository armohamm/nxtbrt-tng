export default function detectGyro(
  onUpdate,
  {addEventListener=window.addEventListener} = {}
){
  addEventListener("deviceorientation", function(ev) {
    const hasGyro = event.alert !== null;
    onUpdate(hasGyro);
  },{once:true});

}
