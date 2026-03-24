import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import { useState } from 'react';
import CheckBox from '../../ui/CheckBox';
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  // const [confirmPaid, setConfirmPaid] = useState(false);
  // useEffect(() => {
  //   if (booking) setConfirmPaid(true);
  // }, [booking?.id]);
  if (isLoading || !booking) return <Spinner />;

  return (
    <CheckinBookingContent
      key={booking.id}
      booking={booking}
      moveBack={moveBack}
    />
  );
}

function CheckinBookingContent({ booking, moveBack }) {
  const { checkin, isCheckingIn } = useCheckin();
  const [addBreakfast, setAddBreakfast] = useState(
    booking.hasBreakfast
  );
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const [confirmPaid, setConfirmPaid] = useState(
    booking.isPaid ?? false
  );

  if (isCheckingIn || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const breakfastPrice =
    settings?.breakfastPrice * numNights * numGuests || 0;
  function handleCheckin() {
    console.log('Updating booking with breakfast:', addBreakfast);
    if (!confirmPaid) return;
    if (addBreakfast && hasBreakfast) {
      checkin({
        bookingId,
        options: {
          hasBreakfast: true,
          totalPrice: totalPrice + breakfastPrice,
          extrasPrice: breakfastPrice,
        },
      });
      return;
    }

    checkin({ bookingId, options: {} });
  }
  if (isCheckingIn) return <Spinner />;
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <CheckBox
            label='Add breakfast'
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((v) => !v);
              setConfirmPaid(false);
            }}
            id='breakfast'
          >
            Add breakfast for {guests.fullName} at ${breakfastPrice}{' '}
            per
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          label='I have received this booking'
          checked={confirmPaid}
          onChange={() => setConfirmPaid((v) => !v)}
          id='confirm'
          disabled={confirmPaid}
        >
          I confirm that I have received payment of $
          {totalPrice + breakfastPrice} from {guests.fullName} for{' '}
          {numNights} night(s) and {numGuests} guest(s){' '}
          {hasBreakfast && 'with breakfast included'}.
        </CheckBox>
      </Box>

      <ButtonGroup>
        {/* <Button onClick={handleCheckin} disabled= {confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button> */}
        <Button onClick={handleCheckin} disabled={isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
