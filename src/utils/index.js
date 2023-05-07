const Mock = require('mockjs');

// 生成一个完整的数据结构
function generateData() {
    return Mock.mock({
        value: '@word(3, 5)',
        label: '@title(2, 4)',
        children: Mock.mock({
            'children|2-5': [
                {
                    value: '@word(3, 5)',
                    label: '@title(2, 4)',
                    children: Mock.mock({
                        'children|1-3': [
                            {
                                value: '@word(3, 5)',
                                label: '@title(2, 4)',
                            },
                        ],
                    }).children,
                },
            ],
        }).children,
    })
}

export {
    generateData
}
