import { LitElement, css, html, customElement } from 'lit-element';
import { Providers, ProviderState, MsalProvider } from '@microsoft/mgt';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '../components/mention/mgt-people-mention';
export enum Status {
  /**
   * Needs Attention = 0
   */
  NeedsAttention,
  /**
   * Team Assigned = 1
   */
  TeamAssigned,
  /**
   * Team Deployed = 2
   */
  TeamDeployed,
  /**
   * Cleanup = 3
   */
  Cleanup,
  /**
   * Done = 4
   */
  Done,
}

export enum Severity {
  /**
   * Low = 0
   */
  Low,
  /**
   * Medium = 1
   */
  Medium,
  /**
   * High
   */
  High,
}

export class Information {
  status: Status;
  lead: [];
  severity: Severity;
  description: string;
  assignedTo: [];
  teamsChannel: {};
  comment: any;
  constructor() {
    const provider = Providers.globalProvider;
    this.status = Status.NeedsAttention;
    this.lead = [];
    this.severity = Severity.Low;
    this.description = '';
    this.assignedTo = [];
    this.teamsChannel = { team: '', channel: '' };
    this.comment = '';
  }
}

@customElement('app-about')
export class AppAbout extends LitElement {
  loggedInUserDisplayName: string = '';
  formInfo: Information;
  newFormInfo: Information;
  isSaveActive: Boolean = false;
  didStatusChange: Boolean = false;
  didLeadChange: Boolean = false;
  didSeverityChange: Boolean = false;
  didDescriptionChange: Boolean = false;
  didAssignedToChange: Boolean = false;
  didTeamsChannelChange: Boolean = false;
  didCommentChange: Boolean = false;
  feedStrings: any[] = [
    {
      displayName: 'John Firefighter',
      text: 'I am fighting this fire, looks like we are making progress!',
    },
  ];
  static generateStatusStrings(status: Status) {
    switch (status) {
      case Status.NeedsAttention:
        return 'Needs Attention';
      case Status.TeamAssigned:
        return 'Team Assigned';
      case Status.TeamDeployed:
        return 'Team Deployed';
      case Status.Cleanup:
        return 'Cleanup';
      case Status.Done:
        return 'Done';
      default:
        return '';
    }
  }

  static get styles() {
    return css`
      fast-card {
        padding: 18px;
        padding-top: 0px;
        margin-top: 10px;

        background: #212121de;
        backdrop-filter: blur(8px);
      }

      img {
        position: fixed;
        top: 4em;
        left: 0em;
        right: 0em;
        z-index: -1;
        object-fit: contain;
      }

      #aboutCards {
        display: flex;
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 4em;

        inset: 4em 0em 1em;
      }

      #aboutCards fast-card {
        margin-top: 10px;
      }

      #actionsBar {
        display: flex;
        justify-content: flex-end;
        margin-top: 2em;

        position: fixed;
        bottom: 20px;
        right: 16px;
      }

      #actionsBar fast-button {
        margin-left: 8px;
      }

      #aboutCards #feedCard {
        flex: 1;
        margin: 10px;
        margin-top: 14em;
      }

      #feedCard textarea {
        width: 98%;
      }

      #feedCard ul {
        padding: 0;
        list-style: none;

        height: 23em;
        overflow-y: scroll;
      }

      #feedCard ul::-webkit-scrollbar {
        display: none;
      }

      #infoCard {
        flex: 3;
        margin: 10px;
      }

      #infoCard form {
        display: flex;
        flex-direction: column;
      }

      section.main {
        display: flex;
        justify-content: space-around;
      }

      textarea {
        height: 6em;
      }
    `;
  }

  constructor() {
    super();

    this.formInfo = new Information();
    this.newFormInfo = new Information();
  }

