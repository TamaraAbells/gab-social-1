import SearchResults from '../components/search_results';
import { fetchSuggestions, dismissSuggestion } from '../../../actions/suggestions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
  results: state.getIn(['search', 'results']),
  suggestions: state.getIn(['suggestions', 'items']),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSuggestions: () => dispatch(fetchSuggestions()),
  dismissSuggestion: account => dispatch(dismissSuggestion(account.get('id'))),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));
