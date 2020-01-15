function sendAToast(type,msg,duration = 2000) {

    if(['success','warning','error', 'info'].indexOf(type) !== -1){
        
        let id = 'toast-' + new Date().getTime()

        let TOASTPARENT_ = $('.toast-holder')

        arr = {'error':'&#61480;','warning':'&#61478;','success':'&#61740;','info':'&#62205;'}

        TOASTPARENT_.append(
            `<div class="toast toast-${type}" id="${id}">`+
                `<div class="toast-icon toast-s">${arr[type]}</div>`+
                `<span class="toast-msg">${msg}</span>`+
                `<div class="toast-time-bar"></div>`+
                `<div class="toast-time-left"></div>`+
            `</div>`
        )
 
        let TOAST_ = $('#'+id)

        anime.timeline().add({
            targets: `#${id}`,
            translateX: ['-105%','0%'],
            easing: 'easeOutCubic', //when you want to have fun: spring(1, 80, 0, 0)
            duration: 250,
            complete: function() {
                TOAST_.children('.toast-time-left').css('transition',`all ${duration}ms linear`).css('width','0%')
            }
        }).add({
            targets: `#${id}`,
            opacity: [1,0],
            easing: 'easeInCubic',
            duration: 250,
            delay: duration + 70,
            complete: function() {
                TOAST_.remove()
            }
        })
    }
}
