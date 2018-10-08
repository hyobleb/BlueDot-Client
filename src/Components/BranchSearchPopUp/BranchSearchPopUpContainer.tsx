// import React from "react";
// import { Query } from "react-apollo";
// import { SEARCH_BRANCHES } from "../../Routes/AddBranch/AddBranchQueries";
// import { searchBranches } from "../../types/api";
// import BranchSearchPopUpPresenter from "./BranchSearchPopUpPresenter";

// interface IProps {
//   onBranchSeatchFunc: any;
//   closFunc: any;
//   branchSearchText?: string;
// }

// interface IState {
//   inputBranch: string;
//   searchText: string;
// }

// class BranchSearchQuery extends Query<searchBranches> {}

// class BranchSearchPopUpContainer extends React.Component<IProps, IState> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputBranch: props.branchSearchText,
//       searchText: ""
//     };
//   }

//   public render() {
//     const { inputBranch, searchText } = this.state;
//     const { onBranchSeatchFunc, closFunc } = this.props;
//     return (
//       <BranchSearchQuery
//         query={SEARCH_BRANCHES}a
//         skip={!Boolean(searchText)}
//       >
//         {({ loading, error, data }) => (
//           <BranchSearchPopUpPresenter
//             onBranchSeatchFunc={onBranchSeatchFunc}
//             inputBranch={inputBranch}
//             onInputChange={this.onInputChange}
//             closFunc={closFunc}
//             data={data}
//             error={error}
//             loading={loading}
//             setSearchText={this.setSearchText}
//             onBranchClick={this.onBranchClick}
//           />
//         )}
//       </BranchSearchQuery>
//     );
//   }

//   public onInputChange: React.ChangeEventHandler<
//     HTMLInputElement
//   > = async event => {
//     const {
//       target: { name, value }
//     } = event;

//     this.setState({
//       [name]: value
//     } as any);
//   };

//   public setSearchText = () => {
//     this.setState({
//       ...this.state,
//       searchText: this.state.inputBranch
//     });
//   };

//   public onBranchClick = id => {
//     console.log(id);
//   };
// }

// export default BranchSearchPopUpContainer;
