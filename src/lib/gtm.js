export default function createGtmClient(dataLayer = window.dataLayer || []){
  function pushEvent(event,eventData={}){
    const payload = {
      ...eventData,
      event
    };
    return dataLayer.push(payload);
  }

  return {
    pushEvent
  };
}
