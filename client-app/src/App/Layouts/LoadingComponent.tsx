import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent: React.FC<{inverted?: boolean, loadingContent?: string}> = ({inverted = true, loadingContent}) =>{
    return (
    <Dimmer active inverted={inverted}>
        <Loader content={loadingContent}/>
    </Dimmer>);
} 

export default LoadingComponent;