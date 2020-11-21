import PropTypes from 'prop-types';

import { GTMPushEvent } from 'helpers/google-tag-manager';

/**
 *
 * Form GTM Events
 */

export const formGTMEvent = ({ action = 'click', label }) => {
  GTMPushEvent({ Category: 'form', Action: action, Label: label, event: 'gaEvent' });
};

formGTMEvent.propTypes = {
  label: PropTypes.string,
  action: PropTypes.oneOf(['click', 'success']),
};
