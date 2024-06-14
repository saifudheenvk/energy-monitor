import { message } from 'antd';
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
// Utility functions for number annoatation tables

// add new number annotation
const getDefaultValue = (list, annotation_for, type, existing) => {
  // const equalValues = list
  //   .filter(l => l.type === 'EQUAL_TO' && l.annotation_for === annotation_for)
  //   .map(l => l.value);

  const lessValues = list
    .filter(l => l.type === 'LESS_THAN' && l.annotation_for === annotation_for)
    .map(l => l.value);

  const greaterValues = list
    .filter(
      l => l.type === 'GREATER_THAN' && l.annotation_for === annotation_for
    )
    .map(l => l.value);

  const maxValue =
    greaterValues.length !== 0 ? Math.min(...greaterValues) : false;
  const minValue = lessValues.length !== 0 ? Math.max(...lessValues) : false;
  switch (type) {
    case 'EQUAL_TO':
      // if (minValue !== false && maxValue !== false) {
      //   if (minValue <= existing && existing <= maxValue)
      //     return { value: existing, message: 'success' };
      //   return {
      //     value: Math.random() * (maxValue - minValue) + minValue,
      //     message:
      //       "Value should be less than smaller 'GREATER THAN' type and greater  than bigger 'LESS THAN' type ",
      //   };
      // }
      // if (maxValue !== false) {
      //   if (maxValue >= existing)
      //     return { value: existing, message: 'success' };
      //   return {
      //     value: maxValue - Math.random(),
      //     message: "Value should be less than smaller 'GREATER THAN' type ",
      //   };
      // }
      // if (minValue !== false) {
      //   if (existing <= minValue)
      //     return { value: existing, message: 'success' };
      //   return {
      //     value: minValue + Math.random(),
      //     message: "Value should be greater than biggger 'LESS THAN' type ",
      //   };
      // }
      return { value: existing, message: 'success' };
    case 'GREATER_THAN':
      // if (equalValues.length !== 0) {
      //   if (Math.max(...equalValues) <= existing)
      //     return { value: existing, message: 'success' };
      //   return {
      //     value: Math.max(...equalValues) + Math.random(),
      //     message: 'Value should be greater than biggest EQUAL TO type',
      //   };
      // }
      if (minValue !== false) {
        if (minValue <= existing)
          return { value: existing, message: 'success' };
        return {
          value: minValue + Math.random(),
          message: "Value should be greater than biggest 'LESS THAN' type ",
        };
      }
      return { value: existing, message: 'success' };
    case 'LESS_THAN':
      // if (equalValues.length !== 0) {
      //   if (Math.min(...equalValues) >= existing)
      //     return { value: existing, message: 'success' };
      //   return {
      //     value: Math.min(...equalValues) - Math.random(),
      //     message: 'Value should be less than smallest EQUAL TO type',
      //   };
      // }
      if (maxValue !== false) {
        if (maxValue >= existing)
          return { value: existing, message: 'success' };
        return {
          value: maxValue - Math.random(),
          message: "Value should be less than smaller 'GREATER THAN' type ",
        };
      }
      return { value: existing, message: 'success' };
    default:
      return { value: existing, message: 'success' };
  }
};

export const addAnnotationRow = (list, setList, annotation_for) => {
  setList(prevState => [
    ...prevState,
    {
      type: 'EQUAL_TO',
      color: '#ef5959',
      label: 'BreakPoint',
      annotation_for: annotation_for,
      value: getDefaultValue(prevState, annotation_for, 'EQUAL_TO', 0).value,
    },
  ]);
};

// remove number annotation
export const removeAnnotationRow = (list, setList, index) => {
  setList(list.filter((item, i) => i !== index));
};
// change anotation Color
export const changeAnnotationColor = (list, setList, index, color) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  record.color = color;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
};

export const changeAnnotationLabel = (list, setList, index, label) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  record.label = label;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
};

export const changeAnnotationValue = (list, setList, index, value) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  record.value = value;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
};

export const validateValue = (list, setList, index) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  const filtered = list.filter((item, i) => i !== index);
  const newValue = getDefaultValue(
    filtered,
    record.annotation_for,
    record.type,
    record.value
  );
  record.value = newValue.value;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
  if (newValue.message !== 'success') message.error(newValue.message);
};

export const changeAnnotationType = (list, setList, index, type) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  const filtered = list.filter((item, i) => i !== index);
  record.type = type;
  record.value = getDefaultValue(
    filtered,
    record.annotation_for,
    type,
    record.value
  ).value;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
};
export const changeAnnotationVital = (list, setList, index, vital) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  record.annotation_for = vital;
  const filtered = list.filter((item, i) => i !== index);
  record.value = getDefaultValue(
    filtered,
    vital,
    record.type,
    record.value
  ).value;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
};
