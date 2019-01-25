import React from "react";
import { Query } from "react-apollo";
import {
  getAllBranches,
  getBranchesByDistrict,
  searchBranch
} from "../../types/api";
import { GET_ALL_BRANCHES, SEARCH_BRANCH } from "../sharedQueries";
import BranchSearchPopUpPresenter from "./BranchSearchPopUpPresenter";
import { GET_BRANCHES_BY_DISTRICT } from "./BranchSearchPopUpQueries";

interface IProps {
  closeFunc: any;
  onBranchClick: (branchId: number) => void;
  title?: string;
}

interface IState {
  inputBranch: string;
  searchText: string;
  localInfos: any[];
  districtInfos: any[];
  selCity: string;
  selDistrict: string;
  searchedBranches: any[];
}

class BranchSearchQuery extends Query<searchBranch> {}
class GetAllBranches extends Query<getAllBranches> {}
class GetBranchesByDistrict extends Query<getBranchesByDistrict> {}

class BranchSearchPopUpContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      districtInfos: [],
      inputBranch: "",
      localInfos: [],
      searchText: "",
      searchedBranches: [],
      selCity: "",
      selDistrict: ""
    };
  }

  public render() {
    const {
      inputBranch,
      searchText,
      localInfos,
      districtInfos,
      selCity,
      selDistrict,
      searchedBranches
    } = this.state;
    const { closeFunc, title } = this.props;
    return (
      <BranchSearchQuery
        query={SEARCH_BRANCH}
        onCompleted={this.updateFields}
        variables={{ text: searchText }}
        skip={!searchText}
      >
        {() => (
          <GetAllBranches
            query={GET_ALL_BRANCHES}
            onCompleted={this.updateFields}
            fetchPolicy={"cache-and-network"}
          >
            {() => (
              <GetBranchesByDistrict
                query={GET_BRANCHES_BY_DISTRICT}
                variables={{ city: selCity, district: selDistrict }}
                skip={!selCity || !selDistrict}
                onCompleted={this.updateFields}
                fetchPolicy={"cache-and-network"}
              >
                {() => (
                  <BranchSearchPopUpPresenter
                    inputBranch={inputBranch}
                    onInputChange={this.onInputChange}
                    closeFunc={closeFunc}
                    setSearchText={this.setSearchText}
                    onBranchClick={this.onBranchClick}
                    title={title}
                    localInfos={localInfos}
                    districtInfos={districtInfos}
                    onCityBtnClick={this.onCityBtnClick}
                    onDistrictBtnClick={this.onDistrictBtnClick}
                    searchedBranches={searchedBranches}
                  />
                )}
              </GetBranchesByDistrict>
            )}
          </GetAllBranches>
        )}
      </BranchSearchQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public updateFields = (
    data: {} | getAllBranches | searchBranch | getBranchesByDistrict
  ) => {
    if ("GetAllBranches" in data) {
      const {
        GetAllBranches: { branches }
      } = data;

      if (branches) {
        const { localInfos } = this.state;
        branches.forEach(branch => {
          if (branch) {
            if (!localInfos.find(localInfo => localInfo.city === branch.city)) {
              localInfos.push({
                city: branch.city,
                districts: [branch.district]
              });
            } else {
              const index = localInfos.findIndex(
                localInfo => localInfo.city === branch.city
              );
              if (
                !localInfos[index].districts.find(
                  district => district === branch.district
                )
              ) {
                localInfos[index].districts.push(branch.district);
              }
            }
          }
        });
      }
    } else if ("SearchBranch" in data) {
      const {
        SearchBranch: { branches }
      } = data;
      if (branches) {
        this.setState({
          districtInfos: [],
          searchedBranches: branches,
          selCity: "",
          selDistrict: ""
        });
      }
    } else if ("GetBranchesByDistrict" in data) {
      const {
        GetBranchesByDistrict: { branches }
      } = data;
      if (branches) {
        this.setState({
          searchedBranches: branches
        });
      }
    }
  };

  public setSearchText = () => {
    this.setState({
      ...this.state,
      searchText: this.state.inputBranch
    });
  };

  public onBranchClick = (branchId: number) => {
    this.props.onBranchClick(branchId);
  };

  public onCityBtnClick = (city: string) => {
    const { localInfos } = this.state;
    const localInfo = localInfos.find(localInf => localInf.city === city);
    this.setState({
      districtInfos: localInfo.districts,
      selCity: city,
      selDistrict: ""
    });
  };

  public onDistrictBtnClick = (district: string) => {
    this.setState({
      selDistrict: district
    });
  };
}

export default BranchSearchPopUpContainer;