  async onClickSave() {
    const provider = Providers.globalProvider;
    if (provider.state === ProviderState.SignedIn) {
      const userDetails = await Providers.globalProvider.graph.api('/me').get();
      this.loggedInUserDisplayName = userDetails.displayName;
    }

    if (
      this.didStatusChange ||
      this.didLeadChange ||
      this.didSeverityChange ||
      this.didDescriptionChange ||
      this.didAssignedToChange ||
      this.didTeamsChannelChange ||
      this.didCommentChange
    ) {
      this.feedStrings.push({
        displayName: this.loggedInUserDisplayName,
        text: '',
      });

      let index = this.feedStrings.length - 1;

      if (this.didStatusChange) {
        this.feedStrings[index].text +=
          'Status was changed to ' +
          AppAbout.generateStatusStrings(this.newFormInfo.status) +
          '\n';
        this.formInfo.status = this.newFormInfo.status;
      }

      if (this.didLeadChange) {
        this.feedStrings[index].text += 'Leads assigned: ';
        this.newFormInfo.lead.forEach((element: any) => {
          console.log(element.displayName);
          this.feedStrings[index].text += element.displayName + ' ';
        }) + '\n';
        this.formInfo.lead = this.newFormInfo.lead;
      }

      if (this.didSeverityChange) {
        this.feedStrings[index].text +=
          'Severity changed to: ' + Severity[this.newFormInfo.severity] + '\n';
        this.formInfo.severity = this.newFormInfo.severity;
      }

      if (this.didDescriptionChange) {
        this.feedStrings[index].text +=
          'Updated Description: ' + this.newFormInfo.description + '\n';
      }

      if (this.didAssignedToChange) {
        this.feedStrings[index].text += 'Assigned To: ';
        this.newFormInfo.assignedTo.forEach((element: any) => {
          console.log(element.displayName);
          this.feedStrings[index].text += element.displayName + ' ';
        }) + '\n';
        this.formInfo.assignedTo = this.newFormInfo.assignedTo;
      }

      if (this.didTeamsChannelChange) {
        this.feedStrings[index].text +=
          'Update to teams channel: ' +
          (this.newFormInfo.teamsChannel as any).team.displayName +
          ' > ' +
          (this.newFormInfo.teamsChannel as any).channel.displayName +
          '\n';
        (this.formInfo.teamsChannel as any).team = (this.newFormInfo
          .teamsChannel as any).team;
        (this.formInfo.teamsChannel as any).channel = (this.newFormInfo
          .teamsChannel as any).channel;
      }

      if (this.didCommentChange) {
        this.feedStrings[index].text +=
          'Updated Comment: ' + this.newFormInfo.comment;
      }
    }

    console.log('this.feedstring', this.feedStrings);
    this.didStatusChange = this.didLeadChange = this.didSeverityChange = this.didAssignedToChange = this.didDescriptionChange = this.didTeamsChannelChange = this.didCommentChange = false;
    this.updateSave();
  }

  firstUpdated() {
    this.styleStatus();
  }
  styleStatus() {
    (this.renderRoot.querySelector(
      '#' + Status[this.newFormInfo.status].toString()
    ) as HTMLElement).style.color = 'rgb(71, 165, 210)';

    (this.renderRoot.querySelector(
      '#' + Status[this.newFormInfo.status].toString()
    ) as HTMLElement).style.padding = '10px';
  }

  onStatusChange() {
    this.newFormInfo.status = Number(
      (this.renderRoot.querySelector('#status') as HTMLSelectElement).value
    );

    if (this.newFormInfo.status !== this.formInfo.status) {
      this.didStatusChange = true;
    } else {
      this.didStatusChange = false;
    }
    this.styleStatus();
    this.updateSave();
  }

  onLeadChange() {
    this.newFormInfo.lead = (this.renderRoot.querySelector(
      '#lead'
    ) as any).selectedPeople;
    if (this.newFormInfo.lead.length === this.formInfo.lead.length) {
      for (var i = 0; i < this.newFormInfo.lead.length; i++) {
        if (
          (this.newFormInfo.lead[i] as any).id !==
          (this.formInfo.lead[i] as any).id
        ) {
          this.didLeadChange = true;
          return;
        }
      }
      this.didLeadChange = false;
    } else this.didLeadChange = true;

    this.updateSave();
  }

  onSeverityChange() {
    this.newFormInfo.severity = Number(
      (this.renderRoot.querySelector('#severity') as HTMLSelectElement).value
    );
    if (this.newFormInfo.severity !== this.formInfo.severity) {
      this.didSeverityChange = true;
    } else {
      this.didSeverityChange = false;
    }

    this.updateSave();
  }
  onDescriptionChange() {
    this.newFormInfo.description = (this.renderRoot.querySelector(
      '#description'
    ) as HTMLInputElement).value;
    if (this.newFormInfo.description !== this.formInfo.description) {
      this.didDescriptionChange = true;
    } else {
      this.didDescriptionChange = false;
    }
    this.updateSave();
  }

  onAssignedToChange() {
    this.newFormInfo.assignedTo = (this.renderRoot.querySelector(
      '#assigned'
    ) as any).selectedPeople;
    if (
      this.newFormInfo.assignedTo.length === this.formInfo.assignedTo.length
    ) {
      for (var i = 0; i < this.newFormInfo.assignedTo.length; i++) {
        if (
          (this.newFormInfo.assignedTo[i] as any).id !==
          (this.formInfo.assignedTo[i] as any).id
        ) {
          this.didAssignedToChange = true;
          return;
        }
      }
      this.didAssignedToChange = false;
    } else this.didAssignedToChange = true;
    this.updateSave();
  }

