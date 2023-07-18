import { Meta } from '@storybook/react'
import Plane from './Plane'

export default {
    title: 'Atoms/Plane',
    component: Plane,
} as Meta

export const Default = () => <Plane>Lorem ipsum</Plane>

export const Nested = () => (
    <Plane>
        <p>This is a title</p>
        <Plane>Lorem ipsum</Plane>
    </Plane>
)