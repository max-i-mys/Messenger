"use strict"

let MESSAGES = JSON.parse(DATA)
const boxMessengerEl = document.getElementById("boxMessenger")
const timeFormatter = new Intl.DateTimeFormat(undefined, {
	hour: "2-digit",
	minute: "2-digit",
})
const dateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
})
renderMessages(MESSAGES)

function renderMessages(messages) {
	let accMessages = ""
	messages
		.sort((a, b) => a.date - b.date)
		.sort((a, b) => a.seen - b.seen)
		.forEach(message => (accMessages += createMessageHtml(message)))
	boxMessengerEl.innerHTML = accMessages
}

function createMessageHtml(message) {
	return `<div class="message ${
		message.seen ? "" : "message-unread"
	}" data-id="${message.id}">
	<img class="message__avatar" src="${message.avatar}"
		alt="name" loading="lazy" width="1" height="1">
	<div class="message__user">
		<span class="user-name">${message.name}</span>
		<span class="user-phone">${message.phone}</span>
	</div>
	<p class="message-text">${message.message}</p>
	<p class="message-date">
		<span>${timeFormatter.format(+message.date)}</span>
		<span>${dateFormatter.format(+message.date)}</span>
	</p>
</div>`
}
