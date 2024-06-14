import React, { useState, useEffect } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Button, Select, Input, message } from "antd";
import styled from "styled-components";
import AddWidgetFormFactory from "./AddWidgetFormFactory";
import { fetchEquipments } from "../../api/EquipmentsApi";
import { addWidget, fetchLegents } from "../../api/widget-apis";
const ModalBodyContainer = styled.div``;
const FormSelect = styled(Select)`
  width: 150px;
`;
const formTypes = ["live", "aggregation"];
const FormSelectionDropDown = ({ setDataMode }) => {
  return (
    <FormSelect
      defaultValue={"aggregation"}
      onSelect={val => {
        setDataMode(val);
      }}
    >
      {formTypes.map(type => (
        <Select.Option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Select.Option>
      ))}
    </FormSelect>
  );
};

const ModalBody = ({
  dataMode,
  setDataMode,
  handleAddWidget,
  equipments,
  setEquipment,
  SetWidgetName,
  widgetName,
  legends
}) => {
  const onChangeEqupment = value => {
    setEquipment(equipments.find(eq => eq.meterId === value));
  };

  return (
    <ModalBodyContainer>
      <Form>
        <h1>Add Widget</h1>
        <Form.Item label="Widget Name">
          <Input
            defaultValue={widgetName}
            onChange={val => {
              SetWidgetName(val.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Type">
          <FormSelectionDropDown setDataMode={setDataMode} />
        </Form.Item>
        <Form.Item label="Equipment">
          <Select
            showSearch
            defaultValue={equipments[0].meterId}
            onSelect={onChangeEqupment}
          >
            {equipments.map(eq => (
              <Select.Option value={eq.meterId} key={eq.meterId}>
                {eq.applianceName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <AddWidgetFormFactory
          mode={dataMode}
          handleFormSubmit={handleAddWidget}
          legends={legends}
        />
      </Form>
    </ModalBodyContainer>
  );
};

const NewWidgetModal = ({ visible, setVisible, dbId }) => {
  const [equipments, setEquipments] = useState([]);
  const [dataMode, setDataMode] = useState("aggregation");
  const [equipment, setEquipment] = useState();
  const [widgetName, SetWidgetName] = useState("");
  const [legends, setLegends] = useState([]);
  const [addLoading, setAddLoding] = useState(false);
  const handleAddWidget = data => {
    if (widgetName.length >= 3) {
      var requestData = {
        additional_info: JSON.stringify(data),
        dashboard_id: dbId,
        widget_type: dataMode === "live" ? "line" : "bar",
        mode: dataMode,
        equipment_id: equipment.ApplianceId,
        equipmentTypeId: equipment.ApplianceTypeId,
        widget_name: widgetName
      };
      setAddLoding(true);
      addWidget(requestData).then(response => {
        if (response.data.result == true) {
          message.success("Added widget successfully!");
          setVisible(false);
        } else {
          message.error(response.data.msg);
        }
        setAddLoding(false);
      });
    } else {
      message.error("Widget name should have atleast 4 characters");
    }
  };
  useEffect(() => {
    fetchEquipments({}).then(res => {
      if (res.data.data) setEquipments(res.data.data);
      setEquipment(res.data.data[0]);
    });
  }, []);
  useEffect(() => {
    if (equipment) {
      fetchLegents({
        equipment_id: equipment.ApplianceId,
        equipmentTypeId: equipment.ApplianceTypeId,
        chart_type: dataMode
      }).then(res => {
        if (res.data.data) {
          setLegends(res.data.data);
        } else {
          if (dataMode === "live")
            message.warning("Legends:" + res.data.message);
        }
      });
    }
  }, [equipment, dataMode]);
  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      okText={"Create"}
      footer={[
        <Button onClick={() => setVisible(false)}>Cancel</Button>,
        <Button
          form={dataMode === "aggregation" ? "aggregrator" : "live-form"}
          key="submit"
          htmlType="submit"
          type="primary"
          loading={addLoading}
        >
          Submit
        </Button>
      ]}
    >
      <ModalBody
        dataMode={dataMode}
        setDataMode={setDataMode}
        handleAddWidget={handleAddWidget}
        equipments={equipments}
        setEquipment={setEquipment}
        widgetName={widgetName}
        SetWidgetName={SetWidgetName}
        legends={legends}
      />
    </Modal>
  );
};
export default NewWidgetModal;
