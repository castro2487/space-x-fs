## Node

This app is dockerize, you just need to run `yarn dev`

We need to have a NodeJs REST API to serve some SpaceX launches data and let a user mark their favorites. The app is setup to use TypeScript, but it allows the use of JS, in fact all is built using just JS. If you prefer to use TypeScript, you can, and feel free to change whatever is needed.

### Tasks

1. We need to fetch data from SpaceX endpoints below, and build an array of launches that looks like the example. NOTE: There's no need to persist the data we get from the remote endpoints nor the response we are generating here. Just hit both endpoints, merge the data to get an output following the format, and return it.

```json
{
  "flight_number": 39,
  "mission_name": "NROL-76",
  "mission_patch": "https://images2.imgbox.com/be/e7/iNqsqVYM_o.png",
  "details": "Residual stage 1 thrust led to collision between stage 1 and stage 2",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "active": true,
    "cost_per_launch": 6700000,
    "company": "SpaceX"
  }
}
```

_SpaceX endpoints_ <br/>
https://api.spacexdata.com/v3/launches <br/>
https://api.spacexdata.com/v3/rockets

2. We need the app to support favoriting. Favorite controllers are already created under `node > src > controllers > favorites.ts`. Complete what should be needed to make it work.

3. At this point you should already seen an `auth` middleware, let's make it worthwhile. We should be getting a token with the POST `/admin/token` endpoint, verify it and if is not valid protected endpoints should return a `401`. All endpoints should be protected.

4. **Performance Challenge**: The `/launches` endpoint mimics a heavy operation. Implement a simple in-memory caching strategy to improve the response time for subsequent requests.
