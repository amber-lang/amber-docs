import { Meta } from '@storybook/react'
import Island from './Island'
import { Text } from '../Text'

export default {
    title: 'Molecules/Island',
    component: Island,
} as Meta

export const Default = () => (
    <div style={{ width: 200 }}>
        <Island label="Island">
            <Text font='body'>
                Floating island
            </Text>
        </Island>
    </div>
)

export const Greeting = () => (
    <div style={{ width: 200 }}>
        <Island label="Welcome on board">
            <Text font='title'>Welcome</Text>
            <br/>
            <Text font='body'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
            </Text>
        </Island>
    </div>
)
