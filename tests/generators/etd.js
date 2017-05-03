export default function createEtd(overrides={}){
  return Object.assign(
    {
      minutes: 10,
      dest: {
        name: 'blah'
      },
      lineColor: 'blah'
    },
    overrides
  );
}
