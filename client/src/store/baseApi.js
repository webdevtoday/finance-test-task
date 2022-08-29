import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    subscribeToEvents: build.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        _arg,
        { dispatch, updateCachedData, cacheEntryRemoved }
      ) {
        const socket = io("http://localhost:4000");

        socket.emit("start");

        socket.on("ticker", (data) => {
          updateCachedData((draft) => {
            return data;
          });
        });

        await cacheEntryRemoved;
        socket.close();
      },
    }),
  }),
});

export const { useSubscribeToEventsQuery } = baseApi;
