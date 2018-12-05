import React from "react";
import { Query } from "react-apollo";
import ReactDOM from "react-dom";
// import { reverseGeoCode } from "src/mapHelpers";
import {
  searchBranch,
  searchBranchVariables,
  userGetBranches,
  userGetBranches_UserGetBranches_branches
} from "src/types/api";
import { SEARCH_BRANCH } from "../sharedQueries";
import BranchesMapPresenter from "./BranchesMapPresenter";
import { USER_GET_BRANCHES } from "./BranchesMapQueries";

interface IState {
  lat: number;
  lng: number;
  branchName: string;
  branches?: any;
  doSearch: boolean;
  closestBranch?: userGetBranches_UserGetBranches_branches;
}

interface IProps {
  google: any;
  onBranchClick: (
    branchId: number,
    transferredLat: number,
    transferredLng: number
  ) => void;
  transferredLat?: number;
  transferredLng?: number;
}

class SearchBranchQuery extends Query<searchBranch, searchBranchVariables> {}

class UserGetBranchesQuery extends Query<userGetBranches> {}
class BranchesMapContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      branchName: "",
      doSearch: false,
      lat: 0,
      lng: 0
    };
  }

  // public componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     this.handleGeoSuccess,
  //     this.handeGeoError
  //   );
  // }

  public handleGeoSuccess = (position: Position) => {
    let latitude;
    let longitude;
    const { transferredLat, transferredLng } = this.props;
    if (transferredLat && transferredLng) {
      latitude = transferredLat;
      longitude = transferredLng;
    } else {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    }

    const { branches } = this.state;

    const closestBranch = this.getClosestBranch(branches, {
      latitude,
      longitude
    });

    this.setState({
      branchName: closestBranch.name,
      closestBranch,
      lat: closestBranch.lat,
      lng: closestBranch.lng
    });
    this.loadMap(latitude, longitude);
    // this.reverseGeocodeAddress(latitude, longitude);
  };

  public handeGeoError = () => {
    console.log("No location");

    return;
  };

  public loadMap = async (lat, lng) => {
    let centerLat = lat;
    let centerLng = lng;
    const { google, transferredLat, transferredLng } = this.props;
    const maps = google.maps;
    const { branches, closestBranch } = this.state;

    if (transferredLat && transferredLng) {
      centerLat = transferredLat;
      centerLng = transferredLng;
    } else {
      if (closestBranch) {
        centerLat = closestBranch.lat;
        centerLng = closestBranch.lng;
      }
    }

    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat: centerLat,
        lng: centerLng
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 15
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handleDragEnd);

    const icon = {
      anchor: new maps.Point(24, 63),
      origin: new maps.Point(0, 0),
      scaledSize: new maps.Size(50, 65),

      url: "https://i.imgur.com/59k4soQ.png"
    };

    if (branches) {
      for (const branch of branches) {
        const marker = new maps.Marker({
          icon,
          position: new google.maps.LatLng(branch.lat, branch.lng),
          title: "Hello World"
        });
        maps.event.addDomListener(marker, "click", () =>
          this.onBranchClick(branch.id)
        );
        marker.setAnimation(maps.Animation.BOUNCE);
        marker.setMap(this.map);
      }
    }
  };

  public handleDragEnd = () => {
    const { branches } = this.state;
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();

    const closestBranch = this.getClosestBranch(branches, {
      latitude: lat,
      longitude: lng
    });

    this.setState({
      branchName: closestBranch.name,
      closestBranch,
      lat,
      lng
    });

    // this.reverseGeocodeAddress(lat, lng);
  };

  public render() {
    const { branchName, doSearch, closestBranch } = this.state;
    return (
      <SearchBranchQuery
        query={SEARCH_BRANCH}
        variables={{ text: branchName }}
        onCompleted={this.updateFields}
        skip={!doSearch}
      >
        {() => (
          <UserGetBranchesQuery
            query={USER_GET_BRANCHES}
            onCompleted={this.updateFields}
            fetchPolicy="cache-and-network"
          >
            {({ loading: userGetBranchesLoading }) => (
              <BranchesMapPresenter
                mapRef={this.mapRef}
                branchName={branchName}
                onInputBlur={this.onInputBlur}
                onInputChange={this.onInputChange}
                userGetBranchesLoading={userGetBranchesLoading}
                closestBranch={closestBranch}
                onBranchClick={this.onBranchClick}
              />
            )}
          </UserGetBranchesQuery>
        )}
      </SearchBranchQuery>
    );
  }

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onInputBlur = async () => {
    this.setState({
      doSearch: true
    });
    // const { branchName } = this.state;
    // const result = await geoCode(branchName);
    // if (result !== false) {
    //   const { lat, lng, formatted_address } = result;
    //   this.setState({
    //     branchName: formatted_address,
    //     lat,
    //     lng
    //   });

    //   this.map.panTo({ lat, lng });
    // }
  };

  // public reverseGeocodeAddress = async (lat: number, lng: number) => {
  //   const reversedAddress = await reverseGeoCode(lat, lng);

  //   if (reversedAddress !== false) {
  //     this.setState({
  //       branchName: reversedAddress
  //     });
  //   }
  // };

  public updateFields = (data: {} | userGetBranches | searchBranch) => {
    if ("UserGetBranches" in data) {
      const {
        UserGetBranches: { branches }
      } = data;

      if (branches) {
        this.setState({
          branches
        });

        navigator.geolocation.getCurrentPosition(
          this.handleGeoSuccess,
          this.handeGeoError
        );
      }
    } else if ("SearchBranch" in data) {
      const { lat, lng } = this.state;
      const {
        SearchBranch: { branches }
      } = data;
      const closestBranch = this.getClosestBranch(branches, { lat, lng });
      this.setState({
        branchName: closestBranch.name,
        doSearch: false,
        lat: closestBranch.lat,
        lng: closestBranch.lng
      });

      this.map.panTo({ lat: closestBranch.lat, lng: closestBranch.lng });
    }
  };

  public getClosestBranch = (branches, myPosition) => {
    const { latitude: lat, longitude: lng } = myPosition;
    let beforeDistance;
    let closestBranch;

    branches.forEach(branch => {
      const distance =
        (branch.lat - lat) * (branch.lat - lat) +
        (branch.lng - lng) * (branch.lng - lng);

      if (beforeDistance === undefined) {
        beforeDistance = distance;
        closestBranch = branch;
      } else if (beforeDistance > distance) {
        beforeDistance = distance;
        closestBranch = branch;
      }
    });

    return closestBranch;
  };

  public onBranchClick = (branchId: number) => {
    const { onBranchClick } = this.props;
    const { branches } = this.state;

    const clickedBranch = branches.find(branch => branch.id === branchId);
    onBranchClick(branchId, clickedBranch.lat, clickedBranch.lng);
  };
}

export default BranchesMapContainer;
