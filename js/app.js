"use strict"

let MESSAGES = JSON.parse(DATA)
const boxMessengerEl = document.getElementById("boxMessenger")
const messegerContainerEl = document.getElementById("messegerContainer")
const allMessageEl = document.getElementById("allMessages")
const unreadMessagesEl = document.getElementById("unreadMessages")

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
	const unreadMessages = MESSAGES.filter(message => message.seen === false)
	allMessageEl.innerHTML = MESSAGES.length
	unreadMessagesEl.innerHTML = unreadMessages.length
}

function createMessageHtml(message) {
	return `<div class="message ${message.seen ? "" : "message-unread"}">
	<img class="message__avatar" src="${message.avatar}" data-id="${message.id}"
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

messegerContainerEl.addEventListener("click", event => {
	const messageCurrencyEl = event.target.closest(".message__avatar")
	const btnUpdateEl = event.target.closest(".top-bar__update")
	const textMessageEl = event.target.closest(".message-text")
	if (messageCurrencyEl) {
		const messageId = +messageCurrencyEl.dataset.id
		const messageIdx = MESSAGES.findIndex(message => message.id === messageId)
		if (MESSAGES[messageIdx].seen === false) {
			MESSAGES[messageIdx].seen = true
			renderMessages(MESSAGES)
		}
		if (MESSAGES[messageIdx].seen === true) {
			MESSAGES.splice(messageIdx, 1)
			renderMessages(MESSAGES)
		}
	}
	if (btnUpdateEl) {
		btnUpdateEl.classList.add("active")
		setTimeout(() => btnUpdateEl.classList.remove("active"), 1000)
		MESSAGES = JSON.parse(DATA)
		renderMessages(MESSAGES)
	}
	if (textMessageEl) {
		textMessageEl.classList.toggle("show")
	} else return
})
