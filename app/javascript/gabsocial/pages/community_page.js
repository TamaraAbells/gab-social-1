import { Fragment } from 'react'
import { defineMessages, injectIntl } from 'react-intl'
import { openModal } from '../actions/modal'
import PageTitle from '../features/ui/util/page_title'
import GroupSidebarPanel from '../components/panel/groups_panel'
import LinkFooter from '../components/link_footer'
import WhoToFollowPanel from '../components/panel/who_to_follow_panel'
import ProgressPanel from '../components/panel/progress_panel'
import TrendsPanel from '../components/panel/trends_panel'
import DefaultLayout from '../layouts/default_layout'
import TimelineComposeBlock from '../components/timeline_compose_block'
import Divider from '../components/divider'

const messages = defineMessages({
  community: { 'id': 'column.community', 'defaultMessage': 'Community feed' },
})

const mapDispatchToProps = (dispatch) => ({
  onOpenCommunityPageSettingsModal() {
    dispatch(openModal('COMMUNITY_TIMELINE_SETTINGS'))
  },
})

export default
@injectIntl
@connect(null, mapDispatchToProps)
class CommunityPage extends PureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    onOpenCommunityPageSettingsModal: PropTypes.func.isRequired,
  }

  render() {
    const { intl, children, onOpenCommunityPageSettingsModal } = this.props

    const title = intl.formatMessage(messages.community)

    return (
      <DefaultLayout
        title={title}
        actions={[
          {
            icon: 'ellipsis',
            onClick: onOpenCommunityPageSettingsModal,
          },
        ]}
        layout={(
          <Fragment>
            <ProgressPanel />
            <TrendsPanel />
            <WhoToFollowPanel />
            <GroupSidebarPanel />
            <LinkFooter />
          </Fragment>
        )}
      >
        <PageTitle path={title} />
        <TimelineComposeBlock autoFocus={false} />
        <Divider />
        {children}
      </DefaultLayout>
    )
  }
}