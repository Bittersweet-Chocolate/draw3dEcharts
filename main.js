~ function () {
    var duration = 50
    let myChart = null,
        option = null
    let code = `// 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('main'));
        option={

            }
        // 显示图表
        myChart.setOption(option);
        `

    function writeCode(prefix, code, fn) {
        let domCode = document.querySelector('.code')
        let styleTag = document.querySelector('#styleTag')
        let n = 0,sum = 0
        let id = null
        id = setTimeout(function run() {
            n += 1
            domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
            domCode.scrollTop = domCode.scrollHeight
            if (n < code.length) {
                id = setTimeout(run, duration)
            } else {
                fn && fn.call()
            }
        }, duration)
    }

    writeCode('', code)

    $('.actions').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let speed = $button.attr('data-speed')
        $button.addClass('active')
            .siblings('.active').removeClass('active')
        switch (speed) {
            case 'slow':
                duration = 100
                break
            case 'normal':
                duration = 50
                break
            case 'fast':
                duration = 10
                break
        }
    })

}.call()