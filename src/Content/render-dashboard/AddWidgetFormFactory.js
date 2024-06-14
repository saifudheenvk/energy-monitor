import React, { useState, useEffect } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { DatePicker, Select, Input, Row, Col, Checkbox, Slider } from "antd";
import moment from "moment";

const legends = [
  { type: "power", units: ["W", "KW", "mW"] },
  { type: "voltage", units: ["V", "KV"] },
  { type: "current", units: ["A", "mA"] },
  { type: "energy", units: ["unit"] }
];
const dateFormat = "YYYY/MM/DD";
const liveDataLegents = [
  { type: "rms-voltage", unit: ["v", "kv"] },
  { type: "rms-power", unit: ["w", "kw"] }
];
const { RangePicker } = DatePicker;
const aggregation_types = ["yearly", "monthly", "daily", "hourly"];
const LiveDataForm = ({ form, handleFormSubmit, legends }) => {
  const { getFieldDecorator, validateFields } = form;
  const handleSubmit = () => {
    validateFields((errors, values) => {
      console.log("live", values);
      handleFormSubmit({
        ...values,
        legends: legends.filter(leg => values.legends.includes(leg.label))
      });
    });
  };
  useEffect(() => {
    console.log(legends);
  }, [legends]);
  return (
    <Form id="live-form" onSubmit={handleSubmit}>
      <Form.Item label={"Duration"}>
        {
          getFieldDecorator("duration",{
            initialValue:17,
            rules:[{
              required:true,
              message: "Select a duration"
            }]
          })(<Slider  min={10} reverse max={120} tooltipVisible tipFormatter={(val)=>{
            return "Last "+val+" mins"
          }} getTooltipPopupContainer={(node)=>{
            return node.parentNode;
          }}/>)
        }
      </Form.Item>
      <Form.Item label={"Legends"}>
        {getFieldDecorator("legends", {
          rules: [
            {
              required: true,
              message: "Please select atleast one legend"
            }
          ]
        })(
          <Select mode="multiple">
            {legends &&
              legends.map(data => (
                <Select.Option key={data.label}>{data.label}</Select.Option>
              ))}
          </Select>
        )}
      </Form.Item>
    </Form>
  );
};

const AggregationForm = ({ form, handleFormSubmit }) => {
  const { getFieldDecorator, validateFields } = form;
  const handleSubmit = () => {
    validateFields((errors, values) => {
      console.log(values);
      if (!errors) {
        handleFormSubmit(values);
      }
    });
  };
  const [selectedLegend, setSelectedLegend] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  useEffect(() => {
    console.log(selectedLegend);
  }, [selectedLegend]);
  return (
    <Form onSubmit={handleSubmit} layout="vertical" id="aggregrator">
      <Form.Item label="Aggregation-Type">
        {getFieldDecorator("aggregation_type", {
          initialValue: "yearly",
          rules: [
            {
              required: true,
              message: "Please select a aggragtion type"
            }
          ]
        })(
          <Select>
            {aggregation_types.map(type => (
              <Select.Option value={type}>
                {type.charAt(0).toLocaleUpperCase() + type.slice(1)}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="Date-Interval">
        {getFieldDecorator("date-period", {
          initialValue: [moment(new Date()), moment(new Date())],
          rules: [
            {
              required: true,
              message: "Please select a aggragtion type"
            }
          ]
        })(<RangePicker format={dateFormat} />)}
      </Form.Item>
      <Form.Item label="Legends">
        <Row gutter={8}>
          <Col span={3}></Col>
          <Col span={21}>
            <Form.Item label="Type">
              {getFieldDecorator(`legends[0].type`, {
                initialValue: "",
                rules: [
                  {
                    required: true,
                    message: "Please select a type"
                  }
                ]
              })(
                <Select
                  placeholder="select a representation"
                  onSelect={val => {
                    setSelectedIndex(
                      legends.findIndex(item => item.type == val)
                    );
                    setSelectedLegend(legends.find(item => item.type == val));
                  }}
                >
                  {legends.map(leg => (
                    <Select.Option value={leg.type}>
                      {leg.type.charAt(0).toUpperCase() + leg.type.slice(1)}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Unit">
              {getFieldDecorator(`legends[0].unit`, {
                initialValue: "",
                rules: [
                  {
                    required: true,
                    message: "Please select a unit"
                  }
                ]
              })(
                <Select>
                  {selectedLegend &&
                    selectedLegend.units.map(unit => (
                      <Select.Option value={unit}>{unit}</Select.Option>
                    ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
const WrappedAggragationForm = Form.create({ name: "aggregation_form" })(
  AggregationForm
);
const WrappedLiveDataForm = Form.create({ name: "livedata_form" })(
  LiveDataForm
);

const AddWidgetFormFactory = ({ mode, handleFormSubmit, legends }) => {
  switch (mode) {
    case "live":
      return (
        <WrappedLiveDataForm
          handleFormSubmit={handleFormSubmit}
          legends={legends}
        />
      );
    case "aggregation":
      return <WrappedAggragationForm handleFormSubmit={handleFormSubmit} />;
    default:
      return <p>Select FormType</p>;
  }
};
export default AddWidgetFormFactory;
