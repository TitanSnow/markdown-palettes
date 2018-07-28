import axios from 'axios'
import pkg from '../../../package.json'
import licenseDataUrl from '../../../LICENSE.md'
import './btn-info.stylus'

function decodeDataURL (url) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)
    xhr.overrideMimeType('text/plain')
    xhr.send()
    return xhr.response
}

const license = decodeDataURL(licenseDataUrl)

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
                                <div class="mp-info-about-container">
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
                                return <div class="mp-info-credit-container">
                                    {
                                        this.contributors != null ? (
                                            <div class="mp-info-credit-contributors">
                                                <h3>{ t('贡献者') }</h3>
                                                <ul>{
                                                    this.contributors.map(({ avatar_url, html_url, name, login }) => {
                                                        if (name === null) name = login
                                                        return <li key={ login }><a href={ html_url }><img alt={ name } src={ avatar_url }/><span>{ name }</span></a></li>
                                                    })
                                                }</ul>
                                            </div>
                                        ) : null
                                    }
                                    <div class="mp-info-credit-dependencies">
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
                                <div class="mp-info-license-container" lang="en">
                                    { this.contentParser(license).toVue(h) }
                                </div>,
                            inject: ['t']
                        }
                    }]
                }
            ]
        })
    }
}
