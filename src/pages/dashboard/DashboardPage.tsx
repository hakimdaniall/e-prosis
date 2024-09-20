import { Avatar, Card, Col, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { PiAppStoreLogo } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/images/user.png";
import carIcon from "../../assets/images/car.svg";
import carReserved from "../../assets/images/car_reserved.svg";
import carUnderMaintanenced from "../../assets/images/car_underMaintanenced.svg";
import top_1 from "../../assets/images/top_1.svg";
import top_2 from "../../assets/images/top_2.svg";
import top_3 from "../../assets/images/top_3.svg";
import {
  BarColData,
  ColumnChartsSample,
  DonutChartsSample,
  MultiLineChartsSample,
  WeeklyBarColData,
} from "../../components/charts/Charts";
import { RankingRow } from "../../components/dashboard/Ranking";

const { Title, Text } = Typography;

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Content style={{ padding: 16 }}>
      <Row gutter={5}>
        <Col xs={24} md={12} lg={6}>
          <Card
            size="small"
            style={{ margin: 5, borderRadius: 20, height: 263 }}
          >
            <Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Title level={4}>Welcome Back, Muhammad Azhar</Title>
                  <Text>Here is your overview for today.</Text>
                </div>
                <Avatar size={60} style={{ marginLeft: 5 }} src={userIcon} />
              </div>
            </Row>
            <Row style={{ paddingTop: 50 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "100%",
                  backgroundColor: "#EEF9FF",
                  borderRadius: 5,
                  padding: 10,
                  maxHeight: 45,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/leasing");
                }}
              >
                <Text
                  style={{
                    paddingLeft: 5,
                    color: "#0C377C",
                    fontSize: 20,
                  }}
                  strong
                >
                  18
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontSize: 15,
                  }}
                >
                  new leasing requests
                </Text>
              </div>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card
            title="Total Customers"
            size="small"
            style={{ margin: 5, borderRadius: 20 }}
          >
            <DonutChartsSample />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card
            title="Total Order"
            size="small"
            style={{ margin: 5, borderRadius: 20 }}
          >
            <ColumnChartsSample
              data={BarColData}
              color={["#49ABEB", "#96D3FC"]}
              isGroup={false}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card
            title="Total Sales"
            size="small"
            style={{ margin: 5, borderRadius: 20 }}
          >
            <ColumnChartsSample
              data={BarColData}
              color={["#49ABEB", "#96D3FC"]}
              isGroup={false}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={5}>
        <Col xs={24} md={12} lg={6}>
          <Card
            title="EV Inventory Summary"
            size="small"
            style={{ margin: 5, borderRadius: 20, height: 263 }}
          >
            <RankingRow
              icon={<img src={carIcon} />}
              model="Available"
              value="18"
              type="number"
            />
            <RankingRow
              icon={<img src={carReserved} />}
              model="Reserve"
              value="7"
              type="number"
            />
            <RankingRow
              icon={<img src={carUnderMaintanenced} />}
              model="Under Maintanence"
              value="3"
              status="maintanence"
              type="number"
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card
            title="Best Leasing EVs"
            size="small"
            style={{ margin: 5, borderRadius: 20, height: 263 }}
          >
            <RankingRow
              icon={<img src={top_1} style={{ objectFit: "contain" }} />}
              model="Foton IBlue V6"
              value="10%"
              status="up"
              type="stats"
            />
            <RankingRow
              icon={<img src={top_2} style={{ objectFit: "contain" }} />}
              model="Hyundai IONIQ 5 Lite"
              value="2.3%"
              status="down"
              type="stats"
            />
            <RankingRow
              icon={<img src={top_3} style={{ objectFit: "contain" }} />}
              model="BYD Atto 3"
              value="5.9%"
              status="up"
              type="stats"
            />
          </Card>
        </Col>
        <Col xs={24} md={24} lg={12}>
          <Card
            title="Total Revenue"
            size="small"
            style={{ margin: 5, borderRadius: 20 }}
          >
            <ColumnChartsSample
              data={WeeklyBarColData}
              color={["#35E49D", "#49ABEB"]}
              isGroup={true}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={5}>
        <Col xs={24} md={18}>
          <Card
            title="Sales Overview"
            size="small"
            style={{ margin: 5, borderRadius: 20 }}
          >
            <MultiLineChartsSample />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;
