import { EventTarget } from "cc";
import BaseSingleton from "../../Model/Singleton/BaseSingleton";

export class EventMng extends BaseSingleton<EventMng>() {
    event = new EventTarget();
}
