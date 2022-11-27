import React from 'react'
import PostsDiscovery from '../components/discovery/posts';
import PeopleDiscovery from '../components/discovery/people';

const PEOPLE_DISCOVERY = "PEOPLE";
const POSTS_DISCOVERY = "POSTS";

const DiscoverBody = ({ discoveryType }) => {
    if (discoveryType === PEOPLE_DISCOVERY) {
        return <PeopleDiscovery />
    } else if (discoveryType === POSTS_DISCOVERY) {
        return <PostsDiscovery />
    }
    return null;
}

export default function Discover() {
    const [discoveryType, setDiscoveryType] = React.useState(undefined);


    return (
        <div>

            <div>Discover</div>
            <br />
            <button onClick={() => setDiscoveryType(PEOPLE_DISCOVERY)}>People</button>
            <br />
            <button onClick={() => setDiscoveryType(POSTS_DISCOVERY)}>Posts</button>
            <br />

            <DiscoverBody discoveryType={discoveryType} />
        </div>
    )
}
