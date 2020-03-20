~ function () {
    let duration = 50,
        speed = 30,
        myChart = null,
        option = null
    //地图数据    
    const mapData = [{
            "name": "阳江市",
            "value": [
                111.989062,
                21.858167,
                100
            ],
            itemStyle: {
                color: '#17e3ff',
                opacity: 1
            },
        },
        {
            "name": "惠州市",
            "value": [
                114.42356,
                23.113434,
                100,
            ],
            itemStyle: {
                color: '#fffe00',
                opacity: 1
            },
        },
        {
            "name": "清远市",
            "value": [
                113.057866,
                23.690082,
                100,
            ],
            itemStyle: {
                color: '#18d0ff',
                opacity: 1
            },
        },
        {
            "name": "梅州市",
            "value": [
                116.126091,
                24.291806,
                100,
            ],
            itemStyle: {
                color: '#e94971',
                opacity: 1
            },
        },
        {
            "name": "湛江市",
            "value": [
                110.358655,
                21.280766,
                100,
            ],
            itemStyle: {
                color: '#634fd4',
                opacity: 1
            },
        },
    ];
    //模板文字
    let code = `/* 基于准备好的dom，初始化echarts实例 */
        myChart = echarts.init(document.getElementById('main'));
        option = {
            geo3D: {
                map: '广东',
                groundPlane:{},
                light:{},
                viewControl:{}
            },
            series: {
                type: 'bar3D',
                coordinateSystem: 'geo3D',
                data:[]
            }
        }
        /* 显示图表 */
        myChart.setOption(option);
        /* 设置视角中心点 */
        option.geo3D.viewControl.center=[-10, 0, 10]
        /* 设置最大选择角度 */
        option.geo3D.viewControl.minBeta=-360
        option.geo3D.viewControl.maxBeta=360
        /* 开启旋转 */
        option.geo3D.viewControl.autoRotate=true
        option.geo3D.viewControl.autoRotateSpeed=speed
        /* 设置背景颜色 */
        option.geo3D.environment='black'
        /* 设置3d地图颜色 */
        option.geo3D.itemStyle={
            borderColor: 'rgb(62,215,213)',
            areaColor: '#4490fc',
            borderWidth: 1
        }
        /* 设置光照 */
        option.geo3D.light.main={
                intensity: 1,
                shadow: true,
                alpha: 120,
                beta: 100
        }
        /* 添加3d柱图 */
        option.series.data=mapData
        /* 添加3d柱图标签 */
        option.series.label={
            show: true,
            formatter: '{b}',
            position: 'top',
            textStyle: {
                color: '#000',
                backgroundColor: '#fff',
            }
        }
        /* 开始3d柱图光照渲染 */
        option.series.shading='lambert'
        `


    //绘制
    function writeCode(prefix, code, fn) {
        let domCode = document.querySelector('.code')
        let n = 0,
            m = 0,
            sum = 0,
            str = ''
        let id = null
        const arr = ["myChart.setOption(option,true);", "/* 设置视角中心点 */", "/* 设置最大选择角度 */",
            "/* 开启旋转 */", "/* 设置背景颜色 */", "/* 设置3d地图颜色 */",
            "/* 设置光照 */", "/* 添加3d柱图 */", "/* 添加3d柱图标签 */",
            "/* 开始3d柱图光照渲染 */"
        ]
        id = setTimeout(function run() {
            n += 1
            domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
            domCode.scrollTop = domCode.scrollHeight
            if (n < code.length) {
                id = setTimeout(run, duration)
            } else {
                fn && fn.call()
                eval(code.substring(m) + '\n' + arr[0])
                console.log(option.geo3D.viewControl.autoRotate);
            }
            if (code.substring(0, n).indexOf(arr[sum]) !== -1) {
                str = code.substring(m, n)
                m = n;
                sum > 0 ? eval(str + '\n' + arr[0]) : eval(str)
                sum++;
            }

        }, duration)
        // eval(code)
    }

    writeCode('', code)

    $('.actions').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let speed = $button.attr('data-speed')
        $button.addClass('active')
            .siblings('.active').removeClass('active')
        switch (speed) {
            case 'slow':
                duration = 130
                speed = 6
                break
            case 'normal':
                duration = 80
                speed = 10
                break
            case 'fast':
                duration = 40
                speed = 14
                break
        }
        if (option) {
            option.geo3D.viewControl.autoRotateSpeed = speed
            myChart.setOption(option)
        }
    })

    // var round = myChart.getOption();
    // if(round.)

}.call()