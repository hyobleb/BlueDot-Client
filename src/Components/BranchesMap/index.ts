import { GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAPS_API_KEY } from "src/keys";
import BranchesMapContainer from "./BranchesMapContainer";

export default GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY })(
  BranchesMapContainer
);
