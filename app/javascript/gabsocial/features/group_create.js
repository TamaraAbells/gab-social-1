import ImmutablePropTypes from 'react-immutable-proptypes'
import ImmutablePureComponent from 'react-immutable-pure-component'
import { defineMessages, injectIntl } from 'react-intl'
import isObject from 'lodash.isobject'
import {
	changeGroupTitle,
	changeGroupDescription,
	changeGroupCoverImage,
	submit,
	setGroup,
	resetEditor,
} from '../actions/group_editor'
import ColumnIndicator from '../components/column_indicator'
import Button from '../components/button'
import Divider from '../components/divider'
import Input from '../components/input'
import Text from '../components/text'
import Form from '../components/form'
import Textarea from '../components/textarea'
import FileInput from '../components/file_input'

const messages = defineMessages({
	title: { id: 'groups.form.title', defaultMessage: 'Enter a new group title' },
	description: { id: 'groups.form.description', defaultMessage: 'Enter the group description' },
	coverImage: { id: 'groups.form.coverImage', defaultMessage: 'Upload a banner image' },
	coverImageChange: { id: 'groups.form.coverImageChange', defaultMessage: 'Banner image selected' },
	create: { id: 'groups.form.create', defaultMessage: 'Create group' },
	update: { id: 'groups.form.update', defaultMessage: 'Update group' },
	titlePlaceholder: { id: 'groups.form.title_placeholder', defaultMessage: 'New group title...' },
	descriptionPlaceholder: { id: 'groups.form.description_placeholder', defaultMessage: 'Some group description...' },
})

const mapStateToProps = (state, { params }) => {
	const groupId = isObject(params) ? params['id'] : null
	const group = state.getIn(['groups', groupId])

	return {
		group,
		error: groupId && !group,
		titleValue: state.getIn(['group_editor', 'title']),
		descriptionValue: state.getIn(['group_editor', 'description']),
		coverImage: state.getIn(['group_editor', 'coverImage']),
		isSubmitting: state.getIn(['group_editor', 'isSubmitting']),
	}
}

const mapDispatchToProps = (dispatch) => ({
	onTitleChange: (value) => {
		dispatch(changeGroupTitle(value))
	},
	onDescriptionChange: (value) => {
		dispatch(changeGroupDescription(value))
	},
	onCoverImageChange: (imageData) => {
		console.log("imageData:", imageData)
		dispatch(changeGroupCoverImage(imageData))
	},
	onResetEditor: () => {
		dispatch(resetEditor())
	},
	onSetGroup: (group) => {
		dispatch(setGroup(group))
	},
	onSubmit: (routerHistory) => dispatch(submit(routerHistory)),
})

export default
@injectIntl
@connect(mapStateToProps, mapDispatchToProps)
class GroupCreate extends ImmutablePureComponent {

	static contextTypes = {
		router: PropTypes.object
	}

	static propTypes = {
		group: ImmutablePropTypes.map,
		titleValue: PropTypes.string.isRequired,
		descriptionValue: PropTypes.string.isRequired,
		coverImage: PropTypes.object,
		intl: PropTypes.object.isRequired,
		onTitleChange: PropTypes.func.isRequired,
		onDescriptionChange: PropTypes.func.isRequired,
		onResetEditor: PropTypes.func.isRequired,
		onSetGroup: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
		isSubmitting: PropTypes.bool,
	}

	updateOnProps = [
		'group',
		'titleValue',
		'descriptionValue',
		'coverImage',
		'isSubmitting',
	]

	componentDidMount() {
		if (!this.props.group) {
			this.props.onResetEditor()
		} else {
			this.props.onSetGroup(this.props.group)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.group !== nextProps.group && !!nextProps.group) {
			this.props.onSetGroup(nextProps.group)
		}
	}

	handleCoverImageChange = (e) => {
		this.props.onCoverImageChange(e.target.files[0])
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.context.router.history)
	}

	render() {
		const {
			group,
			error,
			titleValue,
			descriptionValue,
			coverImage,
			intl,
			onTitleChange,
			onDescriptionChange,
			isSubmitting,
			onSubmit,
		} = this.props

		if (!group && error) {
			return <ColumnIndicator type='missing' />
		}

		return (
			<Form onSubmit={onSubmit}>
				<Input
					title={intl.formatMessage(messages.title)}
					value={titleValue}
					onChange={onTitleChange}
					disabled={isSubmitting}
					placeholder={intl.formatMessage(messages.titlePlaceholder)}
				/>

				<Divider isInvisible />

				<Textarea
					title={intl.formatMessage(messages.description)}
					value={descriptionValue}
					onChange={onDescriptionChange}
					placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
					disabled={isSubmitting}
				/>

				<Divider isInvisible />

				<FileInput
					disabled={isSubmitting}
					title={intl.formatMessage(coverImage === null ? messages.coverImage : messages.coverImageChange)}
					onChange={this.handleCoverImageChange}
					width='340px'
					height='145px'
				/>

				<Divider isInvisible />

				<Button
					isDisabled={!titleValue || !descriptionValue && !isSubmitting}
					onClick={this.handleSubmit}
				>
					<Text color='inherit' align='center'>
						{intl.formatMessage(!!group ? messages.update : messages.create)}
					</Text>
				</Button>

			</Form>
		)
	}

}
