import { LitElement, css, html, customElement } from 'lit-element';

declare var atlas: any;
@customElement('background-map')
export class BackgroundMap extends LitElement {

    static get styles() {
        return css `
            .background {
                position: absolute;
                top: 0;
                height: 100vh;
                width: 100%;
                z-index: -99;
            }
        `;
    }

    constructor() {
        super();
    }

    firstUpdated() {
        const mapEl = this.shadowRoot?.querySelector('#myMap');
  
        new atlas.Map(mapEl, {
          center: [-122.40, 47.41],
          zoom: 8,
          language: 'en-US',
          authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: 'zr9VA15TqhJbXVvzA8_An6IShYwGCMzc_9VcSXRb-5c'
          }
        });  
    }

    render() {
        return html`
            <div id="myMap" class='background'></div>
        `
    }
}