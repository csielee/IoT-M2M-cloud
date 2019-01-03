import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SaveButton } from 'react-admin';
import Done from '@material-ui/icons/Done'

class ChangeButton extends Component {
    handleClick = ()=>{
        const { basePath, handleSubmit, redirect} = this.props;

        return handleSubmit(value => {
            console.log(value);
        });
    };

    render() {
        const { handleSubmitWithRedirect, ...props } = this.props;

        return (<SaveButton handleSubmitWithRedirect={this.handleClick} label="change" icon={<Done/>} {...props}/>);
    }
}

export default connect(undefined,undefined)(ChangeButton);