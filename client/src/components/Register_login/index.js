import React from 'react';
import Button from '../../utils/Button';
import Login from './Login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customer</h1>
                        <p>Please register to have a smooth shopping experience.</p>

                        <Button 
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyle={{
                                margin: '10px 0 0 0 '
                            }}
                        />
                    </div>

                    <div className="right">
                        <h2>Registered customer</h2>
                        <p>If you have an account, please log in.</p>
                        <Login />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default RegisterLogin;