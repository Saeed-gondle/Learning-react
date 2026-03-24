import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
const initialState = {
  username: "User",
  position: {},
  address: "",
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: "",
};

function getPosition() {
  console.log("Getting position...");
  let position = {};

  if (!navigator.geolocation)
    return new Error("Geolocation is not supported by this browser");

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      (err) => {
        let errorMessage = "Unable to get your location";

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Permission denied. Please allow location access.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage =
              "Location information is unavailable. Make sure you're using HTTPS and location services are enabled.";
            break;
          case err.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = err.message || "An unknown error occurred.";
        }

        reject(new Error(errorMessage));
      }
    );
  });
  // return new Promise(function (resolve, reject) {
  //   if (!navigator.geolocation) {
  //     reject(new Error("Geolocation is not supported by this browser"));
  //   } else {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => resolve(position),
  //       (error) => {
  //         let errorMessage = "Unable to get your location";

  //         switch (error.code) {
  //           case error.PERMISSION_DENIED:
  //             errorMessage = "Permission denied. Please allow location access.";
  //             break;
  //           case error.POSITION_UNAVAILABLE:
  //             errorMessage =
  //               "Location information is unavailable. Make sure you're using HTTPS and location services are enabled.";
  //             break;
  //           case error.TIMEOUT:
  //             errorMessage = "Location request timed out.";
  //             break;
  //           default:
  //             errorMessage = error.message || "An unknown error occurred.";
  //         }

  //         reject(new Error(errorMessage));
  //       },
  //       {
  //         enableHighAccuracy: false,
  //         timeout: 10000,
  //         maximumAge: 0,
  //       }
  //     );
  //   }
  // });
}

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }
export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  console.log(positionObj);
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
        state.position = null;
        state.address = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "failed";
        state.position = null;
        state.address = null;
        console.log("Failed to fetch address:", action.error.message);
        state.error = action.error.message;
      });
  },
});
export const { updateName } = userSlice.actions;
export default userSlice.reducer;
