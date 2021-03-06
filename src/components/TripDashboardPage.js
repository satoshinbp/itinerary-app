import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import TripListButtons from './TripListButtons'
import TripList from './TripList'
import TripForm from './TripForm'
import { startAddTrip, startEditTrip } from '../actions/trips'

export const TripDashboardPage = props => {
  const [tripId, setTripId] = React.useState(undefined)

  const onSubmit = tripData => {
    if (props.trips.find(trip => trip.id === tripId)) {
      props.startEditTrip(tripId, tripData)
    } else {
      props.startAddTrip(tripData)
    }
    setTripId(undefined)
  }

  return (
    <div className="container">
      <TripListButtons setTripId={setTripId} />
      <TripList setTripId={setTripId} />
      <Modal
        isOpen={!!tripId}
        contentLabel="Add/Edit Trip"
        onRequestClose={() => setTripId(undefined)}
        closeTimeoutMS={200}
        className="modal"
      >
        <TripForm
          onSubmit={onSubmit}
          trip={props.trips.find(trip => trip.id === tripId)}
        />
      </Modal>
    </div>
  )
}

Modal.setAppElement('body')

const mapStateToProps = state => ({
  trips: state.trips
})

const mapDispatchToProps = dispatch => ({
  startAddTrip: trip => dispatch(startAddTrip(trip)),
  startEditTrip: (id, updates) => dispatch(startEditTrip(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(TripDashboardPage)