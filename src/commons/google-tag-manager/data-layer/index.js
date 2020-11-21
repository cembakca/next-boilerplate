/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

class DataLayer extends React.Component {
  componentDidMount() {
    const { delay, params, dataLayerName, inlineScriptMode } = this.props;

    if (inlineScriptMode) {
      return;
    }

    const dataObject = window ? window[dataLayerName || 'dataLayer'] : [];
    if (!dataObject) return;

    if (delay) {
      setTimeout(() => {
        this.appendDataLayer(dataObject, params);
      }, delay);
    } else {
      this.appendDataLayer(dataObject, params);
    }
  }

  createDataLayerObject = (params) => {
    const paramObject = {};

    params.map((param) => {
      paramObject[param.key] = param.value;
      return null;
    });
    return paramObject;
  };

  appendDataLayer = (dataLayerTarget, params) => {
    if (params.length > 0) {
      const dataLayerObject = this.createDataLayerObject(params);
      dataLayerTarget.push(dataLayerObject);
    }
  };

  render() {
    const { params, dataLayerName, inlineScriptMode } = this.props;
    const dataLayerObjectName = dataLayerName || 'dataLayer';
    const dataLayerObject = this.createDataLayerObject(params);

    return inlineScriptMode ? (
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: `${dataLayerObjectName}.push(${JSON.stringify(dataLayerObject)});` }}
      />
    ) : null;
  }
}

DataLayer.propTypes = {
  delay: PropTypes.number,
  params: PropTypes.array,
  inlineScriptMode: PropTypes.bool,
  dataLayerName: PropTypes.string,
};

export default DataLayer;
