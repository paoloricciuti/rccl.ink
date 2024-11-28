import { getContext, setContext } from 'svelte';

class Notifications {
	#list = $state([] as Array<{ text: string; id: string }>);
	#cleanups: Set<Timer> = new Set();

	constructor() {
		$effect(() => () => {
			for (const timer of this.#cleanups) {
				clearTimeout(timer);
			}
		});
	}

	add(text: string) {
		const notification = { text, id: crypto.randomUUID() };
		this.#list.push(notification);
		const timer = setTimeout(() => {
			this.#list = this.#list.filter((el) => {
				return el.id !== notification.id;
			});
			this.#cleanups.delete(timer);
		}, 1000);
		this.#cleanups.add(timer);
	}

	get list() {
		return this.#list;
	}
}

const notifications_symbol = Symbol('notifications');

export function set_notifications() {
	const notifications = new Notifications();
	return setContext(notifications_symbol, notifications);
}

export function get_notifications() {
	return getContext<Notifications>(notifications_symbol);
}
