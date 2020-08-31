import { Player } from "../types/Player";
import { Time } from "../types/Time";
import { Message } from "../types/Messages";

import * as Flags from "../types/Flags";
import * as Actions from "../types/Actions";
import * as Buttons from "../types/Buttons";
import * as Resources from "../types/Resources";

import { halfmoon } from "../util/HalfMoon";

import ControlContainer from "./ControlContainer";
import ResourceContainer from "./ResourceContainer";
import PlayerContainer from "./PlayerContainer";
import MessagesContainer from "./MessagesContainer";

import Modal from "./Modal";

import React from "react";

import { version } from "../package.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Model extends React.Component {
  // Example values
  actionsQueue: Actions.DelayedAction[] = [
    new Actions.DelayedAction(
      new Actions.BulkAction(
        new Actions.AddMessage("It's been 15 seconds"),
        new Actions.EnqueueAction(
          new Actions.DelayedAction(
            new Actions.AddMessage("It's been another 15 seconds"),
            15
          )
        )
      ),
      15
    ),
  ];
  flags = new Flags.Flags();
  buttons: typeof Buttons.BaseButton[] = [
    Buttons.Wait,
    Buttons.AlterTime,
    Buttons.UnAlterTime,
    Buttons.Dig,
  ];
  messages: Message[] = [];
  player: Player = new Player();
  resources: typeof Resources.BaseResource[] = [];
  time: Time = new Time();

  trySetTimeFactor(event: React.FormEvent<HTMLInputElement>) {
    const val = Math.trunc(parseInt(event.currentTarget.value));
    if (!isNaN(val)) {
      this.flags.set(Flags.AlterTimeFactor, val);
    } else {
      this.flags.delete(Flags.AlterTimeFactor);
    }
  }

  performActions(...actions: Actions.Action[]) {
    for (const action of actions) {
      action.perform(this);
    }
  }

  render() {
    return (
      <main>
        <div id="modals">
          <Modal display="modal" modalId="settings">
            <h5 className="modal-title">Settings</h5>
            <button className="btn" onClick={halfmoon.toggleDarkMode}>
              Toggle Theme
            </button>
          </Modal>
        </div>
        <div className="page-wrapper with-sidebar">
          <div className="sidebar">
            <div className="row">
              <Modal display="button" className="col-auto" modalId="settings">
                <FontAwesomeIcon icon="cog" />
              </Modal>
              <button className="btn btn-primary col-auto" onClick={() => {}}>
                <FontAwesomeIcon icon="pause"/>
              </button>
            </div>
            {this.flags.get(Flags.AlterTime) ?? false ? (
              <>
                <div className="sidebar-divider" />
                <input
                  className="form-control"
                  type="number"
                  placeholder="Time factor"
                  onInput={this.trySetTimeFactor.bind(this)}
                />
              </>
            ) : (
              <></>
            )}
            <div className="sidebar-divider" />
            <ResourceContainer resources={this.resources} />
            <div className="sidebar-divider" />
            <PlayerContainer time={this.time} player={this.player} />
            <footer>
              <a href="https://github.com/toman222/NecroGame">source</a>
              <div>Version: {version}</div>
            </footer>
          </div>
          <div className="content-wrapper d-flex flex-column justify-content-between">
            <ControlContainer buttons={this.buttons} model={this} />
            <MessagesContainer messages={this.messages} />
          </div>
        </div>
      </main>
    );
  }
}
