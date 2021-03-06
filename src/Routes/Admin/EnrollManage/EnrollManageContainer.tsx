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
  longTermMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapWomanMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapManMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapGirlMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  noOverlapBoyMemberships?: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null> | null;
  selBranchId?: string;
  branches: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branches | null> | null;
  branchSelOptions: Array<{ value: string; label: string }>;
  nowMemsModal: boolean;
  dayMemsModal: boolean;
  manMemsModal: boolean;
  womanMemsModal: boolean;
  boyMemsModal: boolean;
  girlMemsModal: boolean;
  cabinetMemsModal: boolean;
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

// 'membershipTitle' 속성 추가
const setMembershipTitle = someMemberships => {
  someMemberships.forEach(membership => {
    const { endDatetime, startDatetime, status } = membership;
    const hourlyDifference = moment(endDatetime).diff(
      moment(startDatetime),
      "h"
    );
    const membershipTime =
      hourlyDifference / 24 > 1 ? hourlyDifference / 24 + "일" : 16 + "시간";
    const membershipStatus =
      status === "REGIST"
        ? "등록"
        : status === "EXTENDED"
        ? "연장"
        : status === "EXPIRED"
        ? "만료"
        : "";
    const membershipTitle = `${membershipTime} 멤버십 ${membershipStatus}`;
    membership.membershipTitle = membershipTitle;
  });
};

class EnrollManageContainer extends React.Component<IProps, IState> {
  public constructor(props) {
    super(props);
    this.state = {
      boyMemsModal: false,
      branchSelOptions: [],
      branches: [],
      cabinetMemsModal: false,
      dayMemsModal: false,
      girlMemsModal: false,
      manMemsModal: false,
      nowCabinetMemberships: [],
      nowMemberships: [],
      nowMemsModal: false,
      womanMemsModal: false
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
      longTermMemberships,
      noOverlapWomanMemberships,
      noOverlapManMemberships,
      noOverlapGirlMemberships,
      noOverlapBoyMemberships,
      branches,
      selBranchId,
      nowMemsModal,
      dayMemsModal,
      manMemsModal,
      womanMemsModal,
      boyMemsModal,
      girlMemsModal,
      cabinetMemsModal
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
            longTermMemberships={longTermMemberships}
            noOverlapWomanMemberships={noOverlapWomanMemberships}
            noOverlapManMemberships={noOverlapManMemberships}
            noOverlapGirlMemberships={noOverlapGirlMemberships}
            noOverlapBoyMemberships={noOverlapBoyMemberships}
            branches={branches}
            selBranchId={selBranchId}
            branchSelOptions={branchSelOptions}
            onBranchSelChange={this.onBranchSelChange}
            nowMemsModal={nowMemsModal}
            dayMemsModal={dayMemsModal}
            manMemsModal={manMemsModal}
            womanMemsModal={womanMemsModal}
            boyMemsModal={boyMemsModal}
            girlMemsModal={girlMemsModal}
            cabinetMemsModal={cabinetMemsModal}
            toggleModalBox={this.toggleModalBox}
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

  public toggleModalBox = (modalName: string) => {
    this.setState({ [modalName]: !this.state[modalName] } as any);
  };

  // public onInputChange: React.ChangeEventHandler<
  //   HTMLInputElement | HTMLSelectElement
  // > = event => {
  //   const {
  //     target: { name, value }
  //   } = event;

  //   this.setState({
  //     [name]: value
  //   } as any);
  // };

  public updateFields = (data: {} | shopkeeprGetBranchInfo) => {
    const { history } = this.props;
    let nowMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let nowCabinetMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let noOverlapNowMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let noOverlapNowCabMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let oneDayMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
    let longTermMemberships: Array<shopkeeprGetBranchInfo_ShopkeeperGetBranchInfo_branch_memberships | null>;
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

        setMembershipTitle(nowMemberships);

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

        // 장기 등록 멤버십 목록
        longTermMemberships = nowMemberships.filter(membership => {
          if (membership) {
            const startDatetime = moment(membership.startDatetime);
            const endDatetime = moment(membership.endDatetime);
            if (endDatetime.diff(startDatetime, "h") > 16) {
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

        setMembershipTitle(nowCabinetMemberships);

        oneDayMemberships = makeNoOverlapMemberships(oneDayMemberships);
        longTermMemberships = makeNoOverlapMemberships(longTermMemberships);
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
        longTermMemberships = [];
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
          longTermMemberships,
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
