'use client';

// import { useAppDispatch } from '@/hooks/redux';
// import { useLogoutMutation } from '@/lib/api/endpoints/auth';
// import { clearUser } from '@/lib/features/auth/auth.slice';

// export function useLogout() {
//   const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
//   const dispatch = useAppDispatch();

//   /**
//    * Logs out the user and optionally calls the API and/or clears the Redux state.
//    * @param options.callApi Whether to call the logout API (default: true)
//    * @param options.clearUser Whether to clear user data (default: true)
//    */
//   const handleLogout = (
//     options: { callApi?: boolean; clearUser?: boolean } = {
//       callApi: true,
//       clearUser: true,
//     }
//   ) => {
//     localStorage.removeItem('Authorization');
//     if (options.clearUser) dispatch(clearUser());
//     if (options.callApi) logout();
//   };

//   return { handleLogout, isLoggingOut };
// }

////////////////////// ADD YOUR LOGOUT LOGIC HERE ////////////////////////
