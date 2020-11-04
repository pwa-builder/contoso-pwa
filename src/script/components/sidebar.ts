import { LitElement, css, html, customElement, property } from 'lit-element';

@customElement('side-bar')
export class SideBar extends LitElement {
    @property({ type: String }) title: string = 'Contoso Emergency Response';

    static get styles() {
        return css`

          #sideBar {
            position: fixed;
            background: white;
            color: black;
            top: 0;
            left: 0;
            bottom: 0;
            width: 20em;
            box-shadow: 0px 16px 15px 0px rgba(0, 0, 0, 0.11);

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-evenly;

            animation-name: slidein;
            animation-duration: 240ms;
          }

          #logo {
            padding-top: 1.6em;
            padding-left: 2em;
            height: 140px;
            width: 179px;
          }

          section {
            padding-left: 2em;
            padding-right: 1em;
          }

          #user {
            background: rgb(255, 250, 238);
          }

          #user h2 {
            font-style: normal;
            font-weight: bold;
            font-size: 28px;
            line-height: 29px;
            letter-spacing: 0.57631px;
            max-width: 4em;
          }

          #user p {
            font-weight: normal;
            font-size: 14px;
            line-height: 22px;
            letter-spacing: 0.432232px;
            margin-top: 16px;
            margin-bottom: 20px;
          }

          #filterByType, #filterByStatus {
            background: #F9F9F9;
            width: -webkit-fill-available;
          }

          #filterByType h2, #filterByStatus h2 {
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: 22px;
            margin-top: 12px;
          }

          #disList li {
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          li img {
              width: 32px;
              height: 32px;
              margin-right: 10px;
          }

          #signedIn {
            width: -webkit-fill-available;
          }

          #userEmers li {
            display: flex;
            align-items: center;
          }

          .forward {
            margin-left: 10px;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            margin-bottom: 1em;
          }

          ul a {
            color: initial;
            text-decoration: none;
          }

          @keyframes slidein {
              from {
                  opacity: 0;
                  transform: translateX(-120px);
              }

              to {
                  opacity: 1;
                  transform: translateX(0);
              }
          }

    `;
    }

    constructor() {
        super();
    }

    render() {
        return html`
        <div id="sideBar">
          <img id="logo" src="/assets/contosoPWALogo.svg" alt="Contoso Emergency Response">

          <slot>
          <section id="user">
            <div>
              <h2>Hello Megan!</h2>

              <p>You have 2 emergency requests today!</p>
            </div>

            <ul id="userEmers">
              <a href="/about">
                <li>
                  <img src="/assets/appIcons/wildfire.svg" alt="wildfire icon">
                  Okanagan Wildfire
                  <img class="forward" src="/assets/appIcons/forwardArrow.svg" alt="more info">
                </li>
              </a>
              
              <li>
                <img src="/assets/appIcons/flood.svg" alt="flood icon">
                Cedar River flooding
                <img class="forward" src="/assets/appIcons/forwardArrow.svg" alt="more info">
              </li>
            </ul>
          </section>

          <section id="filterByStatus">
            <h2>Filter by Status</h2>

            <ul id="filterList">
              <li>
                <input type="checkbox">
                Needs Attention
              </li>
              <li>
                <input type="checkbox">
                Team Assigned
              </li>
              <li>
                <input type="checkbox">
                Team Deployed
              </li>
              <li>
                <input type="checkbox">
                Cleanup
              </li>
              <li>
                <input type="checkbox">
                Done
              </li>
            </ul>
          </section>

          <section id="filterByType">
            <h2>Filter by Emergency</h2>

            <ul id="disList">
              <li>
                <img src="/assets/appIcons/tsunami.svg" alt="tsunami icon">
                Tsunami
              </li>
              <li>
                <img src="/assets/appIcons/flood.svg" alt="flood icon">
                Flood
              </li>
              <li>
                <img src="/assets/appIcons/wildfire.svg" alt="wildfire icon">
                Wildfire
              </li>
              <li>
                <img src="/assets/appIcons/earthquake.svg" alt="earthquake icon">
                Earthquakes
              </li>
              <li>
                <img src="/assets/appIcons/volcano.svg" alt="volcano icon">
                Volcano
              </li>
            </ul>
          </section>
          </slot>

          <section id="signedIn">
            <h4>Megan Roberts</h4>
          </section>
        </div>
    `;
    }
}
