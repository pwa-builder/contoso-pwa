import { Providers, ProviderState } from '@microsoft/mgt';
import { LitElement, css, html, customElement } from 'lit-element';

import '../components/background-map';

@customElement('app-login')
export class AppLogin extends LitElement {
    static get styles() {
        return css`
            .map-wrapper {
                background-color: black;
                position: absolute;
                top: 0;
                width: 100vw;
                height: 100vh;
                opacity: 0.6;
            }

            .login {
                position: absolute; 
                left: 0; 
                right: 0; 
                top: 0;
                margin-left: auto; 
                margin-right: auto; 
                margin-top: 150px;
                width: 200px;
                padding: 80px;
                background-color: #ffffff;
                box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.03);
                border-radius: 5px;
                color: #14142b;
            }

            mgt-login {
                --button-background-color: #0078d4;
                --button-background-color--hover: #005a9e;
                --button-color: #ffffff;
                --button-color-hover: #edebe9;
                --font-size: 12px;
                --font-weight: 400;
                --width: 105px;
                --margin: 20px 0;
            }
        `;
    }

    constructor() {
        super();
    }

    render() {
        return html`
        <div>
            <div class="map-wrapper">
                <background-map></background-map>
            </div>
            <div class="login-wrapper">
                <div class="login">
                    <img id="logo" src="/assets/contosoPWALogo.svg" alt="Contoso Emergency Response">
                    <h2>Let's Start!</h2>
                    <span>Please login to your account to access emergencies and take action!</span>
                    <mgt-login></mgt-login>
                </div>
            </div>
        </div>
      `;
    }
}