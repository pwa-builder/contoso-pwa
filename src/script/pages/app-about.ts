import { LitElement, css, html, customElement } from 'lit-element';
import {
  Providers,
  ProviderState,
  MsalProvider,
  prepScopes,
} from '@microsoft/mgt';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '../components/mention/mgt-people-mention';
import '../components/sidebar';
import '../components/background-map';
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
  subscriberList: any[] = [];
  feedStrings: any[] = [
    {
      displayName: 'Lynne Robbins',
      text: 'Emergency created with status Needs Attention.',
    },
    {
      displayName: 'Alex Wilber',
      text:
        'Updated Description: I will have some availability, you can assign this to me.',
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
      .map-wrapper {
        background-color: black;
        position: absolute;
        top: 0;
        left: 20em;
        width: 100vw;
        height: 100vh;
        opacity: 0.6;
      }

      select {
        width: 100%;
        height: 38px;
        border: 1px solid #8a8886;
      }

      textarea {
        width: 97%;
        padding: 0.5em;
        margin: 0 -2em 0 0;
        font-family: 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI',
          -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue',
          sans-serif;
      }

      p {
        margin: 0;
      }

      fast-button {
        background-color: white;
        color: black;
        border: 1px solid #8a8886;
        width: 130px;
        border-radius: 50px;
      }

      fast-button.primary {
        background-color: #0078d4;
        color: #ffffff;
        border: 1px solid #0078d4;
        margin-left: 15px;
      }

      fast-card {
        background: transparent;
        box-shadow: none;
      }

      mgt-people-picker,
      mgt-teams-channel-picker {
        --input-border-top: 1px solid #8a8886;
        --input-border-right: 1px solid #8a8886;
        --input-border-bottom: 1px solid #8a8886;
        --input-border-left: 1px solid #8a8886;
      }

      .feed {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 300px;
      }

      .feed-wrapper {
        flex: 1;
        background: #f6f6f6;
        padding: 0 1em;
      }

      .feed-list {
        padding-inline-start: 1em;
      }

      .feed-card {
        margin: 1.5em 0;
      }

      .feed-card mgt-person {
        margin-bottom: 0.5em;
      }

      .form-wrapper {
        position: absolute;
        left: 20em;
        top: 0;
        margin: 100px 150px;
        background-color: #ffffff;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.03);
        border-radius: 5px;
      }

      .form {
        color: #14142b;
      }

      hr.solid {
        margin: 20px -50px 0;
        border: 0;
      }

      .status-bar {
        padding: 32px 50px 0;
      }

      .status-bar h2 {
        font-size: 28px;
      }

      .main {
        padding: 40px 50px;
        background-color: #fafafa;
        display: flex;
        justify-content: space-around;
      }

      .column {
        width: 45%;
      }

      .column.left {
        padding-right: 50px;
      }

      p.label {
        margin: 1.5em 0 0.5em;
        font-weight: 700;
        font-size: 12px;
      }

      span.label {
        font-size: 14px;
        font-weight: 400;
        color: #14142b;
        opacity: 0.44;
      }

      p.disabled {
        margin: 1.5em 0 3em;
      }

      .cta {
        padding: 0 50px 50px;
        text-align: right;
        background-color: #fafafa;
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
          displayName: 'me',
          text: '',
        });

        let index = this.feedStrings.length - 1;

        if (this.didStatusChange) {
          this.feedStrings[index].text +=
            'Status was changed to ' +
            AppAbout.generateStatusStrings(this.newFormInfo.status) +
            '<br>';
          this.formInfo.status = this.newFormInfo.status;
        }

        if (this.didLeadChange) {
          this.feedStrings[index].text += 'Leads assigned: ';
          this.newFormInfo.lead.forEach((element: any) => {
            this.feedStrings[index].text += element.displayName + ' ';
          });
          this.feedStrings[index].text += '<br>';
          this.formInfo.lead = this.newFormInfo.lead;
        }

        if (this.didSeverityChange) {
          this.feedStrings[index].text +=
            'Severity changed to: ' +
            Severity[this.newFormInfo.severity] +
            '<br>';
          this.formInfo.severity = this.newFormInfo.severity;
        }

        if (this.didDescriptionChange) {
          this.feedStrings[index].text +=
            'Updated Description: ' + this.newFormInfo.description + '<br>';
        }

        if (this.didAssignedToChange) {
          this.feedStrings[index].text += 'Assigned To: ';
          this.newFormInfo.assignedTo.forEach((element: any) => {
            console.log(element.displayName);
            this.feedStrings[index].text += element.displayName + ' ';
          });
          this.feedStrings[index].text += '<br>';
          this.formInfo.assignedTo = this.newFormInfo.assignedTo;
        }

        if (this.didTeamsChannelChange) {
          this.feedStrings[index].text +=
            'Update to teams channel: ' +
            (this.newFormInfo.teamsChannel as any).team.displayName +
            ' > ' +
            (this.newFormInfo.teamsChannel as any).channel.displayName +
            '<br>';
          (this.formInfo.teamsChannel as any).team = (this.newFormInfo
            .teamsChannel as any).team;
          (this.formInfo.teamsChannel as any).channel = (this.newFormInfo
            .teamsChannel as any).channel;
        }

        if (this.didCommentChange) {
          this.feedStrings[index].text +=
            'Updated Comment: ' + this.newFormInfo.comment + '<br>';
        }
        console.log('id', (this.newFormInfo.teamsChannel as any).team);

        if (
          (this.renderRoot.querySelector('#updates') as HTMLInputElement)
            .checked
        ) {
          this.subscriberList.push({
            emailAddress: {
              address: userDetails.mail,
            },
          });
        }
        //Send teams channel message
        await this.sendTeamsMessage(index);
        await this.sendMail(index, userDetails.displayName);
      }

      console.log('this.feedstring', this.feedStrings);
      this.didStatusChange = this.didLeadChange = this.didSeverityChange = this.didAssignedToChange = this.didDescriptionChange = this.didTeamsChannelChange = this.didCommentChange = false;
      this.updateSave();
    }
  }

  firstUpdated() {
    this.styleStatus();
  }

  async sendMail(index: number, name: string) {
    if (this.subscriberList.length > 0) {
      const provider = Providers.globalProvider;
      const client = provider.graph.client;
      const scopes = 'Mail.Send';
      const message = this.feedStrings[index].text.replaceAll('<br>', '\n');
      const sendMail = {
        message: {
          subject: 'Update by ' + name,
          body: {
            contentType: 'Text',
            content: message,
          },
          toRecipients: this.subscriberList,
        },
        saveToSentItems: 'false',
      };
      await client
        .api('/me/sendMail')
        .middlewareOptions(prepScopes(scopes))
        .post(sendMail);
    }
  }

  async sendTeamsMessage(index: number) {
    const provider = Providers.globalProvider;
    const client = provider.graph.client;

    const scopes = ['ChannelMessage.Send', 'Group.ReadWrite.All'];

    const message = this.feedStrings[index].text.replaceAll('<br>', '\n');
    console.log('message', message);
    const sendMessage = {
      body: {
        content: message,
      },
    };
    if ((this.newFormInfo.teamsChannel as any).team.id !== undefined) {
      let result = await client
        .api(
          'teams/' +
            (this.newFormInfo.teamsChannel as any).team.id +
            '/channels/' +
            (this.newFormInfo.teamsChannel as any).channel.id +
            '/messages'
        )
        .middlewareOptions(scopes)
        .post(sendMessage);
    }
  }
  styleStatus() {
    console.log(this.renderRoot.querySelectorAll('.statusbar'));
    this.renderRoot
      .querySelectorAll('.statusbar')
      .forEach((element: HTMLElement) => {
        element.style.padding = '10px';
        element.style.color = 'black';
      });
    (this.renderRoot.querySelector(
      '#' + Status[this.newFormInfo.status].toString()
    ) as HTMLElement).style.color = 'rgb(71, 165, 210)';
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
    this.didLeadChange = this.isDiff(this.formInfo.lead, this.newFormInfo.lead);

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
    if (
      this.newFormInfo.description.trim() !== this.formInfo.description.trim()
    ) {
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
    this.didAssignedToChange = this.isDiff(
      this.formInfo.assignedTo,
      this.newFormInfo.assignedTo
    );
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

  isDiff(original: [], changed: []): Boolean {
    if (original.length === changed.length) {
      for (var i = 0; i < changed.length; i++) {
        if ((changed[i] as any).id !== (original[i] as any).id) {
          return true;
        }
      }
      return false;
    } else return true;
  }

  render() {
    return html`
      <div>
        <side-bar>
          <div class="feed-wrapper">
            <h2>Feed</h2>      
            <ul class="feed-list">

                ${this.feedStrings.map((info) => {
                  return html`
                    <fast-card class="feed-card">
                      <mgt-person
                        person-query=${info.displayName}
                        view="oneLine"
                        line1-property="givenName"
                      ></mgt-person>
                      <p>${unsafeHTML(info.text)}</p>
                    </fast-card>
                  `;
                })}
            </ul>
          </div>
        </side-bar>

        <div class="map-wrapper">
          <background-map></background-map>
        </div>
      
        <div class="form-wrapper">
          
      
          <div class="form">
      
            <form>
              <section class="status-bar">
              <h2>Information:</h2>
                <div>
                   ${Object.values(Status).map((element: Status) => {
                     if (!isNaN(Number(element))) {
                       return html`<span id=${Status[element]} class="statusbar"
                         >${AppAbout.generateStatusStrings(element)}</span
                       >`;
                     }
                   })}
                </div>
                <hr class="solid">
              </section>
      
              <section class="main">
                <div class="column left">
                  <p class="label">
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
                  <p class="label">
                    <label for="lead">
                      <span>Lead: </span>
                    </label>
                    <p>
                      <mgt-people-picker name="lead" id="lead" @selectionChanged="${() =>
                        this.onLeadChange()}"></mgt-people-picker>
                    </p>
                  </p>
                  <p class="label">
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
                  <p class="label">
                    <label for="description">
                      <span>Description: </span>
                    </label>
                    <p>
                      <textarea @keyup="${() =>
                        this.onDescriptionChange()}"  name="description" id="description" rows="10" cols="30"></textarea>
                    </p>
                  </p>
                  <div>
                  <input type="checkbox" name="updates" class="updates" id="updates"> 
                  <label for="updates"> Subscribe for updates</label><br>
                </div>
                </div>
 
                <div class="column right">
                  <p class="disabled">
                    <p>
                      <span class="label">Affected area: </span>
                      <span>50 acres</span>
                    </p>
                    <p>
                      <span class="label">Estimated # of affected people: </span>
                      <span>40</span>
                    </p>
                  </p>
                  <p class="label">
                    <label for="assigned">
                      <span>Assigned To: </span>
                    </label>
                    <p>
                        <mgt-people-picker name="assigned" id="assigned" @selectionChanged="${this.onAssignedToChange()}"></mgt-people-picker>
                    </p>
                  </p>
                  <p class="label">
                    <label for="teams">
                      <span>Send updates to Teams channel: </span>
                    </label>
                    <p>
                      <mgt-teams-channel-picker name="teams" id="teams" @selectionChanged="${() =>
                        this.onTeamsChannelChange()}"></mgt-teams-channel-picker>
                    </p>
                  </p>
                  <p class="label">
                    <label for="comment">
                      <span>Comment: </span>
                    </label>
                    <p>
                      <!-- <fast-text-area name="comment" rows="10" cols="30"></fast-text-area> -->
                      <mgt-people-mention id="comment" name="comment" rows="10" cols="30" placeholder="Leave your comment here..." @textChanged="${(
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
                this.onClickSave()}" disabled class="primary">Save</fast-button>
            </div>
          </div>
        </div>
      
      </div>
    `;
  }
}
