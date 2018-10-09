import React from "react";
import Helmet from "react-helmet";
import LoungeContainer from "../../Components/LoungeContainer";
import styled from "../../typed-components";
import { getBranch } from "../../types/api";

const Container = styled.div``;

interface IProps {
  data?: getBranch;
  loading: boolean;
}

const AddLoungePresenter: React.SFC<IProps> = ({ data }) => {
  console.log(data);
  return (
    <Container>
      <Helmet>
        <title>AddLounge | BlueDot</title>
      </Helmet>
      {data &&
        data.HeadGetBranch &&
        data.HeadGetBranch.branch &&
        data.HeadGetBranch.branch.loungeImage && (
          <LoungeContainer imgUrl={data.HeadGetBranch.branch.loungeImage} />
        )}
    </Container>
  );
};

export default AddLoungePresenter;
