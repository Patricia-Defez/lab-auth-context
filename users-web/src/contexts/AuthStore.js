import React, { Component } from 'react';

const AuthContext = React.createContext();

const currentUser = {}

class AuthStore extends Component {
    state = {
        user: currentUser
    }


    handleUserChange = (user) => {
        this.setState({ currentUser: user})
        if (user) {localStorage.setItem(currentUser, JSON.stringify(user))
        }else {localStorage.removeItem(currentUser) } 
    }

    isAuthenticated = () => {
        return this.state.user && this.state.email
    }

    render() {
        return (
            <AuthContext.Provider value={{
                user: this.state.user,
                onUserChange: this.handleUserChange,
                isAuthenticated: this.isAuthenticated

            }}>
            {this.props.children}
            </AuthContext.Provider>
        );

    }

}

// HOC
const withAuthConsumer = (Component) => {
    return (props) => (
      <AuthContext.Consumer>
        {(storeProps) => (<Component {...storeProps} {...props} />)}
      </AuthContext.Consumer>
    )
  }

export { AuthStore, AuthContext, withAuthConsumer}