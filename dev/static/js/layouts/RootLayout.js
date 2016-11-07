import { bindActionCreators } from 'redux';
import { connect } from  'react-redux';
import * as actionCreators from '../actions/actionCreator';
import Header from '../views/Header';

function mapStateToProps(state) {
    return {
       
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const RootLayout = connect(mapStateToProps, mapDispatchToProps)(Header);

export default RootLayout;
