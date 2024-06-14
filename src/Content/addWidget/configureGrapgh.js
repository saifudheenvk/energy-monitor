/* eslint-disable camelcase */
// function insertAt(array, index, ...elementsArray) {
//   array.splice(index, 0, ...elements);
// }

export const addHorizontalAnnotationRow = (list, setList, annotation_for) => {
  const row = {
    type: 'horizontal',
    color: '#ef5959',
    label: 'BreakPoint',
    annotation_for,
    value: 0,
  };
  setList([...list, row]);
};

export const removeHorizontalAnnotationRow = (list, setList, index) => {
  setList(list.filter((item, i) => i !== index));
};

export const addVerticalAnnotationRow = (list, setList) => {
  const row = {
    type: 'vertical',
    color: '#ef5959',
    label: 'Annotation',
    value: new Date(),
  };
  setList([...list, row]);
};
export const removeVericalAnnotation = (list, setList, index) => {
  setList(list.filter((item, i) => i !== index));
};
export const changeAxisAnnotationColor = (list, setList, index, color) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  record.color = color;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
};
export const changeLabelInput = (list, setList, index, label) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  record.label = label;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
};
export const changeAnnoatationInput = (list, setList, index, value) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  record.value = value;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
};
export const changeAnnotationVital = (list, setList, index, vital) => {
  const record = list.find((item, i) => {
    return i === index;
  });
  record.annotation_for = vital;
  const updatedList = list.map(item => ({ ...item }));
  setList(updatedList);
};