  onTeamsChannelChange() {
    let selectedItem = (this.renderRoot.querySelector('#teams') as any)
      .selectedItem;
    if (selectedItem !== undefined) {
      (this.newFormInfo.teamsChannel as any).team = selectedItem.team;
      (this.newFormInfo.teamsChannel as any).channel = selectedItem.channel;
    }
    if (
      (this.newFormInfo.teamsChannel as any).team !==
        (this.formInfo.teamsChannel as any).team ||
      (this.newFormInfo.teamsChannel as any).channel !==
        (this.formInfo.teamsChannel as any).channel
    ) {
      this.didTeamsChannelChange = true;
    } else {
      this.didTeamsChannelChange = false;
    }
    this.updateSave();
  }

  onCommentChange(e: any) {
    this.newFormInfo.comment = e.detail;
    console.log(e.detail);
    if (this.newFormInfo.comment !== this.formInfo.comment) {
      this.didCommentChange = true;
    } else this.didCommentChange = false;
    this.updateSave();
  }

  updateSave() {
    if (
      this.didStatusChange ||
      this.didLeadChange ||
      this.didSeverityChange ||
      this.didDescriptionChange ||
      this.didAssignedToChange ||
      this.didTeamsChannelChange ||
      this.didCommentChange
    ) {
      (this.renderRoot.querySelector('#save') as any).disabled = false;
    } else {
      (this.renderRoot.querySelector('#save') as any).disabled = true;
    }
    super.requestUpdate();
  }
  render() {
    return html`
      <div>
        <div id="aboutCards">
          <fast-card id="feedCard">
            <h2>Feed</h2>      
            <ul>
              <fast-card>
                ${this.feedStrings.map((info) => {
                  return html`<h3>${info.displayName}</h3>
                    <p>${unsafeHTML(info.text)}</p>`;
                })}
              </fast-card>
      
              <fast-card>
      
              </fast-card>
            </ul>
          </fast-card>
      
          <fast-card id="infoCard">
            <h2>Information:</h2>
      
            <form>
              <section class="status-bar">
                <div>
                   ${Object.values(Status).map((element: Status) => {
                     if (!isNaN(Number(element))) {
                       return html`<span id=${Status[element]}
                         >${AppAbout.generateStatusStrings(element)}</span
                       >`;
                     }
                   })}
                </div>
              </section>
      
              <section class="main">
                <div class="column">
                  <p>
                    <label for="status">
                      <span>Status: </span>
                    </label>
                    <p>
                      <select id="status" name="status" .value=${
                        this.formInfo.status
                      } @change="${() => this.onStatusChange()}">
                      ${Object.values(Status).map((element: Status) => {
                        if (!isNaN(Number(element))) {
                          return html`<option value=${element}>
                            ${AppAbout.generateStatusStrings(element)}
                          </option>`;
                        }
                      })}
                      </select>
                    </p>
                  </p>
                  <p>
                    <label for="lead">
                      <span>Lead: </span>
                    </label>
                    <p>
                      <mgt-people-picker name="lead" id="lead" @selectionChanged="${() =>
                        this.onLeadChange()}"></mgt-people-picker>
                    </p>
                  </p>
                  <p>
                    <label for="severity">
                      <span>Severity: </span>
                    </label>
                    <p>
                      <select name="severity" id="severity" @change="${() =>
                        this.onSeverityChange()}">
                      ${Object.values(Severity).map((element: Severity) => {
                        if (isNaN(Number(element))) {
                          return html`<option value=${Severity[element]}>
                            ${element}
                          </option>`;
                        }
                      })}
                      </select>
                    </p>
                  </p>
                  <p>
                    <label for="description">
                      <span>Description: </span>
                    </label>
                    <p>
                      <fast-text-area id="description" @change="${() =>
                        this.onDescriptionChange()}" name="desciption" rows="10" cols="30"></fast-text-area>
                    </p>
                  </p>
                </div>
                <div class="column">
                  <p>
                    <label for="assigned">
                      <span>Assigned To: </span>
                    </label>
                    <p>
                    <mgt-people-picker name="assigned" id="assigned" @selectionChanged="${() =>
                      this.onAssignedToChange()}"></mgt-people-picker>
                    </p>
                  </p>
                  <p>
                    <label for="teams">
                      <span>Send updates to Teams channel: </span>
                    </label>
                    <p>
                      <mgt-teams-channel-picker name="teams" id="teams" @selectionChanged="${() =>
                        this.onTeamsChannelChange()}"></mgt-teams-channel-picker>
                    </p>
                  </p>
                  <p>
                    <label for="comment">
                      <span>Comment: </span>
                    </label>
                    <p>
                      <!-- <fast-text-area name="comment" rows="10" cols="30"></fast-text-area> -->
                      <mgt-people-mention id="comment" name="comment" @textChanged="${(
                        e
                      ) => this.onCommentChange(e)}"></mgt-people-mention>
                    </p>
                  </p>
                </div>
              </section>
      
            </form>
      
            <div class="cta">
              <fast-button>cancel</fast-button>
              <fast-button id="save" @click="${() =>
                this.onClickSave()}" disabled>Save</fast-button>
            </div>
          </fast-card>
        </div>
      
      </div>
    `;
  }
}
