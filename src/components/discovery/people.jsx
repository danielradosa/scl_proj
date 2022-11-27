import React from 'react'
import { useQuery } from "@apollo/client";
import { MOST_FOLLOWED_USERS } from '../../utils/Queries';


const PeopleDiscovery = () => {
    const limit = 1;
    const [offset, setOffset] = React.useState(0);

    const nextPage = () => {
        setOffset(offset + limit);
    };

    const previousPage = () => {
        if (offset - limit < 0) {
            return;
        }
        setOffset(offset - limit);
    };


    const { loading, error, data } = useQuery(MOST_FOLLOWED_USERS, {
        variables: { limit: limit, offset: offset },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    return (
        <>
            <br />
            {JSON.stringify(data && data.getMostFollowedUsers)}
            <br />
            <br />
            <button onClick={() => nextPage()}>Next</button>
            <br />
            <button onClick={() => previousPage()}>Previous</button>
        </>
    )
}

export default PeopleDiscovery;