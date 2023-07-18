import { Meta } from '@storybook/react'
import Text from './Text'

export default {
    title: 'Atoms/Text',
    component: Text
} as Meta

export const Default = () => (
    <>
        <Text font='title' block>Title</Text>
        <Text font='body' block>Body</Text>
        <Text font='caption' block>Caption</Text>
    </>
)