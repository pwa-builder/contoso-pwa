import { LitElement, css, html, customElement, property } from 'lit-element';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';

import '../components/background-map';
import '../components/sidebar';
import '../pages/app-login';
import '../components/pin';
import { Providers, ProviderState } from '@microsoft/mgt';

@customElement('app-home')
export class AppHome extends LitElement {

  @property() defaultPins: any[] = [
    {
      type: "earthquake",
      status: "Team Deployed",
      containment: "40%"
    },
    {
      type: "earthquake",
      status: "Team Assigned",
      containment: "0%"
    },
    {
      type: "flood",
      status: "Cleanup",
      containment: "98%"
    },
    {
      type: "flood",
      status: "Done",
      containment: "100%"
    },
    {
      type: "flood",
      status: "Team Assigned",
      containment: "10%"
    },
    {
      type: "wildfire",
      status: "Team Deployed",
      containment: "24%"
    },
    {
      type: "wildfire",
      status: "Team Deployed",
      containment: "44%"
    },
    {
      type: "wildfire",
      status: "Team Deployed",
      containment: "67%"
    },
    {
      type: "tsunami",
      status: "Team Assigned",
      containment: "2%"
    },
    {
      type: "tsunami",
      status: "Team Deployed",
      containment: "27%"
    }
  ];

  @property() pins: any[] = [];

  static get styles() {
    return css`
      fast-card {
        padding: 18px;
        padding-top: 0px;
        margin-top: 10px;
      }

      pwa-install {
        position: absolute;
        bottom: 16px;
        right: 16px;
      }

      aside {
        position: fixed;
        top: 5em;
        left: 1em;
        z-index: 9;
      }

      .gridFilter {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px;
      }

      #alerts {
        list-style: none;
        padding: 0;
        color: red;
        font-weight: bold;
      }

      #alerts li, #alerts fast-anchor::part(control) {
        border: solid 1px;
        padding: 8px;
        margin-top: 10px;
        color: red;
      }

      #alerts fast-anchor {
        width: 100%;
      }

      .background {
        margin-left: 20em;
      }

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
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    this.pins = this.defaultPins;

  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      })
    }
  }

  handleDistFilter(type: string) {
    console.log(type);

    if (type === "All") {
      this.pins = this.defaultPins;
    }
    else {
      let tempPins = [];

      this.defaultPins.forEach((pin) => {
        if (pin.type === type) {
          tempPins.push(pin);
        }
      });

      this.pins = tempPins;
    }

  }

  handleStatusFilter(status: string) {
    console.log(status);

    if (status === "All") {
      this.pins = this.defaultPins;
    }
    else {
      let tempPins = [];

      this.defaultPins.forEach((pin) => {
        if (pin.status === status) {
          tempPins.push(pin);
        }
      });

      this.pins = tempPins;
    }
  }

  render() {
    return html`
      <side-bar @filter-dist="${(e) => this.handleDistFilter(e.detail.type)}" @filter-status="${(e) => this.handleStatusFilter(e.detail.status)}"></side-bar>
      <background-map class='background'></background-map>

      ${
        this.pins.map((pin) => {
          return html`
          <app-pin .pin=${pin.type} .status=${pin.status} .containment=${pin.containment} .style="position: absolute; top: ${150 + Math.floor(Math.random() * 500)}px; left: ${Math.floor(Math.random() * (+1000 - +280)) + +280}px;" class="pin">
          </app-pin>
          `
        })
      }
    `;
  }
}