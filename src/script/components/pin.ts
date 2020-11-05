import { LitElement, css, html, customElement, property } from 'lit-element';

@customElement('app-pin')
export class AppPin extends LitElement {
    @property({ type: String }) pin: string = "wildfire";
    @property({ type: String }) status: string = "Cleanup";
    @property({ type: String }) containment: string = "100%";
    @property({ type: Boolean }) openPopup: boolean = false;
    
    static get styles() {
        return css`
          .pin {
              cursor: pointer;
          }

          .popup {
            background: #FAFAFA;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.09), 0px 16px 15px rgba(0, 0, 0, 0.11);
            border-radius: 8px;
            color: black;
            min-width: 322px;
            min-height: 173px;
            position: absolute;

            padding-left: 17px;
            padding-top: 14px;
            padding-right: 17px;

            z-index: 1;

            animation-name: fadein;
            animation-duration: 240ms;
          }

          .popupHeader {
            display: flex;
            justify-content: space-between;
          }

          .popupHeader span {
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: 22px;
            letter-spacing: 0.432232px;
          }

          .popupHeader button {
            background: transparent;
            border: none;
            cursor: pointer;
          }

          .popupContent {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
          }
          
          .popupContent p {
            margin-top: 0px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
          }

          .popupContent span {
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            color: #14142B;
            opacity: 0.44;
          }

          #shareButton ion-icon {
            height: 15px;
            width: 15px;
          }

          /* Animations */

          @keyframes fadein {
            from {
                opacity: 0;
                transform: translateY(30px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
           }
        `
    }

    constructor() {
        super();
    }

    open() {
        this.openPopup = !this.openPopup;
    }

    async share() {
        await navigator.share({
            text: "Activity Update"
        })
    }

    render() {
        return html`
          <div @click="${() => this.open()}" class="pin">
            ${this.openPopup ? html`<div class="popup">
              <div class="popupHeader">
                <span>${this.pin} Activity</span>

                <div id="popupHeaderActions">
                  <button @click=${() => this.share()} id="shareButton">
                    <ion-icon name="share-outline"></ion-icon>
                  </button>

                  <button>
                    <img src="/assets/appIcons/close.svg" alt="close button">
                  </button>
                </div>
              </div>

              <div class="popupContent">
                <div class="contentBlock"> 
                  <span>Status: </span>
                  <p>Team Deployed</p>
                </div>

                <div class="contentBlock"> 
                  <span>Containment: </span>
                  <p>40%</p>
                </div>

              </div>
            </div>` : null}

            <img src="/assets/pinIcons/ic_${this.pin}_pin.svg">
          </div>
        `;
      }
}