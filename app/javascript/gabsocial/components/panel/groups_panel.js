import ImmutablePropTypes from 'react-immutable-proptypes'
import ImmutablePureComponent from 'react-immutable-pure-component'
import { defineMessages, injectIntl } from 'react-intl'
import PanelLayout from './panel_layout'
import GroupListItem from '../group_list_item'
import Button from '../button'

const messages = defineMessages({
  title: { id: 'groups.sidebar-panel.title', defaultMessage: 'Groups you\'re in' },
  show_all: { id: 'groups.sidebar-panel.show_all', defaultMessage: 'Show all' },
  all: { id: 'groups.sidebar-panel.all', defaultMessage: 'All' },
})

const mapStateToProps = (state) => ({
  groupIds: state.getIn(['group_lists', 'member']),
})

export default @connect(mapStateToProps)
@injectIntl
class GroupSidebarPanel extends ImmutablePureComponent {
  static propTypes = {
    groupIds: ImmutablePropTypes.list,
  }

  render() {
    const { intl, groupIds } = this.props
    const count = groupIds.count()

    if (count === 0) return null

    return (
      <PanelLayout
        title={intl.formatMessage(messages.title)}
        headerButtonTitle={intl.formatMessage(messages.all)}
        headerButtonTo='/groups/browse/member'
        footerButtonTitle={count > 6 ? intl.formatMessage(messages.show_all) : undefined}
        footerButtonTo={count > 6 ? '/groups/browse/member' : undefined}
      >
        <div className={_s.default}>
          {
            groupIds.slice(0, 6).map(groupId => (
              <GroupListItem key={`group-panel-item-${groupId}`} id={groupId} />
            ))
          }
        </div>
      </PanelLayout>
    )
  }
}