import {
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from 'react-icons/hi';
import Stat from './Stat';
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
} from 'react-icons/hi2';
function Stats({ bookings, confirmedStays }) {
  const numBookings = bookings.length;
  const checkins = confirmedStays.length;
  const sales = bookings.reduce(
    (total, booking) => total + booking.totalPrice,
    0
  );
  //   const occupancyRate = (checkins / 20) * 100; // Assuming 20 rooms available, adjust as needed
  const occupancyRate = confirmedStays.reduce((total, stay) => {
    const stayDuration =
      (new Date(stay.endDate) - new Date(stay.startDate)) /
      (1000 * 60 * 60 * 24);
    return total + stayDuration;
  }, 0);
  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      ></Stat>
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={sales}
      ></Stat>
      <Stat
        title='Check-ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      ></Stat>
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={occupancyRate + '%'}
      ></Stat>
    </>
  );
}

export default Stats;
