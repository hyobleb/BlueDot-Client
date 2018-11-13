import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import DefaultBack from "src/Components/DefaultBack";
import Loading from "src/Components/Loading";
import styled from "src/typed-components";

const Back = styled(DefaultBack)``;
const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

interface IProps {
  membershipLogsLoading: boolean;
  logDatasByDate: any[];
}

const ChartPresenter: React.SFC<IProps> = ({
  membershipLogsLoading,
  logDatasByDate
}) =>
  membershipLogsLoading ? (
    <Loading />
  ) : (
    <Back title={"chart"} backUrl={"/manage-users"}>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            width={600}
            height={300}
            data={logDatasByDate}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="day1" stackId="a" name="하루 이용" fill="#8884d8" />
            <Bar dataKey="day15" stackId="a" name="15일 이용" fill="#82ca9d" />
            <Bar dataKey="day30" stackId="a" name="30일 이용" fill="#8e44ad" />
            <Bar dataKey="day90" stackId="a" name="90일 이용" fill="#f1c40f" />
            <Bar dataKey="other" stackId="a" name="기타" fill="#e67e22" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            width={600}
            height={300}
            data={logDatasByDate}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="day1" stackId="a" name="하루 이용" fill="#8884d8" />
            <Bar dataKey="day15" stackId="a" name="15일 이용" fill="#82ca9d" />
            <Bar dataKey="day30" stackId="a" name="30일 이용" fill="#8e44ad" />
            <Bar dataKey="day90" stackId="a" name="90일 이용" fill="#f1c40f" />
            <Bar dataKey="other" stackId="a" name="기타" fill="#e67e22" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Back>
  );

export default ChartPresenter;
