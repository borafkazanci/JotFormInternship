import { Component } from 'react';
import { AppointmentPicker } from 'react-appointment-picker';
import { dateArraySort } from '../Utils';

// public react-appointment-picker:
// taken from 'https://www.npmjs.com/package/react-appointment-picker'
export default class AppointmentBox extends Component {
  state = {
    continuousLoading: false,
    type: this.props.type,
    initDates: this.props?.currDays,
    isLoad: false,
    renderCap: 0
  };

  stateDefiner = () => {
    this.setState({ initDates: this.props?.currDays });
  }

  updateAndNotify = () => {
    if (this.updateTimer) return;
    this.setState({ continuousLoading: true });
    this.updateTimer = setTimeout(() => {
      this.setState({ continuousLoading: false });
      this.updateTimer = null;
    }, 100);
  }

  componentDidMount() {
    this.stateDefiner();
    this.setState({ isLoad: true });
    console.log("component did mount");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.firstDate !== this.props.firstDate) {
      this.updateAndNotify();
      this.stateDefiner();
      console.log("component did update -------");
    }
    else if (this.state.isLoad && this.state.renderCap < 1) {
      this.updateAndNotify();
      this.stateDefiner();
      this.setState({ renderCap: this.state.renderCap + 1 });
      console.log("component did update diff");
    }
  }

  addAppointmentToArray = (day, number, id) => {
    const newArr = [...this.props.dates];
    const newObject = {
      day: day,
      number: number,
      id: id
    }
    let isExist = false;

    newArr.forEach((item) => {
      if (item.day === day && item.number === number) {
        isExist = true;
      }
    })

    if (!isExist) {
      newArr.push(newObject);
      this.props.setDates(dateArraySort(newArr));
    }
  }

  removeAppointmentFromArray = (day, number) => {
    const oldArr = [...this.props.dates];
    const newArr = [];
    oldArr.forEach((item, index) => {
      if (item.day !== day || item.number !== number)
        newArr.push(oldArr[index]);
    });

    this.props.setDates(newArr);
  }

  addAppointmentCallbackContinuousCase = ({
    addedAppointment: { day, number, time, id },
    addCb,
    removedAppointment: params,
    removeCb
  }) => {
    this.setState(
      {
        continuousLoading: true
      },
      async () => {
        if (removeCb) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          removeCb(params.day, params.number);
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
        addCb(day, number, time, id);

        if (this.state.type === 'setup') {
          this.addAppointmentToArray(day, number, id);
        }
        else {
          this.props.setSelectedAppointment(day + number);
        }
        this.setState({ continuousLoading: false });
      }
    );
  };

  removeAppointmentCallbackContinuousCase = (
    { day, number, time, id },
    removeCb
  ) => {
    this.setState(
      {
        continuousLoading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        removeCb(day, number);

        if (this.state.type === 'setup') {
          this.removeAppointmentFromArray(day, number);
        }
        else {
          this.props.setSelectedAppointment('');
        }
        this.setState({ continuousLoading: false });
      }
    );
  };

  render() {
    const { continuousLoading, initDates } = this.state;

    const days = initDates;

    return (
      <div>
        <AppointmentPicker
          addAppointmentCallback={
            this.addAppointmentCallbackContinuousCase
          }
          removeAppointmentCallback={
            this.removeAppointmentCallbackContinuousCase
          }
          initialDay={
            new Date(this.props.firstDate)
          }
          days={days}
          maxReservableAppointments={this.props.maxResAppointments}
          visible
          loading={continuousLoading}
          continuous
          unitTime={7200_10_0}
          local
        />
      </div>
    );
  }
}