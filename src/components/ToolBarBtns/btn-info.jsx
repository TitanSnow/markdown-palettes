import axios from 'axios'
import pkg from '../../../package.json'

export default {
    name: 'info',
    icon: 'fa-info-circle',
    title: '关于',
    action () {
        this.openDialog({
            title: '关于',
            type: 'tab',
            body: [
                {
                    name: 'about',
                    title: '关于',
                    body: [{
                        component: {
                            functional: true,
                            render: (h, { injections: {t} }) =>
                                <div style="text-align: center">
                                    <h3>{ t('Markdown*Palettes') }</h3>
                                    <p>{ pkg.version }</p>
                                    <p>{ t('开源的 Markdown 编辑器') }<br/>{ t('面向现代化网络环境') }</p>
                                    <p><a href="https://github.com/luogu-dev/markdown-palettes" target="_blank">{ t('访问 GitHub 项目地址') }</a></p>
                                </div>,
                            inject: ['t']
                        }
                    }]
                },
                {
                    name: 'credit',
                    title: '鸣谢',
                    body: [{
                        component: {
                            data () {
                                return {
                                    contributors: null
                                }
                            },
                            render (h) {
                                const t = this.t
                                return <div>
                                    {
                                        this.contributors != null ? (
                                            <div>
                                                <h3>{ t('贡献者') }</h3>
                                                <ul>{
                                                    this.contributors.map(({ avatar_url, html_url, name, login }) => {
                                                        if (name === null) name = login
                                                        return <li key={ login }><a href={ html_url }><img alt={ name } src={ avatar_url } width="32" height="32"/><span>{ name }</span></a></li>
                                                    })
                                                }</ul>
                                            </div>
                                        ) : null
                                    }
                                    <div>
                                        <h3>{ t('依赖') }</h3>
                                        <ul>
                                            {
                                                Object.keys(pkg.dependencies).map(dep =>
                                                    <li key={ dep }><a href={ `https://npmjs.org/package/${dep}` }>{ dep }</a></li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            },
                            inject: ['t'],
                            async created () {
                                const headers = { Accept: 'application/vnd.github.v3+json' }
                                const { data: contributors } = await axios.get('https://api.github.com/repos/luogu-dev/markdown-palettes/contributors', { headers })
                                const contributorRequests = contributors.map(({ url }) => axios.get(url, { headers }))
                                this.contributors = []
                                for (const req of contributorRequests) {
                                    this.contributors.push((await req).data)
                                }
                            }
                        }
                    }]
                },
                {
                    name: 'license',
                    title: '许可',
                    body: [{
                        component: {
                            functional: true,
                            render: (h, { injections: {t} }) =>
                                <div>
                                    <p>Copyright (c) 2017–2018 Luogu Development Team</p>
                                    <p>Permission is hereby granted, free of charge, to any person obtaining a copy
                                    of this software and associated documentation files (the "Software"), to deal
                                    in the Software without restriction, including without limitation the rights
                                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                    copies of the Software, and to permit persons to whom the Software is
                                    furnished to do so, subject to the following conditions:</p>
                                    <p>The above copyright notice and this permission notice shall be included in all
                                    copies or substantial portions of the Software.</p>
                                    <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                                    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                                    SOFTWARE.</p>
                                </div>,
                            inject: ['t']
                        }
                    }]
                }
            ]
        })
    }
}
