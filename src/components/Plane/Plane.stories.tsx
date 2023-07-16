import { Meta } from '@storybook/react'
import Plane from './Plane'

export default {
    title: 'Plane',
    component: Plane,
} as Meta

export const Default = () => <Plane>Lorem ipsum</Plane>

export const Nested = () => (
    <Plane>
        Title
        <br />
        <Plane>Lorem ipsum</Plane>
    </Plane>
)