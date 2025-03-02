import { css } from "@emotion/react";
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropagateLoader  from "react-spinners/RotateLoader";
import useAuth from '../hooks/useAuth';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading  } = useAuth();
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <PropagateLoader  color="#fa497e" css={override} size={25} />
            </div>
        )
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.displayName ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute