/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-restricted-globals */
import React from 'react';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import DataLayer from 'components/commons/google-tag-manager/data-layer';
import { pushObjectField } from 'components/commons/google-tag-manager/data-extractor';

const dataLayerPages = {
  home: 'ana-sayfa',
  'listing-search': 'ilan-listeleme',
  'listing-detail': 'ilan-detay',
  signin: 'uye-girisi',
  '404': '4xx',
  '500': '5xx',
  'signup-individual': 'bireysel-kayit',
  'signup-corporate': 'kurumsal-kayit',
};

class MasterDataLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLayerParams: [],
    };
  }

  componentDidMount() {
    Router.beforePopState(({ as }) => {
      location.href = as;
    });

    const user = JSON.parse(localStorage.getItem('ej-user-data'));

    const loginStatus = user ? 'yes' : 'no';
    const userType = !!user && (user.accountType === 'CORPORATE' ? 'customer' : 'user');
    const userId = !!user && user.id;

    const { router } = this.props;
    const page = router && router.route.substr(1);
    const pageType = this.getPage(page);

    const newSite = 'evet';

    const dataLayer = [];

    pushObjectField(dataLayer, 'login_status', loginStatus);
    pushObjectField(dataLayer, 'uye_tip', userType);
    pushObjectField(dataLayer, 'uye_id', userId);
    pushObjectField(dataLayer, 'sayfa_tip', pageType);
    pushObjectField(dataLayer, 'yeni_site', newSite);
    this.setState({ dataLayerParams: dataLayer });
  }

  // eslint-disable-next-line class-methods-use-this
  getPage(page) {
    const { router } = this.props;
    if (dataLayerPages[page]) return dataLayerPages[page];
    if (router.asPath.includes('jetsat')) {
      return 'jetsat';
    }
    return null;
  }

  render() {
    const { dataLayerParams } = this.state;
    return <>{dataLayerParams.length > 0 && <DataLayer params={dataLayerParams} />}</>;
  }
}

MasterDataLayer.propTypes = {
  router: PropTypes.shape({}),
};

export default withRouter(MasterDataLayer);
