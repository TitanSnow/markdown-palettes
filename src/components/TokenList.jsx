export default {
    functional: true,
    render: (h, { props: { tokens } }) => {
        return <span>{
            tokens.map(([content, klass]) => <span class={ klass.toString() }>{ content }</span>)
        }</span>
    }
}
