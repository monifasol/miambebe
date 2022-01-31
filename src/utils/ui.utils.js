

export const showNotification = (element, message) => {
    element.classList.add('show')
    element.innerText = message
    setTimeout(()=>{ element.classList.remove('show')}, 1400)
}
