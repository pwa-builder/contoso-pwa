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

        animation-name: slidein;
        animation-duration: 240ms;

        overflow: auto;
      }

      #sideBar::-webkit-scrollbar {
        background: grey;
        width: 5px;
      }

      #sideBar::-webkit-scrollbar-track {
        background: lightgrey;
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

      #filterByType,
      #filterByStatus {
        background: #f9f9f9;
        width: -webkit-fill-available;
      }

      #filterByType h2,
      #filterByStatus h2 {
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

      #disList li ion-icon {
        margin-right: 10px;
        width: 33px;
        height: 25px;
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
        justify-content: space-between;
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

  filterDist(type: string) {
    let event = new CustomEvent('filter-dist', {
      detail: {
        type,
      },
    });
    this.dispatchEvent(event);
  }

  filterStatus(status: string, checked: boolean) {
    if (checked === true) {
      let event = new CustomEvent('filter-status', {
        detail: {
          status,
        },
      });
      this.dispatchEvent(event);
    }
  }

  render() {
    return html`
      <div id="sideBar">
        <img
          id="logo"
          src="/assets/contosoPWALogo.svg"
          alt="Contoso Emergency Response"
        />

        <slot>
          <section id="user">
            <div>
              <h2>Hello Megan!</h2>

              <p>You have 2 emergency requests today!</p>
            </div>

            <ul id="userEmers">
              <a href="/about">
                <li>
                  <img
                    src="/assets/appIcons/wildfire.svg"
                    alt="wildfire icon"
                  />
                  Okanagan Wildfire
                  <img
                    class="forward"
                    src="/assets/appIcons/forwardArrow.svg"
                    alt="more info"
                  />
                </li>
              </a>

              <li>
                <img src="/assets/appIcons/flood.svg" alt="flood icon" />
                Cedar River flooding
                <img
                  class="forward"
                  src="/assets/appIcons/forwardArrow.svg"
                  alt="more info"
                />
              </li>
            </ul>
          </section>

          <section id="filterByStatus">
            <h2>Filter by Status</h2>

            <ul id="filterList">
              <li>
                <input
                  @change="${(ev) =>
                    this.filterStatus('All', ev.target.checked)}"
                  type="checkbox"
                />
                All
              </li>
              <li>
                <input
                  @change="${(ev) =>
                    this.filterStatus('Needs Attention', ev.target.checked)}"
                  type="checkbox"
                />
                Needs Attention
              </li>
              <li
                @change="${(ev) =>
                  this.filterStatus('Team Assigned', ev.target.checked)}"
              >
                <input type="checkbox" />
                Team Assigned
              </li>
              <li
                @change="${(ev) =>
                  this.filterStatus('Team Deployed', ev.target.checked)}"
              >
                <input type="checkbox" />
                Team Deployed
              </li>
              <li
                @change="${(ev) =>
                  this.filterStatus('Cleanup', ev.target.checked)}"
              >
                <input type="checkbox" />
                Cleanup
              </li>
              <li
                @change="${(ev) =>
                  this.filterStatus('Done', ev.target.checked)}"
              >
                <input type="checkbox" />
                Done
              </li>
            </ul>
          </section>

          <section id="filterByType">
            <h2>Filter by Emergency</h2>

            <ul id="disList">
              <li @click="${() => this.filterDist('All')}">
                <ion-icon name="refresh-outline"></ion-icon>
                Reset
              </li>
              <li @click="${() => this.filterDist('tsunami')}">
                <img src="/assets/appIcons/tsunami.svg" alt="tsunami icon" />
                Tsunami
              </li>
              <li @click="${() => this.filterDist('flood')}">
                <img src="/assets/appIcons/flood.svg" alt="flood icon" />
                Flood
              </li>
              <li @click="${() => this.filterDist('wildfire')}">
                <img src="/assets/appIcons/wildfire.svg" alt="wildfire icon" />
                Wildfire
              </li>
              <li @click="${() => this.filterDist('earthquake')}">
                <img
                  src="/assets/appIcons/earthquake.svg"
                  alt="earthquake icon"
                />
                Earthquakes
              </li>
              <li @click="${() => this.filterDist('volcano')}">
                <img src="/assets/appIcons/volcano.svg" alt="volcano icon" />
                Volcano
              </li>
            </ul>
          </section>
        </slot>

        <section id="signedIn">
          <!-- Mgt-login !-->
        </section>
      </div>
    `;
  }
}
