import React, { useEffect, useState } from 'react';
import { Col, Row, Layout, Pagination, Spin, message } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Card from '../../utils/Card/index';
import ContentHeader from '../ContentHeader';
import { fetchEquipments } from '../../api/EquipmentsApi';
import { filterAlertsForEquipments } from '../../redux/actions/alertFilterAction';

const { Footer } = Layout;

const EquipmentPageLayout = styled(Layout)`
  margin-top: 28px;
  margin-left: 30px;
  margin-right: 30px;
  && {
    min-height: calc(100vh - 250px);
  }
  @media (max-width: 415px) {
    margin-left: 18px;
    margin-right: 18px;
    padding-bottom: 10px;
  }
`;

const SpinContainer = styled.div`
  // text-align: center;
  margin: 2rem 0;
  height: 380px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Column = styled(Col)`
  padding: 8px 12px;
`;

// const PageFooter = styled(Footer)`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   height: 50px;
//   width: 100%;
//   //border-top: 1px solid #848c94;
//   // position: absolute;
//   // bottom: 0;
//   // right: 0;
//   @media (max-width: 414px) {
//     & .ant-layout-footer {
//       padding: 10px 20px;
//     }
//   }
// `;

const Equipments = () => {
  const [filter, setFilter] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAlertClick = filterData => {
    dispatch(filterAlertsForEquipments(filterData));
    history.push(`/alerts`);
  };

  const changePage = page => {
    setCurrentPage(page);
  };

  const equipmentListing = () => {
    fetchEquipments({
      per_page: 12,
      offset: currentPage - 1,
      search_term: searchTerm && searchTerm,
      filter_option: JSON.stringify({
        companyName: filter.company && filter.company.CompanyName,
        buildingName: filter.building && filter.building.BuildingName,
        floorName: filter.floor && filter.floor.FloorName,
        applianceType:
          filter.equipmentType && filter.equipmentType.EquipmentType,
      }),
    }).then(res => {
      setLoading(false);
      setTotalPage(res.data.totalRecord);
      if (res.data.data) {
        setData(res.data.data);
      } else {
        setData([]);
        message.error(res.data.message);
      }
    });
  };

  const gotoEquipmentDetails = (id, typeId, itemName) => {
    history.push(`/equipments/${id}/${typeId}/${itemName}`);
  };

  useEffect(() => {
    setLoading(true);
    equipmentListing(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filter]);

  return (
    <>
      <ContentHeader
        fetchItems={equipmentListing}
        setSearchTerm={setSearchTerm}
        setFilter={setFilter}
        filter={filter}
        title={t('Equipments')}
      />
      <EquipmentPageLayout>
        {loading ? (
          <SpinContainer>
            <Spin />
          </SpinContainer>
        ) : (
          <Row>
            {data &&
              data.map(equipmentDetails => {
                const item = {
                  applianceName: equipmentDetails.applianceName,
                  ApplianceId: equipmentDetails.ApplianceId,
                  CompanyName: equipmentDetails.CompanyName,
                  BuildingName: equipmentDetails.BuildingName,
                  FloorId: equipmentDetails.FloorId,
                  eqSerialNo: equipmentDetails.eqSerialNo,
                  MakeName: equipmentDetails.MakeName,
                  ModelName: equipmentDetails.MakeName,
                };

                return (
                  <Column xs={24} sm={16} md={12} lg={8} xl={6}>
                    <div>
                      <Card
                        item={item}
                        applianceTypeId={equipmentDetails.ApplianceTypeId}
                        handleAlertClick={handleAlertClick}
                        alertcount={equipmentDetails.alert_count}
                        gotoEquipmentDetails={gotoEquipmentDetails}
                      />
                    </div>
                  </Column>
                );
              })}
          </Row>
        )}
      </EquipmentPageLayout>
      <Row justify="end">
        <Col>
          <Pagination
            defaultCurrent={1}
            total={totalPage}
            onChange={page => changePage(page)}
            size="small"
            pageSize={12}
            style={{ padding: '10px' }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Equipments;
