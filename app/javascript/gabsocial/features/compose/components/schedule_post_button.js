import { injectIntl, defineMessages } from 'react-intl'
import { openModal } from '../../../actions/modal'
import { closePopover, openPopover } from '../../../actions/popover'
import { me } from '../../../initial_state'
import ComposeExtraButton from './compose_extra_button'

// import 'react-datepicker/dist/react-datepicker.css'

const messages = defineMessages({
  schedule_status: { id: 'schedule_status.title', defaultMessage: 'Schedule' },
})

const mapStateToProps = (state) => ({
  active: !!state.getIn(['compose', 'scheduled_at']) || state.getIn(['popover', 'popoverType']) === 'DATE_PICKER',
  isPro: state.getIn(['accounts', me, 'is_pro']),
})

const mapDispatchToProps = (dispatch) => ({
  onOpenDatePickerPopover(targetRef) {
    dispatch(openPopover('DATE_PICKER', {
      targetRef,
    }))
  },

  onCloseDatePickerPopover() {
    dispatch(closePopover())
  },

  onOpenProUpgradeModal() {
    dispatch(openModal('PRO_UPGRADE'))
  },
})

export default
@injectIntl
@connect(mapStateToProps, mapDispatchToProps)
class SchedulePostDropdown extends PureComponent {

  static propTypes = {
    active: PropTypes.bool.isRequired,
    intl: PropTypes.object.isRequired,
    isPro: PropTypes.bool,
    onOpenProUpgradeModal: PropTypes.func.isRequired,
    onOpenDatePickerPopover: PropTypes.func.isRequired,
    onCloseDatePickerPopover: PropTypes.func.isRequired,
    small: PropTypes.bool,
  }

  handleToggle = () => {
    if (!this.props.isPro) {
      this.props.onOpenProUpgradeModal()
    } else {
      this.props.onOpenDatePickerPopover(this.button)
    }
  }

  setButton = (n) => {
    this.button = n
  }

  render () {
    const {
      active,
      intl,
      small,
    } = this.props

    return (
      <ComposeExtraButton
        active={active}
        buttonRef={this.setButton}
        icon='calendar'
        onClick={this.handleToggle}
        small={small}
        title={intl.formatMessage(messages.schedule_status)}
      />
    )
  }

}
