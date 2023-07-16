import { Meta } from '@storybook/react'
import Text from './Text'

export default {
    title: 'Text',
    component: Text
} as Meta

export const Default = () => (
    <>
        <Text font='title'>Title</Text>
        <br />
        <Text font='body'>Body</Text>
        <br />
        <Text font='caption'>Caption</Text>
    </>
)