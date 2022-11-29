import { Button } from '@mui/material';
import React, { useState } from 'react'
import { InnerComponent } from './styled';

export const ComponentA = () => {
    const [isActive, setIsActive] = useState(false);
    const toggle = () => setIsActive((prev) => !prev)
    
    return (
        <InnerComponent active={isActive}>
            <Button onClick={toggle}>ToggleTheme</Button>
        </InnerComponent>
    )
}
