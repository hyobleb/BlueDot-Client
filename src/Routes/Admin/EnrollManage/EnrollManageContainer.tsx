import moment from "moment";
import React from "react";
import { Query } from "react-apollo";
import { Option } from "react-dropdown";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  shopkeeprGetBranchInfo,
  shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch,
  shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships,
  shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branches,
  shopkeeprGetBranchInfoVariables
} from "../../../types/api";
import EnrollManagePresenter from "./EnrollManagePresenter";
import { SHOPKEEPER_GET_BRANCH_INFO } from "./EnrollManageQueries";

export type genderOption = "MALE" | "FEMALE";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  branch?: shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch | null;
  nowMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  nowCabinetMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapNowMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapNowCabMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  manMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  womanMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  boyMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  girlMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  oneDayMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapWomanMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapManMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapGirlMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapBoyMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  selBranchId?: string;
  branches: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branches | null> | null;
  branchSelOptions: Array<{ value: string; label: string }>;
}

class ShopkeeperGetBranchInfo extends Query<
  shopkeeprGetBranchInfo,
  shopkeeprGetBranchInfoVariables
> {}

const makeNoOverlapMemberships = memberships => {
  return memberships.reduce(
    (
      accumulator: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>,
      currentValue
    ) => {
      const findMembership = accumulator.find(membership => {
        if (
          currentValue &&
          membership &&
          membership.userId &&
          membership.userId === currentValue.userId
        ) {
          return true;
        } else {
          return false;
        }
      });
      if (!findMembership) {
        accumulator.push(currentValue);
      }
      return accumulator;
    },
    []
  );
};

const genderBirthFilter = (
  memberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>,
  gender: genderOption,
  isAdult: boolean
) =>
  memberships.filter(
    membership =>
      (membership &&
        membership.user.gender === gender &&
        (isAdult &&
          moment().year() - parseInt(membership.user.birthYear, 10) + 1 >=
            19)) ||
      (membership &&
        membership.user.gender === gender &&
        !isAdult &&
        moment().year() - parseInt(membership.user.birthYear, 10) + 1 < 19)
  );
class EnrollManageContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      branchSelOptions: [],
      branches: [],
      nowCabinetMemberships: [],
      nowMemberships: []
    };
  }
  public render() {
    const {
      branch,
      branchSelOptions,
      nowMemberships,
      nowCabinetMemberships,
      noOverlapNowMemberships,
      noOverlapNowCabMemberships,
      manMemberships,
      womanMemberships,
      boyMemberships,
      girlMemberships,
      oneDayMemberships,
      noOverlapWomanMemberships,
      noOverlapManMemberships,
      noOverlapGirlMemberships,
      noOverlapBoyMemberships,
      branches,
      selBranchId
    } = this.state;

    return (
      <ShopkeeperGetBranchInfo
        query={SHOPKEEPER_GET_BRANCH_INFO}
        onCompleted={this.updateFields}
        onError={err => toast.error(err)}
        variables={{
          branchId: (selBranchId && parseInt(selBranchId, 10)) || undefined
        }}
      >
        {({ loading: getBranchInfoLoading }) => (
          <EnrollManagePresenter
            getBranchInfoLoading={getBranchInfoLoading}
            branch={branch}
            nowMemberships={nowMemberships}
            nowCabinetMemberships={nowCabinetMemberships}
            noOverlapNowMemberships={noOverlapNowMemberships}
            noOverlapNowCabMemberships={noOverlapNowCabMemberships}
            manMemberships={manMemberships}
            womanMemberships={womanMemberships}
            boyMemberships={boyMemberships}
            girlMemberships={girlMemberships}
            oneDayMemberships={oneDayMemberships}
            noOverlapWomanMemberships={noOverlapWomanMemberships}
            noOverlapManMemberships={noOverlapManMemberships}
            noOverlapGirlMemberships={noOverlapGirlMemberships}
            noOverlapBoyMemberships={noOverlapBoyMemberships}
            branches={branches}
            selBranchId={selBranchId}
            branchSelOptions={branchSelOptions}
            onBranchSelChange={this.onBranchSelChange}
          />
        )}
      </ShopkeeperGetBranchInfo>
    );
  }

  public onBranchSelChange = (arg: Option) => {
    this.setState({
      selBranchId: arg.value
    });
  };

  public updateFields = (data: {} | shopkeeprGetBranchInfo) => {
    const { history } = this.props;
    let nowMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let nowCabinetMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let noOverlapNowMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let noOverlapNowCabMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let oneDayMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let manMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let womanMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let boyMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let girlMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let noOverlapManMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let noOverlapWomanMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let noOverlapBoyMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let noOverlapGirlMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;

    if ("ShopkeeperGetBranchInfo" in data) {
      const {
        ShopkeeperGetBranchInfo: { branch, branches, error }
      } = data;

      if (!branch || !branches || error) {
        toast.error(error);
        history.push("/");
        return;
      }

      const { memberships } = branch;
      if (memberships) {
        nowMemberships = memberships.filter(
          membership =>
            membership &&
            moment(membership.endDatetime) > moment() &&
            membership.usable &&
            membership.target === "MEMBERSHIP"
        );
        oneDayMemberships = nowMemberships.filter(membership => {
          if (membership) {
            const startDatetime = moment(membership.startDatetime);
            const endDatetime = moment(membership.endDatetime);
            if (endDatetime.diff(startDatetime, "h") <= 16) {
              return true;
            }
          }
          return false;
        });

        manMemberships = genderBirthFilter(nowMemberships, "MALE", true);
        womanMemberships = genderBirthFilter(nowMemberships, "FEMALE", true);
        boyMemberships = genderBirthFilter(nowMemberships, "MALE", false);
        girlMemberships = genderBirthFilter(nowMemberships, "FEMALE", false);

        nowCabinetMemberships = memberships.filter(
          membership =>
            membership &&
            moment(membership.endDatetime) > moment() &&
            membership.usable &&
            membership.target === "CABINET"
        );

        noOverlapManMemberships = makeNoOverlapMemberships(manMemberships);
        noOverlapManMemberships = makeNoOverlapMemberships(manMemberships);
        noOverlapWomanMemberships = makeNoOverlapMemberships(womanMemberships);
        noOverlapBoyMemberships = makeNoOverlapMemberships(boyMemberships);
        noOverlapGirlMemberships = makeNoOverlapMemberships(girlMemberships);
        noOverlapNowMemberships = makeNoOverlapMemberships(nowMemberships);
        noOverlapNowCabMemberships = makeNoOverlapMemberships(
          nowCabinetMemberships
        );
      } else {
        nowMemberships = [];
        nowCabinetMemberships = [];
        noOverlapNowMemberships = [];
        noOverlapNowCabMemberships = [];
        oneDayMemberships = [];
        manMemberships = [];
        womanMemberships = [];
        boyMemberships = [];
        girlMemberships = [];
        noOverlapManMemberships = [];
        noOverlapWomanMemberships = [];
        noOverlapBoyMemberships = [];
        noOverlapGirlMemberships = [];
      }

      const branchSelOptions = branches.map(branchObj => {
        return {
          label: branchObj!.name,
          value: String(branchObj!.id)
        };
      });

      if (branch !== null) {
        this.setState({
          boyMemberships,
          branch,
          branchSelOptions,
          branches,
          girlMemberships,
          manMemberships,
          noOverlapBoyMemberships,
          noOverlapGirlMemberships,
          noOverlapManMemberships,
          noOverlapNowCabMemberships,
          noOverlapNowMemberships,
          noOverlapWomanMemberships,
          nowCabinetMemberships,
          nowMemberships,
          oneDayMemberships,
          selBranchId: String(branch.id),
          womanMemberships
        } as any);
      }
    }
  };
}
export default EnrollManageContainer;
