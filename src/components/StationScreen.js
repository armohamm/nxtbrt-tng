import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export default connect(mapStateToProps,mapDispatchToProps)(StationScreen);

function mapStateToProps(state) {
  return {
    //stations: state.stations
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

function StationScreen({station}){
  return (
    <section className="station-screen">
      <Link to="/">
        <h1 className="station-screen__title">
          {station.name}
        </h1>
      </Link>
    </section>
  );
}

