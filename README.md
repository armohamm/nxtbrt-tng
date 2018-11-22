Test > Build > Deploy pipeline: [ ![Codeship Status for moredip/nxtbrt-tng](https://app.codeship.com/projects/ec34a510-85b1-0135-f802-220190e080c8/status?branch=master)](https://app.codeship.com/projects/247979)

## Environments
Master branch is continuously deployed to [staging](http://staging.nxtbrt.com.s3-website-us-west-2.amazonaws.com/#/).
MARKER/prod is deployed to [nxtbrt.com](https://nxtbrt.com)

## Notes
- src/lib/raw_stn.json comes from https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y

## TODO
- [x] List stations
- [x] Departure times
- [x] Show "now" rather than "0" for ETDs
- [x] Sort stations based on geolocation
- [ ] Display network errors in a toast or similar
- [ ] Display geolocation in a toast or similar
- [x] Analytics
- [x] show BART map in landscape mode
- [x] only show BART map on mobile devices

- Test coverage
  - [ ] App component
  - [ ] Station component
